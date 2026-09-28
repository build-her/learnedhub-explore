import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | LearnedHub",
  description:
    "LearnedHub privacy policy in plain, student-readable English. Learn how we protect your information, avoid account passwords, and handle data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-tint">
      {/* Top Navigation */}
      <header className="border-b border-line bg-surface-base px-lg py-md">
        <div className="max-w-[760px] w-full mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="type-h2 text-discover font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            LearnedHub
          </Link>
          <div className="flex items-center gap-md">
            <Link
              href="/terms"
              className="type-caption text-muted hover:text-main transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/discover"
              className="type-caption font-bold text-discover hover:underline"
            >
              Start Discover →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 px-lg py-xl">
        <article className="max-w-[760px] w-full mx-auto flex flex-col gap-lg">
          {/* Header Card */}
          <div className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-sm">
            <div className="flex flex-wrap items-center justify-between gap-xs">
              <span className="type-caption font-semibold px-sm py-0.5 rounded-full bg-discover-tint text-discover border border-discover-border">
                Student &amp; Learner Privacy
              </span>
              <span className="type-caption text-muted">
                Last updated: September 28, 2026
              </span>
            </div>

            <h1 className="type-display-lg text-main">Privacy Policy</h1>

            <p className="type-body text-muted leading-relaxed">
              We built LearnedHub so students can explore higher-education pathways without giving away their personal identity. This page explains what information we collect, how it is used, and how your privacy is protected—written in plain English without confusing legal jargon.
            </p>

            {/* Draft Notice Banner */}
            <div className="mt-sm rounded-lg border border-amber-300 bg-amber-50 p-md flex items-start gap-sm">
              <span className="text-amber-800 text-lg leading-none select-none">⚠️</span>
              <div className="flex flex-col gap-xs">
                <span className="type-caption font-bold text-amber-900 uppercase tracking-wide">
                  Draft — Pending Legal Review
                </span>
                <p className="type-caption text-amber-800 leading-normal">
                  This document explains our current data practices in clear, student-friendly terms. It is currently a working draft pending formal legal review.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: The Core Rule: Code, Not an Account */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">1. Identified by a Code, Not an Account</h2>
            <p className="type-body text-muted leading-relaxed">
              On most websites, you have to sign up with an email address, pick a password, and verify your personal details. LearnedHub does not work that way.
            </p>
            <div className="rounded-lg bg-surface-tint border border-line p-md">
              <p className="type-body font-medium text-main">
                Learners are identified by a unique <strong>LearnedHub Code</strong> (such as <code className="px-xs py-0.5 bg-surface-base border border-line rounded text-xs font-mono font-bold text-discover">LH-XXXX-XXXX</code>), not an account.
              </p>
              <p className="type-caption text-muted mt-xs">
                You do not need an email or password to use LearnedHub. Your code is all that connects you to your saved quiz results and reflections.
              </p>
            </div>
          </section>

          {/* Section 2: What We Collect vs What We Do Not */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">2. What We Collect and What We Never Ask For</h2>

            <div className="flex flex-col gap-sm">
              <h3 className="type-body font-bold text-main">What we collect from learners:</h3>
              <ul className="list-disc pl-lg flex flex-col gap-xs type-body text-muted">
                <li>
                  <strong className="text-main">Preferred name:</strong> A first name or nickname you choose so the platform can address you naturally and label your Dossier.
                </li>
                <li>
                  <strong className="text-main">Optional access code:</strong> A cohort or school code if your school, teacher, or sponsor provided one to unlock access.
                </li>
                <li>
                  <strong className="text-main">Quiz and reflection responses:</strong> The answers you select during the Discover assessment and the written thoughts you share when exploring course pathways (Field Defense).
                </li>
                <li>
                  <strong className="text-main">Usage activity:</strong> Basic technical activity like the pages you visit, buttons you click, and pathway milestones you complete, which helps us improve the platform experience.
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50/60 p-md flex flex-col gap-xs mt-xs">
              <h3 className="type-body font-bold text-red-900">What we do NOT collect from learners:</h3>
              <p className="type-body text-red-800 leading-relaxed">
                We do <strong>not</strong> collect email addresses, passwords, phone numbers, or home/physical addresses from students and learners. We do not ask for government IDs, social media profiles, or financial information.
              </p>
            </div>
          </section>

          {/* Section 3: Cookies and Your Session */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">3. Cookies and Your Session</h2>
            <p className="type-body text-muted leading-relaxed">
              To keep your progress saved as you move between pages, a cookie stores your learner session in your web browser.
            </p>
            <ul className="list-disc pl-lg flex flex-col gap-xs type-body text-muted">
              <li>
                The cookie (named <code className="px-xs py-0.5 bg-surface-tint border border-line rounded text-xs font-mono text-main">learnedhub_learner_id</code>) remembers your active learner session on that device.
              </li>
              <li>
                This means you can close your browser tab, come back later, and continue your work without having to log in with credentials.
              </li>
              <li>
                We do not use third-party tracking cookies or sell ad-tracking data to advertisers.
              </li>
            </ul>
          </section>

          {/* Section 4: Contact Form Submissions */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">4. Contact Form Submissions</h2>
            <p className="type-body text-muted leading-relaxed">
              If an adult, school administrator, parent, or partner chooses to get in touch with us using our website contact form, we collect:
            </p>
            <ul className="list-disc pl-lg flex flex-col gap-xs type-body text-muted">
              <li>Their name</li>
              <li>Their email address</li>
              <li>The selected category (School Inquiry, Unlock Full Access, or Sponsorship)</li>
              <li>Their written message</li>
            </ul>
            <p className="type-body text-muted leading-relaxed">
              Contact form submissions are emailed directly to our team so we can review your inquiry and reply to you. We use this information solely to communicate with you regarding your request.
            </p>
          </section>

          {/* Section 5: Where Data Is Stored */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">5. Where Your Data Is Stored</h2>
            <p className="type-body text-muted leading-relaxed">
              All platform data (learner records, quiz responses, reflections, and session tokens) is stored securely on <strong>Supabase</strong>, our managed cloud database provider. Supabase employs modern security measures, including encryption in transit (HTTPS/TLS) and encryption at rest.
            </p>
          </section>

          {/* Section 6: Questions & Data Deletion Requests */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">6. Questions and Deletion Requests</h2>
            <p className="type-body text-muted leading-relaxed">
              You have the right to ask questions about your data or request that all your records be permanently deleted at any time.
            </p>

            <div className="rounded-lg bg-surface-tint border border-line p-md flex flex-col gap-sm">
              <p className="type-body text-main">
                For questions or data deletion requests, contact us at:{" "}
                <a
                  href="mailto:info.learnedhub@gmail.com"
                  className="font-bold text-discover hover:underline"
                >
                  info.learnedhub@gmail.com
                </a>
              </p>
              <div className="border-t border-line pt-sm">
                <p className="type-body text-main leading-relaxed">
                  <strong>Important for deletion requests:</strong> Because we do not collect your email or personal account info, deletion requests must include the learner&apos;s <strong>LearnedHub Code</strong> (e.g. <code className="px-xs py-0.5 bg-surface-base border border-line rounded text-xs font-mono font-bold text-discover">LH-XXXX-XXXX</code>) so we can locate and remove their records from our database.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
