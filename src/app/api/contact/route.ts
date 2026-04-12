import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitize = (str: string) =>
      str.replaceAll(/[<>]/g, "").trim().slice(0, 1000);

    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      subject: sanitize(subject),
      message: sanitize(message).slice(0, 5000),
      timestamp: new Date().toISOString(),
    };

    // Option 1: If FORMSPREE_ID is set, forward to Formspree
    const formspreeId = process.env.FORMSPREE_ID;
    if (formspreeId) {
      const formspreeResponse = await fetch(
        `https://formspree.io/f/${formspreeId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedData),
        }
      );

      if (!formspreeResponse.ok) {
        return NextResponse.json(
          { error: "Failed to send message" },
          { status: 500 }
        );
      }
    }

    // Log the submission (useful for development)
    console.log("Contact form submission:", sanitizedData);

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
