import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Vivekanand Choudhari";
  const category = searchParams.get("category") || "Blog";
  const readTime = searchParams.get("readTime") || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#06B6D4",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            {category}
          </div>
          {readTime && (
            <div style={{ fontSize: 14, color: "#64748B" }}>{readTime}</div>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 40 : 52,
              fontWeight: 700,
              color: "#E2E8F0",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #152038",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#06B6D4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              V
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{ fontSize: 16, fontWeight: 600, color: "#E2E8F0" }}
              >
                Vivekanand Choudhari
              </div>
              <div style={{ fontSize: 13, color: "#64748B" }}>
                Lead Design Engineer
              </div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#64748B" }}>
            vivekanand.dev
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
