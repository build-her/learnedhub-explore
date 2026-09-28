"use client";

import { useState } from "react";
import Link from "next/link";
import ContactModal, { type ContactCategory } from "@/components/ContactModal";

interface SiteFooterProps {
  onOpenContact?: (category: ContactCategory) => void;
}

export default function SiteFooter({ onOpenContact }: SiteFooterProps) {
  const [internalCategory, setInternalCategory] = useState<ContactCategory | null>(null);

  const handleAction = (category: ContactCategory) => {
    if (onOpenContact) {
      onOpenContact(category);
    } else {
      setInternalCategory(category);
    }
  };

  return (
    <footer className="bg-dossier px-lg py-lg text-surface-base">
      <div className="max-w-[1000px] w-full mx-auto">
        <Link
          href="/"
          className="inline-block type-h2 text-surface-base/90 mb-md hover:text-surface-base transition-colors"
        >
          LearnedHub
        </Link>
        <div className="flex flex-wrap gap-x-md gap-y-xs mb-md">
          {[
            { label: "Discover", href: "/discover" },
            { label: "Explore", href: "/explore" },
            { label: "See a sample Dossier", href: "/dossier/sample" },
            { label: "Build", href: "/build" },
            { label: "Courses", href: "/build" },
            { label: "Schools", onAction: () => handleAction("School Inquiry") },
            { label: "Parents", onAction: () => handleAction("Unlock Full Access") },
            { label: "Partners", onAction: () => handleAction("Sponsorship") },
            { label: "Contact", onAction: () => handleAction("School Inquiry") },
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ].map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="type-caption text-surface-base/80 hover:text-surface-base transition-colors"
              >
                {item.label}
              </Link>
            ) : item.onAction ? (
              <button
                key={item.label}
                type="button"
                onClick={item.onAction}
                className="type-caption text-surface-base/80 hover:text-surface-base transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ) : (
              <span key={item.label} className="type-caption text-surface-base/60">
                {item.label}
              </span>
            )
          )}
        </div>
        <div className="type-caption text-surface-base/40">
          © 2026 LearnedHub
        </div>
      </div>

      {!onOpenContact && (
        <ContactModal
          isOpen={internalCategory !== null}
          onClose={() => setInternalCategory(null)}
          initialCategory={internalCategory || "School Inquiry"}
        />
      )}
    </footer>
  );
}
