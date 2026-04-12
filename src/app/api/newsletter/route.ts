import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Sanitize
    const sanitizedEmail = email.replaceAll(/[<>]/g, "").trim().slice(0, 254);

    // If a newsletter service is configured (e.g. Buttondown, ConvertKit), forward here
    const newsletterApiKey = process.env.NEWSLETTER_API_KEY;
    const newsletterApiUrl = process.env.NEWSLETTER_API_URL;

    if (newsletterApiKey && newsletterApiUrl) {
      const response = await fetch(newsletterApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newsletterApiKey}`,
        },
        body: JSON.stringify({ email: sanitizedEmail }),
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Failed to subscribe" },
          { status: 500 }
        );
      }
    }

    console.log("Newsletter subscription:", sanitizedEmail);

    return NextResponse.json(
      { success: true, message: "Subscribed successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
