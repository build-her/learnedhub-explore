"use client";

import { useState, type RefObject } from "react";
import {
  exportNodeAsImage,
  exportNodeAsPdf,
  copyCurrentLink,
  shareToWhatsApp,
} from "@/lib/export";
import { logEvent, type PathwayName } from "@/lib/events";

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
  screen?: string;
  shareId?: string;
  shareUrl?: string;
};

export default function ShareExportBar({
  targetRef,
  filename = "learned-hub-export",
  shareMessage,
  accent = "brand-primary",
  screen,
  shareId,
  shareUrl,
}: ShareExportBarProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function requireNode(): HTMLElement {
    const node = targetRef.current;
    if (!node) throw new Error("Nothing to export yet.");
    return node;
  }

  const pathway: PathwayName =
    accent === "explore" ? "explore" : accent === "build" ? "build" : "discover";

  const resolvedScreen =
    screen ||
    (accent === "explore"
      ? "explore_defend"
      : accent === "dossier"
      ? "dossier"
      : "discover_result");

  const effectiveShareUrl =
    shareUrl || (shareId ? `/dossier/share/${shareId}` : undefined);

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
          onClick={() =>
            handle(async () => {
              await exportNodeAsPdf(requireNode(), filename);
              logEvent({
                event_type: "artifact_shared",
                pathway,
                screen: resolvedScreen,
                metadata_json: {
                  share_type: "pdf",
                  filename,
                  share_id: shareId,
                  share_url: effectiveShareUrl,
                },
              });
            }, "PDF downloaded")
          }
          className={buttonClass}
        >
          Download PDF
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() =>
            handle(async () => {
              await exportNodeAsImage(requireNode(), filename);
              logEvent({
                event_type: "artifact_shared",
                pathway,
                screen: resolvedScreen,
                metadata_json: {
                  share_type: "image",
                  filename,
                  share_id: shareId,
                  share_url: effectiveShareUrl,
                },
              });
            }, "Image downloaded")
          }
          className={buttonClass}
        >
          Download image
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() =>
            handle(async () => {
              const ok = await copyCurrentLink(effectiveShareUrl);
              if (!ok) throw new Error("copy failed");
              logEvent({
                event_type: "artifact_shared",
                pathway,
                screen: resolvedScreen,
                metadata_json: {
                  share_type: "copy_link",
                  filename,
                  share_id: shareId,
                  share_url: effectiveShareUrl,
                },
              });
            }, "Link copied")
          }
          className={buttonClass}
        >
          Copy link
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() =>
            handle(() => {
              shareToWhatsApp(shareMessage, effectiveShareUrl);
              logEvent({
                event_type: "artifact_shared",
                pathway,
                screen: resolvedScreen,
                metadata_json: {
                  share_type: "whatsapp",
                  filename,
                  share_id: shareId,
                  share_url: effectiveShareUrl,
                },
              });
            }, "Opening WhatsApp")
          }
          className={buttonClass}
        >
          Share to WhatsApp
        </button>
      </div>

      {status && <p className="type-caption text-muted">{status}</p>}
    </div>
  );
}