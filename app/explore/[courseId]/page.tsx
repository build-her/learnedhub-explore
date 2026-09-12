import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseById } from "@/lib/courses";

export default async function CourseProfilePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
      <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
        <Link href="/explore" className="type-caption text-muted">
          ← Back to search
        </Link>

        <div className="flex flex-col gap-xs">
          <span className="type-caption text-muted uppercase tracking-wider">
            {course.faculty}
          </span>
          <h1 className="type-display-lg text-explore">{course.name}</h1>
        </div>

        {course.profileStatus === "breadth-only" ? (
          <div className="rounded-lg border border-dashed border-[var(--text-muted)] bg-surface-base p-lg flex flex-col gap-sm">
            <span className="type-caption text-muted italic">
              Full profile coming soon
            </span>
            <p className="type-body text-main">{course.shortDescription}</p>
            <p className="type-body text-muted">
              We&apos;re still researching detailed admissions data and the full
              course breakdown for {course.name}. Check back soon, or explore
              another course in {course.faculty} in the meantime.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-explore-border bg-surface-base p-lg flex flex-col gap-sm">
              <h2 className="type-h2 text-main mb-xs">Admissions at a glance</h2>

              <div className="flex flex-col gap-xs">
                <span className="type-caption text-muted uppercase tracking-wider">
                  JAMB Subjects
                </span>
                <p className="type-body text-main">
                  {course.jambSubjects?.join(", ") ?? "Not yet available"}
                </p>
              </div>

              <div className="flex flex-col gap-xs">
                <span className="type-caption text-muted uppercase tracking-wider">
                  WAEC Requirements
                </span>
                <p className="type-body text-main">
                  {course.waecRequirements ?? "Not yet available"}
                </p>
              </div>

              <div className="flex flex-col gap-xs">
                <span className="type-caption text-muted uppercase tracking-wider">
                  Typical UTME Cutoff
                </span>
                <p className="type-body text-main">
                  {course.utmeCutoff ?? "Not yet available"}
                </p>
              </div>

              <div className="flex flex-col gap-xs">
                <span className="type-caption text-muted uppercase tracking-wider">
                  Duration
                </span>
                <p className="type-body text-main">
                  {course.duration ?? "Not yet available"}
                </p>
              </div>
            </div>

            {course.deepDive && (
              <details className="rounded-lg border border-explore-border bg-surface-base p-lg">
                <summary className="type-h2 text-main cursor-pointer">
                  What studying this actually involves
                </summary>
                <p className="type-body text-main mt-sm">{course.deepDive}</p>
              </details>
            )}

            {course.offeredAt && course.offeredAt.length > 0 && (
              <div className="rounded-lg border border-explore-border bg-surface-base p-lg flex flex-col gap-sm">
                <h2 className="type-h2 text-main mb-xs">Where it&apos;s offered</h2>
                {course.offeredAt.map((uni) => (
                  <div key={uni.university} className="flex flex-col gap-xs">
                    <p className="type-body text-main font-semibold">
                      {uni.university}{" "}
                      <span className="type-caption text-muted">({uni.type})</span>
                    </p>
                    {uni.notes && (
                      <p className="type-caption text-muted">{uni.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}