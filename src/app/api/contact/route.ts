import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: { user, pass },
});

const subjectMap: Record<string, string> = {
  job: "Job Opportunity",
  contract: "Contract / Freelance",
  collaboration: "Collaboration",
  speaking: "Speaking / Advisory",
  other: "Just Saying Hi",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subjectLabel = subjectMap[subject] || subject;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: "vivekanand.design@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subjectLabel} from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        mobile ? `Mobile: ${mobile}` : null,
        ``,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: [
        `<table style="font-family:sans-serif;max-width:540px;margin:0 auto;border-collapse:collapse">`,
        `<tr><td style="padding:24px 0;border-bottom:1px solid #eee">`,
        `<h2 style="margin:0;font-size:18px;color:#111">New contact from your portfolio</h2>`,
        `</td></tr>`,
        `<tr><td style="padding:16px 0">`,
        `<table style="width:100%;border-collapse:collapse">`,
        `<tr><td style="padding:6px 12px;color:#666;font-size:13px;width:80px">Name</td><td style="padding:6px 12px;font-size:14px;font-weight:600">${escapeHtml(name)}</td></tr>`,
        `<tr><td style="padding:6px 12px;color:#666;font-size:13px">Email</td><td style="padding:6px 12px;font-size:14px"><a href="mailto:${escapeHtml(email)}" style="color:#2563eb">${escapeHtml(email)}</a></td></tr>`,
        mobile ? `<tr><td style="padding:6px 12px;color:#666;font-size:13px">Mobile</td><td style="padding:6px 12px;font-size:14px">${escapeHtml(mobile)}</td></tr>` : "",
        `<tr><td style="padding:6px 12px;color:#666;font-size:13px">Subject</td><td style="padding:6px 12px;font-size:14px">${escapeHtml(subjectLabel)}</td></tr>`,
        `</table>`,
        `</td></tr>`,
        `<tr><td style="padding:16px;background:#f9f9f9;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</td></tr>`,
        `<tr><td style="padding:16px 0 0;color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px">Sent from your portfolio contact form</td></tr>`,
        `</table>`,
      ].join(""),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
