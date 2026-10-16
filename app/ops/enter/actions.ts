"use server";

import { loginAdmin, logoutAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
  status?: number;
};

export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const passcode = formData.get("passcode");
  const result = await loginAdmin(typeof passcode === "string" ? passcode : "");

  if (result.success) {
    redirect("/admin");
  }

  return {
    error: result.error,
    status: result.status,
  };
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/ops/enter");
}

