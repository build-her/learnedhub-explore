import Link from "next/link";
import { logoutAction } from "@/app/ops/enter/actions";

export default function AdminHeader() {
  return (
    <header className="border-b border-line bg-surface-base px-lg py-md">
      <div className="max-w-[1000px] w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-lg">
          <span className="type-h2 font-bold text-main">
            LearnedHub Admin
          </span>
          <nav className="flex items-center gap-md">
            <Link
              href="/admin/analytics"
              className="type-caption font-medium text-muted hover:text-main transition-colors"
            >
              Analytics
            </Link>
            <Link
              href="/admin/codes"
              className="type-caption font-medium text-muted hover:text-main transition-colors"
            >
              Codes
            </Link>
          </nav>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="type-caption font-semibold text-muted hover:text-red-600 transition-colors cursor-pointer"
          >
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}

