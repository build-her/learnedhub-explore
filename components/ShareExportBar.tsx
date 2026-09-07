"use client";

import { useState, type RefObject } from "react";
import {
  exportNodeAsImage,
  exportNodeAsPdf,
  copyCurrentLink,
  shareToWhatsApp,
} from "@/lib/export";

type AccentColor = "discover" | "explore" | "build" | "dossier" | "brand-primary";

const accentClassMap: Record<AccentColor, string> = {
  discover: "bg-discover",
  explore: "bg-explore",
  build: "bg-build",
  dossier: "bg-dossier",
  "brand-primary": "bg-brand-primary",
};

type ShareExportBarProps = {
  targetRef: RefObject<HTMLElement | null>;
  filename?: string;
  shareMessage?: string;
  accent?: AccentColor;
};

export default function ShareExportBar({
  targetRef,
  filename = "learned-hub-export",
  shareMessage,
  accent = "brand-primary",
}: ShareExportBarProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function requireNode(): HTMLElement {
    const node = targetRef.current;
    if (!node) throw new Error("Nothing to export yet.");
    return node;
  }

  async function handle(action: () => Promise<void> | void, successLabel: string) {
    setBusy(true);
    setStatus(null);
    try {
      await action();
      setStatus(successLabel);
    } catch {
      setStatus("Something went wrong — try again.");
    } finally {
      setBusy(false);
      window.setTimeout(() => setStatus(null), 2500);
    }
  }

  const buttonClass = `type-caption text-surface-base px-md py-sm rounded-sm disabled:opacity-50 ${accentClassMap[accent]}`;

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex flex-wrap gap-sm">
        <button
          type="button"
          disabled={busy}
          onClick={() => handle(() => exportNodeAsPdf(requireNode(), filename), "PDF downloaded")}
          className={buttonClass}
        >
          Download PDF
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() => handle(() => exportNodeAsImage(requireNode(), filename), "Image downloaded")}
          className={buttonClass}
        >
          Download image
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() =>
            handle(async () => {
              const ok = await copyCurrentLink();
              if (!ok) throw new Error("copy failed");
            }, "Link copied")
          }
          className={buttonClass}
        >
          Copy link
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() => handle(() => shareToWhatsApp(shareMessage), "Opening WhatsApp")}
          className={buttonClass}
        >
          Share to WhatsApp
        </button>
      </div>

      {status && <p className="type-caption text-muted">{status}</p>}
    </div>
  );
}