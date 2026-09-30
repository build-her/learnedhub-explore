import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LearnedHub Explore — Discover Your Career Path";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#15573e",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 800,
              color: "#15573e",
            }}
          >
            LH
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "#e2e8f0",
            }}
          >
            LearnedHub Explore
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "960px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              margin: 0,
              color: "#ffffff",
            }}
          >
            Discover your career path.
          </h1>
          <p
            style={{
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#c8e6da",
              margin: 0,
            }}
          >
            Interactive quiz, real Nigerian university courses, verified JAMB &amp; WAEC requirements, and shareable portfolio dossiers.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "24px",
            fontSize: "20px",
            fontWeight: 600,
            color: "#a7f3d0",
          }}
        >
          <span>🧭 Discover Stream</span>
          <span>·</span>
          <span>🔍 Explore 120+ Courses</span>
          <span>·</span>
          <span>📁 Verified Dossier</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
