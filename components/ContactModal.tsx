"use client";

import { useState, useEffect } from "react";

export type ContactCategory = "School Inquiry" | "Unlock Full Access" | "Sponsorship";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ContactCategory;
}

const CATEGORIES: { key: ContactCategory; label: string; accent: string }[] = [
  { key: "School Inquiry", label: "School Inquiry", accent: "discover" },
  { key: "Unlock Full Access", label: "Unlock Full Access", accent: "explore" },
  { key: "Sponsorship", label: "Sponsorship", accent: "build" },
];

export default function ContactModal({
  isOpen,
  onClose,
  initialCategory = "School Inquiry",
}: ContactModalProps) {
  const [category, setCategory] = useState<ContactCategory>(initialCategory);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync category when initialCategory changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCategory(initialCategory);
      setIsSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen, initialCategory]);

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Please enter a message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.error || "Failed to send your inquiry. Please try again.");
      } else {
        setIsSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-[480px] rounded-xl bg-surface-base border border-line shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-lg pt-lg pb-sm border-b border-line bg-surface-tint">
          <div>
            <span className="type-caption font-bold uppercase tracking-wider text-muted text-xs">
              Get in Touch
            </span>
            <h2 id="contact-modal-title" className="type-h2 text-main">
              Contact LearnedHub
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-muted hover:text-main hover:bg-surface-base transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-lg overflow-y-auto">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-lg gap-md">
              <div className="w-14 h-14 rounded-full bg-discover-tint border border-discover-border flex items-center justify-center text-discover text-2xl">
                ✓
              </div>
              <div className="flex flex-col gap-xs max-w-[360px]">
                <h3 className="type-h2 text-main">Thanks, we&apos;ll be in touch!</h3>
                <p className="type-body text-muted text-sm leading-relaxed">
                  We&apos;ve received your <strong className="text-main">{category}</strong> inquiry. Our team will review your message and get back to you shortly.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-sm type-body font-bold text-surface-base bg-brand-primary px-xl py-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-md">
              {/* Category Selector */}
              <div className="flex flex-col gap-xs">
                <label className="type-caption font-bold text-main uppercase tracking-wider text-xs">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-xs">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.key;
                    let activeStyles = "bg-discover text-surface-base border-discover";
                    if (cat.accent === "explore") activeStyles = "bg-explore text-surface-base border-explore";
                    if (cat.accent === "build") activeStyles = "bg-build text-surface-base border-build";

                    return (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => {
                          setCategory(cat.key);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className={`type-caption font-semibold py-xs px-xs rounded-md border text-center transition-colors text-[11px] leading-tight flex items-center justify-center min-h-[38px] ${
                          isSelected
                            ? activeStyles
                            : "bg-surface-base text-muted border-line hover:text-main"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name Field */}
              <div className="flex flex-col gap-xs">
                <label htmlFor="contact-name" className="type-caption font-bold text-main">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="e.g. Mrs. Adeyemi or Dr. Babatunde"
                  className="type-body px-md py-sm rounded-md border border-line bg-surface-base text-main placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-xs">
                <label htmlFor="contact-email" className="type-caption font-bold text-main">
                  Your Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="name@example.com"
                  className="type-body px-md py-sm rounded-md border border-line bg-surface-base text-main placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-xs">
                <label htmlFor="contact-message" className="type-caption font-bold text-main">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder={
                    category === "School Inquiry"
                      ? "Tell us about your school, student cohort size, and what you're looking for..."
                      : category === "Unlock Full Access"
                      ? "Let us know about your child's stage and any specific pathways you want to unlock..."
                      : "Tell us about your organization and how you'd like to support student access..."
                  }
                  className="type-body px-md py-sm rounded-md border border-line bg-surface-base text-main placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 resize-none"
                />
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="rounded-md border border-red-300 bg-red-50 p-sm text-red-700 type-caption font-semibold text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-xs">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-sm rounded-md type-body font-bold text-surface-base bg-brand-primary hover:opacity-90 transition-opacity ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
