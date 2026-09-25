import { notFound } from "next/navigation";
import Link from "next/link";
import { type Course } from "@/lib/courses";
import { supabase } from "@/lib/supabase";

interface CourseRow {
  id: string;
  faculty: string;
  name: string;
  stream: Course["stream"];
  admissions_json: {
    id?: string;
    slug?: string;
    shortDescription?: string;
    deepDive?: string;
    jambSubjects?: string[];
    waecRequirements?: string;
    utmeCutoff?: string;
    duration?: string;
  } | null;
  profile_status: "breadth-only" | "full-profile";
  offered_at_json: Course["offeredAt"] | null;
  last_verified_cycle: string | null;
}

function mapCourseRow(row: CourseRow): Course {
  const admissions = row.admissions_json || {};
  return {
    id: admissions.id || admissions.slug || row.id,
    name: row.name,
    stream: row.stream,
    faculty: row.faculty,
    shortDescription: admissions.shortDescription || "",
    profileStatus: row.profile_status,
    jambSubjects: admissions.jambSubjects || undefined,
    waecRequirements: admissions.waecRequirements || undefined,
    utmeCutoff: admissions.utmeCutoff || undefined,
    duration: admissions.duration || undefined,
    deepDive: admissions.deepDive || undefined,
    offeredAt: row.offered_at_json || undefined,
  };
}

async function getCourseFromSupabase(courseId: string): Promise<Course | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(courseId);
  let query = supabase.from("courses").select("*");

  if (isUuid) {
    query = query.eq("id", courseId);
  } else {
    query = query.filter("admissions_json->>id", "eq", courseId);
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    if (!isUuid) {
      const { data: slugData } = await supabase
        .from("courses")
        .select("*")
        .filter("admissions_json->>slug", "eq", courseId)
        .maybeSingle();
      if (slugData) {
        return mapCourseRow(slugData as CourseRow);
      }
    }
    return null;
  }

  return mapCourseRow(data as CourseRow);
}

export default async function CourseProfilePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourseFromSupabase(courseId);

  if (!course) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
      <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
        <Link href="/explore/courses" className="type-caption text-muted hover:text-explore">
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
        <Link
          href={`/explore/${course.id}/defend`}
          className="block w-full text-center py-sm rounded-md type-body font-bold text-surface-base bg-explore"
        >
          Build your case for this course →
        </Link>
      </div>
    </main>
  );
}