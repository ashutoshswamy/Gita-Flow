import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Gita Flow - Spiritual Wisdom from Krishna";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background:
            "linear-gradient(to bottom right, #10b981, #059669, #047857)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div style={{ fontSize: 120 }}>🕉️</div>
          <div style={{ fontSize: 80, fontWeight: "bold" }}>Gita Flow</div>
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: "center",
            maxWidth: "900px",
            opacity: 0.95,
          }}
        >
          Seek Divine Wisdom from Lord Krishna
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: "30px",
            opacity: 0.8,
          }}
        >
          AI-Powered Spiritual Guidance from Bhagavad Gita
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
