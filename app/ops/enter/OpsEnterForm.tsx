"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function OpsEnterForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="w-full max-w-sm max-w-[384px] rounded-xl border border-line bg-surface-base p-lg sm:p-xl shadow-sm">
      <div className="mb-md">
        <h1 className="type-h2 text-main">System Access</h1>
        <p className="type-caption text-muted mt-xs">
          Enter passcode to continue.
        </p>
      </div>

      <form action={formAction} className="w-full flex flex-col gap-md">
        <div className="w-full flex flex-col gap-xs">
          <label
            htmlFor="passcode"
            className="type-caption font-semibold text-main uppercase tracking-wider text-xs"
          >
            Passcode
          </label>
          <input
            id="passcode"
            name="passcode"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            placeholder="••••••••••••"
            disabled={isPending}
            className="w-full rounded-md border border-line bg-surface-tint px-md py-sm type-body text-main placeholder:text-muted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:opacity-50"
          />
        </div>

        {state?.error && (
          <div
            role="alert"
            className={`w-full rounded-md p-sm type-caption ${
              state.status === 429
                ? "border border-amber-300 bg-amber-50 text-amber-800"
                : "border border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-brand-primary py-sm px-md type-body font-bold text-surface-base hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-50 text-center cursor-pointer"
        >
          {isPending ? "Verifying..." : "Enter"}
        </button>
      </form>
    </div>
  );
}

