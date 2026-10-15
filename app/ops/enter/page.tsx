import type { Metadata } from "next";
import OpsEnterForm from "./OpsEnterForm";

export const metadata: Metadata = {
  title: "Access",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OpsEnterPage() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-md sm:p-lg bg-surface-tint">
      <OpsEnterForm />
    </main>
  );
}

