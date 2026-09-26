"use client";

import { forwardRef } from "react";
import type { ArtifactType } from "@/lib/artifacts";

export interface BrandedArtifactCardProps {
  type: ArtifactType;
  title: string;
  subtitle?: string;
  shareId?: string;
  createdAt?: string;
  learnerName?: string;
  summaryText?: string;
  attemptNumber?: number;
  jambSubjects?: string[] | string;
  caseText?: string;
  reflectionText?: string;
  className?: string;
}

const BrandedArtifactCard = forwardRef<HTMLDivElement, BrandedArtifactCardProps>(
  function BrandedArtifactCard(
    {
      type,
      title,
      subtitle,
      shareId,
      createdAt,
      learnerName,
      summaryText,
      attemptNumber,
      jambSubjects,
      caseText,
      reflectionText,
      className = "",
    },
    ref
  ) {
    const isPlan = type === "plan";
    const accentClass = isPlan ? "text-discover" : "text-explore";
    const borderClass = isPlan ? "border-discover-border" : "border-explore-border";
    const tintBgClass = isPlan ? "bg-discover-tint" : "bg-explore-tint";
    const badgeText = isPlan ? "Field Action Plan" : "Field Defense Summary";
    const pathwayName = isPlan ? "Discover" : "Explore";

    const formattedDate = createdAt
      ? new Date(createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;

    return (
      <div
        ref={ref}
        className={`rounded-xl border bg-surface-base p-lg sm:p-xl flex flex-col gap-md shadow-sm transition-all ${borderClass} ${className}`}
      >
        {/* Top Header: Brand Wordmark + Artifact Label + Verified Share ID */}
        <div className="flex items-center justify-between border-b border-line pb-sm">
          <div className="flex items-center gap-xs">
            <span className="font-bold text-main tracking-tight text-sm uppercase">
              LearnedHub
            </span>
            <span className="text-muted text-xs">/</span>
            <span className={`type-caption font-semibold uppercase tracking-wider ${accentClass}`}>
              {badgeText}
            </span>
          </div>

          <div className="flex items-center gap-xs">
            {shareId && (
              <span className="type-caption font-mono font-bold text-xs px-sm py-0.5 rounded bg-surface-tint border border-line text-muted">
                #{shareId}
              </span>
            )}
            <span
              className={`type-caption text-xs font-semibold px-sm py-0.5 rounded-full ${tintBgClass} ${accentClass}`}
            >
              {pathwayName}
            </span>
          </div>
        </div>

        {/* Hero Section: Stream or Course Title */}
        <div className="flex flex-col gap-xs">
          <div className="flex items-center justify-between">
            <span className="type-caption text-muted uppercase tracking-wider">
              {isPlan ? "Matched Direction" : "Target Course"}
            </span>
            {attemptNumber != null && (
              <span className="type-caption text-xs text-discover font-mono font-semibold">
                Attempt #{attemptNumber}
              </span>
            )}
          </div>
          <h2 className={`type-display-lg ${accentClass}`}>{title}</h2>
          {subtitle && <p className="type-caption text-muted font-medium">{subtitle}</p>}
        </div>

        {/* Content Section: Summary / Description */}
        {summaryText && (
          <div className="rounded-lg bg-surface-tint border border-line p-md">
            <p className="type-body text-main leading-relaxed">{summaryText}</p>
          </div>
        )}

        {/* Explore Field Defense Specifics: JAMB Subjects */}
        {!isPlan && jambSubjects && (Array.isArray(jambSubjects) ? jambSubjects.length > 0 : Boolean(jambSubjects)) && (
          <div className="flex flex-col gap-xs">
            <span className="type-caption text-muted uppercase tracking-wider text-xs">
              Required JAMB Subjects
            </span>
            {Array.isArray(jambSubjects) ? (
              <div className="flex flex-wrap gap-xs">
                {jambSubjects.map((sub) => (
                  <span
                    key={sub}
                    className="type-caption text-xs px-sm py-xs rounded bg-explore-tint text-explore border border-explore-border font-medium"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            ) : (
              <p className="type-body text-main text-xs leading-relaxed bg-explore-tint/40 border border-explore-border/60 rounded-md p-sm">
                {jambSubjects}
              </p>
            )}
          </div>
        )}

        {/* Explore Field Defense Specifics: Student Case ("My Case") */}
        {!isPlan && caseText && (
          <div className="flex flex-col gap-xs rounded-lg bg-explore-tint/40 border border-explore-border p-md">
            <span className="type-caption text-explore font-bold uppercase tracking-wider text-xs">
              My Case
            </span>
            <p className="type-body text-main italic whitespace-pre-wrap leading-relaxed">
              &ldquo;{caseText}&rdquo;
            </p>
          </div>
        )}

        {/* Field Action Plan Specifics: Redemptive Impact Reflection */}
        {isPlan && reflectionText && (
          <div className="flex flex-col gap-xs rounded-lg bg-discover-tint/60 border border-discover-border p-md">
            <span className="type-caption text-discover font-bold uppercase tracking-wider text-xs">
              Personal Reflection · Redemptive Impact
            </span>
            <p className="type-body text-main italic whitespace-pre-wrap leading-relaxed">
              &ldquo;{reflectionText}&rdquo;
            </p>
          </div>
        )}

        {/* Footer: Official Verification + Date + Learner Identification */}
        <div className="flex items-center justify-between pt-sm border-t border-line text-muted">
          <div className="flex flex-col">
            <span className="type-caption text-xs font-semibold text-main">
              {learnerName ? `Learner: ${learnerName}` : "Official LearnedHub Artifact"}
            </span>
            <span className="type-caption text-[11px] text-muted">
              Verified & recorded on LearnedHub platform
            </span>
          </div>

          {formattedDate && (
            <span className="type-caption text-xs font-mono text-muted">
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default BrandedArtifactCard;
