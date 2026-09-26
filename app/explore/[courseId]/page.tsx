import { notFound } from "next/navigation";
import Link from "next/link";
import { type Course } from "@/lib/courses";
import { supabase } from "@/lib/supabase";

interface CourseRow {
  id: string;
  faculty: string;
  name: string;
  stream: Course["stream"];
  short_description?: string | null;
  jamb_subjects?: string | null;
  waec_requirements?: string | null;
  utme_cutoff?: string | null;
  duration?: string | null;
  deep_dive?: string | null;
  profile_status: "breadth-only" | "full-profile";
  offered_at_list?: string[] | null;
  last_verified_cycle?: string | null;
  admissions_json?: {
    id?: string;
    slug?: string;
    shortDescription?: string;
    deepDive?: string;
    jambSubjects?: string[] | string;
    waecRequirements?: string;
    utmeCutoff?: string;
    duration?: string;
  } | null;
  offered_at_json?: Course["offeredAt"] | null;
}

function mapCourseRow(row: CourseRow): Course {
  const admissions = row.admissions_json || {};
  return {
    id: row.id,
    name: row.name,
    stream: row.stream,
    faculty: row.faculty,
    shortDescription: row.short_description || admissions.shortDescription || "",
    profileStatus: row.profile_status,
    jambSubjects: row.jamb_subjects || (Array.isArray(admissions.jambSubjects) ? admissions.jambSubjects.join(", ") : admissions.jambSubjects) || undefined,
    waecRequirements: row.waec_requirements || admissions.waecRequirements || undefined,
    utmeCutoff: row.utme_cutoff || admissions.utmeCutoff || undefined,
    duration: row.duration || admissions.duration || undefined,
    deepDive: row.deep_dive || admissions.deepDive || undefined,
    offeredAtList: row.offered_at_list || (Array.isArray(row.offered_at_json) ? row.offered_at_json.map((u) => typeof u === "string" ? u : u.university) : undefined),
    offeredAt: row.offered_at_json || undefined,
    lastVerifiedCycle: row.last_verified_cycle ?? null,
  };
}

function normalizeCourseName(str: string): string {
  return str
    .toLowerCase()
    .replace(/\(.*?\)/g, "")      // strip parenthetical qualifications like (MBBS), (DVM), etc.
    .replace(/\b(and|&)\b/gi, "") // strip 'and' and '&'
    .replace(/[^a-z0-9]/gi, "")   // strip all punctuation, hyphens, slashes, and whitespace
    .trim();
}

async function getCourseFromSupabase(courseId: string): Promise<Course | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(courseId);

  if (isUuid) {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .maybeSingle();

    if (!error && data) {
      return mapCourseRow(data as CourseRow);
    }
    return null;
  }

  // Non-UUID slug fallback: fetch courses and match using normalized strings
  const { data: allCourses, error } = await supabase.from("courses").select("*");
  if (error || !allCourses) return null;

  const target = normalizeCourseName(courseId);
  const rows = allCourses as CourseRow[];

  // 1. Try exact normalized match
  const exact = rows.find((r) => normalizeCourseName(r.name) === target);
  if (exact) return mapCourseRow(exact);

  // 2. Try bidirectional substring normalized match
  const substringMatch = rows.find((r) => {
    const norm = normalizeCourseName(r.name);
    return norm.includes(target) || target.includes(norm);
  });
  if (substringMatch) return mapCourseRow(substringMatch);

  return null;
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
                  {typeof course.jambSubjects === "string"
                    ? course.jambSubjects
                    : Array.isArray(course.jambSubjects)
                    ? (course.jambSubjects as string[]).join(", ")
                    : "Not yet available"}
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
                <p className="type-body text-main mt-sm leading-relaxed">{course.deepDive}</p>
              </details>
            )}

            {((course.offeredAtList && course.offeredAtList.length > 0) || (course.offeredAt && course.offeredAt.length > 0)) && (
              <div className="rounded-lg border border-explore-border bg-surface-base p-lg flex flex-col gap-sm">
                <h2 className="type-h2 text-main mb-xs">Where it&apos;s offered</h2>
                {course.offeredAtList && course.offeredAtList.length > 0 ? (
                  <div className="flex flex-wrap gap-xs">
                    {course.offeredAtList.map((uni) => (
                      <span
                        key={uni}
                        className="type-caption font-semibold px-md py-xs rounded-md bg-surface-tint border border-line text-main"
                      >
                        {uni}
                      </span>
                    ))}
                  </div>
                ) : (
                  course.offeredAt?.map((uni) => (
                    <div key={uni.university} className="flex flex-col gap-xs">
                      <p className="type-body text-main font-semibold">
                        {uni.university}{" "}
                        <span className="type-caption text-muted">({uni.type})</span>
                      </p>
                      {uni.notes && (
                        <p className="type-caption text-muted">{uni.notes}</p>
                      )}
                    </div>
                  ))
                )}
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