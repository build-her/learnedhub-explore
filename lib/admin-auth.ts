import crypto from "crypto";
import { cookies, headers } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours
export const ADMIN_SESSION_DURATION_SECONDS = 8 * 60 * 60; // 28,800 seconds

// Rate limiting: max 5 failed attempts per IP within 15 minutes
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

// Best-effort in-memory store for tracking failed attempts per IP
const failedAttemptsMap = new Map<string, number[]>();

/**
 * Extracts client IP from incoming request headers.
 */
export async function getClientIp(): Promise<string> {
  try {
    const headerList = await headers();
    const forwarded = headerList.get("x-forwarded-for");
    if (forwarded) {
      const first = forwarded.split(",")[0].trim();
      if (first) return first;
    }
    const realIp = headerList.get("x-real-ip");
    if (realIp) return realIp.trim();

    const cfConnectingIp = headerList.get("cf-connecting-ip");
    if (cfConnectingIp) return cfConnectingIp.trim();
  } catch {
    // headers() might throw in non-request contexts
  }
  return "127.0.0.1";
}

/**
 * Checks whether an IP has exceeded 5 failed attempts in the last 15 minutes.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const attempts = failedAttemptsMap.get(ip) || [];
  const recentAttempts = attempts.filter((t) => t > cutoff);

  if (recentAttempts.length !== attempts.length) {
    if (recentAttempts.length > 0) {
      failedAttemptsMap.set(ip, recentAttempts);
    } else {
      failedAttemptsMap.delete(ip);
    }
  }

  return recentAttempts.length >= MAX_FAILED_ATTEMPTS;
}

/**
 * Records a failed passcode attempt for an IP.
 */
export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const attempts = failedAttemptsMap.get(ip) || [];
  const recentAttempts = attempts.filter((t) => t > cutoff);
  recentAttempts.push(now);
  failedAttemptsMap.set(ip, recentAttempts);
}

/**
 * Clears failed attempts for an IP (e.g. upon successful authentication).
 */
export function clearFailedAttempts(ip: string): void {
  failedAttemptsMap.delete(ip);
}

/**
 * Constant-time comparison between submitted passcode and server-only ADMIN_PASSCODE.
 * Both values are SHA-256 hashed first to normalize to fixed 32-byte buffers,
 * preventing buffer length mismatch exceptions and timing attacks on string length.
 */
export function verifyPasscode(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected || !submitted) {
    return false;
  }

  const submittedHash = crypto.createHash("sha256").update(submitted).digest();
  const expectedHash = crypto.createHash("sha256").update(expected).digest();

  return crypto.timingSafeEqual(submittedHash, expectedHash);
}

/**
 * Generates a signed session token: HMAC-SHA256 over an expiry timestamp using ADMIN_SESSION_SECRET.
 * Token structure: "<expiryTimestamp>.<hmacSignature>"
 */
export function createAdminSessionToken(customExpiry?: number): { token: string; expiry: number } {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured on the server");
  }

  const expiry = customExpiry ?? (Date.now() + ADMIN_SESSION_DURATION_MS);
  const expiryStr = String(expiry);

  const signature = crypto
    .createHmac("sha256", secret)
    .update(expiryStr)
    .digest("hex");

  return {
    token: `${expiryStr}.${signature}`,
    expiry,
  };
}

/**
 * Verifies the admin session token by checking:
 * 1. Valid structure (<expiry>.<signature>)
 * 2. Expiry timestamp has not elapsed (expiry > Date.now())
 * 3. Constant-time HMAC-SHA256 signature verification with ADMIN_SESSION_SECRET
 */
export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") {
    return false;
  }

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    return false;
  }

  const dotIndex = token.indexOf(".");
  if (dotIndex === -1) {
    return false;
  }

  const expiryStr = token.slice(0, dotIndex);
  const providedSignature = token.slice(dotIndex + 1);

  const expiry = parseInt(expiryStr, 10);
  if (!Number.isFinite(expiry) || expiry <= Date.now()) {
    return false; // Token expired or invalid timestamp format
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(expiryStr)
    .digest("hex");

  const providedBuf = Buffer.from(providedSignature, "hex");
  const expectedBuf = Buffer.from(expectedSignature, "hex");

  if (providedBuf.length !== expectedBuf.length || providedBuf.length === 0) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuf, expectedBuf);
}

export type AdminLoginResult = {
  success: boolean;
  error?: string;
  status: number;
};

/**
 * Performs admin login with rate limiting, constant-time passcode check,
 * ~1 second failure delay, and 8-hour signed session cookie creation.
 */
export async function loginAdmin(passcode: string): Promise<AdminLoginResult> {
  const ip = await getClientIp();

  // 1. Rate limiting check (5 failures in 15 minutes)
  if (isRateLimited(ip)) {
    return {
      success: false,
      error: "Too many failed attempts. Please try again after 15 minutes.",
      status: 429,
    };
  }

  // 2. Validate passcode with constant-time comparison
  const isValid = verifyPasscode(passcode);

  if (!isValid) {
    recordFailedAttempt(ip);

    // Wait about 1 second on failure
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: false,
      error: "Invalid passcode. Please try again.",
      status: 401,
    };
  }

  // 3. Clear failed attempts on success
  clearFailedAttempts(ip);

  // 4. Create signed session token and set cookie (httpOnly, secure in prod, sameSite strict, path /, 8h expiry)
  const { token, expiry } = createAdminSessionToken();
  const cookieStore = await cookies();

  cookieStore.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
    expires: new Date(expiry),
  });

  return {
    success: true,
    status: 200,
  };
}

/**
 * Clears the admin session cookie.
 */
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}

