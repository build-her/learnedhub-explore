import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";

/**
 * Shared export/share utilities — reused across every artifact screen.
 *
 * DOM capture is done in exactly one place, one way: html-to-image's
 * toCanvas(). Both export paths below reuse that same canvas — the PNG
 * path downloads it directly, the PDF path hands it to jsPDF purely as
 * a container/encoder. jsPDF never touches the DOM itself. This is the
 * closest thing to "one library used consistently" that's technically
 * possible, since no single library both rasterizes a DOM node AND
 * writes valid PDF bytes.
 */

const CAPTURE_OPTIONS = {
  pixelRatio: 2, // sharper output for download/share than 1:1 screen pixels
  cacheBust: true,
} as const;

function triggerDownload(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/** Capture a DOM node and download it as a PNG image. */
export async function exportNodeAsImage(
  node: HTMLElement,
  filename: string = "learned-hub-export"
): Promise<void> {
  const canvas = await toCanvas(node, CAPTURE_OPTIONS);
  triggerDownload(canvas.toDataURL("image/png"), `${filename}.png`);
}

/** Capture a DOM node and download it as a single-page PDF, sized to fit the content exactly. */
export async function exportNodeAsPdf(
  node: HTMLElement,
  filename: string = "learned-hub-export"
): Promise<void> {
  const canvas = await toCanvas(node, CAPTURE_OPTIONS);
  const { width, height } = canvas;

  const pdf = new jsPDF({
    orientation: width >= height ? "landscape" : "portrait",
    unit: "px",
    format: [width, height],
  });

  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
  pdf.save(`${filename}.pdf`);
}

/** Copy the current page URL to the clipboard. Returns whether it succeeded. */
export async function copyCurrentLink(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch {
    return false;
  }
}

/** Open a WhatsApp share of the current page URL, with an optional message prefix. */
export function shareToWhatsApp(message?: string): void {
  const url = window.location.href;
  const text = message ? `${message} ${url}` : url;
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer"
  );
}