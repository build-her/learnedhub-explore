"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { type CourseStream, type Course } from "@/lib/courses";
import { supabase } from "@/lib/supabase";
import { logEvent } from "@/lib/events";

function isCourseStream(value: string | null): value is CourseStream {
  return value === "science" || value === "arts" || value === "commercial" || value === "technical";
}

const STREAM_LABELS: Record<CourseStream, string> = {
  science: "Science",
  arts: "Arts",
  commercial: "Commercial",
  technical: "Technical",
};

interface CourseRow {
  id: string;
  faculty: string;
  name: string;
  stream: CourseStream;
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

function ExploreContent() {
  const searchParams = useSearchParams();
  const rawStream = searchParams.get("stream");
  const initialStream: CourseStream | null = isCourseStream(rawStream) ? rawStream : null;

  const [activeStream, setActiveStream] = useState<CourseStream | null>(initialStream);
  const [activeFaculty, setActiveFaculty] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const hasLoggedSearchRef = useRef(false);

  function triggerPathwayStarted(searchTerm?: string) {
    if (!hasLoggedSearchRef.current) {
      hasLoggedSearchRef.current = true;
      logEvent({
        event_type: "pathway_started",
        pathway: "explore",
        screen: "explore_pathway_list",
        metadata_json: { query: searchTerm || undefined },
      });
    }
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCourses() {
      setLoading(true);
      const { data, error } = await supabase
        .from("courses")
        .select("*");

      if (isMounted) {
        if (!error && data) {
          setCourses((data as CourseRow[]).map(mapCourseRow));
        }
        setLoading(false);
      }
    }

    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  const faculties = useMemo(() => {
    if (!activeStream) return [];
    const streamCourses = courses.filter((c) => c.stream === activeStream);
    return Array.from(new Set(streamCourses.map((c) => c.faculty)));
  }, [activeStream, courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (activeStream && course.stream !== activeStream) return false;
      if (activeFaculty && course.faculty !== activeFaculty) return false;
      if (query.trim() && !course.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [activeStream, activeFaculty, query, courses]);

  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
      <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
        <div className="flex flex-col gap-xs">
          <span className="type-caption text-muted uppercase tracking-wider">
            Explore
          </span>
          <h1 className="type-display-lg text-explore">Find your course</h1>
        </div>

        <div className="flex flex-wrap gap-xs">
          {(Object.keys(STREAM_LABELS) as CourseStream[]).map((stream) => (
            <button
              key={stream}
              type="button"
              onClick={() => {
                setActiveStream(stream === activeStream ? null : stream);
                setActiveFaculty(null);
              }}
              className={`type-caption px-md py-xs rounded-full border ${
                activeStream === stream
                  ? "bg-explore text-surface-base border-explore"
                  : "bg-surface-base text-muted border-explore-border"
              }`}
            >
              {STREAM_LABELS[stream]}
            </button>
          ))}
        </div>

        {activeStream && faculties.length > 0 && (
          <div className="flex flex-wrap gap-xs">
            {faculties.map((faculty) => (
              <button
                key={faculty}
                type="button"
                onClick={() => setActiveFaculty(faculty === activeFaculty ? null : faculty)}
                className={`type-caption px-md py-xs rounded-full border ${
                  activeFaculty === faculty
                    ? "bg-explore text-surface-base border-explore"
                    : "bg-surface-base text-muted border-explore-border"
                }`}
              >
                {faculty}
              </button>
            ))}
          </div>
        )}

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim().length > 0) {
              triggerPathwayStarted(e.target.value.trim());
            }
          }}
          placeholder="Search course name..."
          className="type-body px-md py-sm rounded-lg border border-explore-border bg-surface-base text-main"
        />

        <div className="flex flex-col gap-sm">
          {loading ? (
            <p className="type-body text-muted">Loading courses...</p>
          ) : filteredCourses.length === 0 ? (
            <p className="type-body text-muted">No courses match yet — try a different filter.</p>
          ) : (
            filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/explore/${course.id}`}
                className="rounded-lg border border-explore-border bg-surface-base p-md flex flex-col gap-xs"
              >
                <span className="type-caption text-muted uppercase tracking-wider">
                  {course.faculty}
                </span>
                <h2 className="type-h2 text-main">{course.name}</h2>
                <p className="type-body text-muted">{course.shortDescription}</p>
                {course.profileStatus === "breadth-only" && (
                  <span className="type-caption text-muted italic">
                    Full profile coming soon
                  </span>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreContent />
    </Suspense>
  );
}