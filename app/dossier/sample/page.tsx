import Link from "next/link";
import type { Metadata } from "next";
import BrandedArtifactCard from "@/components/BrandedArtifactCard";

export const metadata: Metadata = {
  title: "Sample Dossier | LearnedHub",
  description: "Preview a sample LearnedHub Dossier with example Field Action Plan and Field Defense content.",
};

export default function SampleDossierPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl min-h-screen">
      <div className="flex flex-col gap-xl max-w-[600px] w-full mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-sm border-b border-line">
          <Link href="/" className="type-caption text-muted hover:text-main">
            ← Home
          </Link>
          <div className="flex items-center gap-md">
            <Link href="/discover" className="type-caption text-discover hover:underline font-semibold">
              Start Discover →
            </Link>
          </div>
        </div>

        {/* Dossier Header */}
        <div className="flex flex-col gap-xs rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="type-caption font-bold text-xs uppercase tracking-wider text-muted">
              Sample Portfolio Preview
            </span>
            <span className="type-caption font-mono font-bold text-xs px-sm py-0.5 rounded bg-surface-tint border border-line text-muted">
              LH-SAMPLE
            </span>
          </div>

          <h1 className="type-display-lg text-main">
            Sample Student&apos;s Dossier
          </h1>

          <p className="type-body text-muted leading-relaxed">
            This is a preview of the verified educational portfolio a learner builds on LearnedHub.
            All content on this page is hardcoded sample data — no sign-up or identity check required to view.
          </p>

          <div className="flex flex-wrap gap-xs pt-sm border-t border-line mt-xs">
            <span className="type-caption px-sm py-0.5 rounded-full bg-surface-tint border border-line font-medium text-main">
              2 Sample Artifacts
            </span>
            <span className="type-caption px-sm py-0.5 rounded-full bg-discover-tint border border-discover-border text-discover font-medium">
              1 Field Action Plan
            </span>
            <span className="type-caption px-sm py-0.5 rounded-full bg-explore-tint border border-explore-border text-explore font-medium">
              1 Field Defense
            </span>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-md flex items-start gap-sm">
          <span className="text-amber-800 text-lg">💡</span>
          <div className="flex flex-col gap-0.5">
            <p className="type-caption font-semibold text-amber-900">
              Static Demonstration Only
            </p>
            <p className="type-caption text-amber-800 text-xs leading-relaxed">
              When a real learner completes the Discover quiz or defends a course in Explore, their actual timestamped records appear in their personal Dossier.
            </p>
          </div>
        </div>

        {/* Artifact 1: Sample Field Action Plan */}
        <div className="flex flex-col gap-xs">
          <div className="flex items-center justify-between">
            <span className="type-caption font-semibold text-xs text-muted uppercase tracking-wider">
              Example 1: Discover Pathway
            </span>
            <span className="type-caption font-mono text-xs text-muted">
              Ref: #SAMPLE-PLAN
            </span>
          </div>

          <BrandedArtifactCard
            type="plan"
            title="Science"
            subtitle="Field Action Plan · Matched Stream Self-Assessment"
            shareId="SAMPLE-PLAN"
            createdAt="2026-09-25T10:00:00Z"
            attemptNumber={1}
            summaryText="Based on assessment responses indicating strong curiosity for how physical systems work and high problem-solving engagement, the Science stream is the recommended academic match. This is a starting point for exploring engineering, medicine, and computing disciplines."
            learnerName="Sample Student (e.g. Tobi)"
          />
        </div>

        {/* Artifact 2: Sample Field Defense Summary */}
        <div className="flex flex-col gap-xs mt-sm">
          <div className="flex items-center justify-between">
            <span className="type-caption font-semibold text-xs text-muted uppercase tracking-wider">
              Example 2: Explore Defense
            </span>
            <span className="type-caption font-mono text-xs text-muted">
              Ref: #SAMPLE-DEFENSE
            </span>
          </div>

          <BrandedArtifactCard
            type="defense"
            title="Computer Science"
            subtitle="Field Defense Summary · Faculty of Science"
            shareId="SAMPLE-DEFENSE"
            createdAt="2026-09-25T11:30:00Z"
            jambSubjects={["English Language", "Mathematics", "Physics", "Chemistry"]}
            caseText="I chose Computer Science because I enjoy breaking complex real-world problems into logical algorithms. I want to build software systems that solve real challenges and create practical solutions."
            learnerName="Sample Student (e.g. Tobi)"
          />
        </div>

        {/* Call to Action: Start own journey */}
        <div className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md text-center mt-sm">
          <div className="flex flex-col gap-xs">
            <span className="type-caption font-bold text-xs uppercase tracking-wider text-discover">
              Start Your Journey
            </span>
            <h2 className="type-display-md text-main">
              Ready to create your own Dossier?
            </h2>
            <p className="type-body text-muted text-sm max-w-[440px] mx-auto">
              Find your stream with Discover or explore degree courses. Your personal portfolio will be saved and accessible here once you begin.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-xs justify-center pt-xs">
            <Link
              href="/discover"
              className="py-sm px-lg rounded-md bg-discover text-surface-base font-bold type-body hover:opacity-90 transition-opacity"
            >
              Start with Discover →
            </Link>
            <Link
              href="/explore"
              className="py-sm px-lg rounded-md bg-explore text-surface-base font-bold type-body hover:opacity-90 transition-opacity"
            >
              Explore Courses →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
