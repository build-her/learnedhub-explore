"use client";

import { useRef } from "react";
import ShareExportBar from "@/components/ShareExportBar";

export default function DemoExportPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <main className="flex flex-col items-center gap-xl p-xl">
      <div
        ref={cardRef}
        className="bg-surface-tint rounded-lg p-xl flex flex-col gap-md"
        style={{ width: 400 }}
      >
        <h1 className="type-h1 text-discover">Sample artifact</h1>
        <p className="type-body text-main">
          This card is what gets captured when you export. Swap this content
          for a real Discover, Explore, or Build result later — the export
          bar doesn&apos;t care what&apos;s inside.
        </p>
        <p className="type-caption text-muted">Learned Hub — demo artifact</p>
      </div>

      <ShareExportBar
        targetRef={cardRef}
        filename="learned-hub-demo"
        shareMessage="Check out this Learned Hub artifact:"
        accent="discover"
      />
    </main>
  );
}