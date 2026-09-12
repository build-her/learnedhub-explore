"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  COURSES,
  getFacultiesByStream,
  type CourseStream,
} from "@/lib/courses";

function isCourseStream(value: string | null): value is CourseStream {
  return value === "science" || value === "arts" || value === "commercial" || value === "technical";
}

const STREAM_LABELS: Record<CourseStream, string> = {
  science: "Science",
  arts: "Arts",
  commercial: "Commercial",
  technical: "Technical",
};

function ExploreContent() {
  const searchParams = useSearchParams();
  const rawStream = searchParams.get("stream");
  const initialStream: CourseStream | null = isCourseStream(rawStream) ? rawStream : null;

  const [activeStream, setActiveStream] = useState<CourseStream | null>(initialStream);
  const [activeFaculty, setActiveFaculty] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const faculties = useMemo(
    () => (activeStream ? getFacultiesByStream(activeStream) : []),
    [activeStream]
  );

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      if (activeStream && course.stream !== activeStream) return false;
      if (activeFaculty && course.faculty !== activeFaculty) return false;
      if (query.trim() && !course.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [activeStream, activeFaculty, query]);

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
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search course name..."
          className="type-body px-md py-sm rounded-lg border border-explore-border bg-surface-base text-main"
        />

        <div className="flex flex-col gap-sm">
          {filteredCourses.length === 0 && (
            <p className="type-body text-muted">No courses match yet — try a different filter.</p>
          )}
          {filteredCourses.map((course) => (
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
          ))}
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