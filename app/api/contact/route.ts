import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, category, message } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Please enter your email address." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    const validCategories = ["School Inquiry", "Unlock Full Access", "Sponsorship"];
    const cleanCategory = validCategories.includes(category)
      ? category
      : "General Inquiry";

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured in .env.local");
      return NextResponse.json(
        { error: "Email service is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;
    if (!recipientEmail) {
      console.error("CONTACT_RECIPIENT_EMAIL is not configured in environment variables");
      return NextResponse.json(
        { error: "Email service is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const subjectMap: Record<string, string> = {
      "School Inquiry": "School Inquiry — Learned Hub Explore",
      "Unlock Full Access": "Unlock Full Access Request",
      "Sponsorship": "Sponsorship Inquiry",
    };

    const subject = subjectMap[cleanCategory] || cleanCategory;

    const { data, error } = await resend.emails.send({
      from: "LearnedHub <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email.trim(),
      subject: subject,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #1a1a1a;">
          <h2 style="color: #15573e; margin-bottom: 16px;">New ${cleanCategory}</h2>
          <p><strong>From:</strong> ${escapeHtml(name.trim())} &lt;${escapeHtml(email.trim())}&gt;</p>
          <p><strong>Category:</strong> ${escapeHtml(cleanCategory)}</p>
          <div style="margin-top: 16px;">
            <strong>Message:</strong>
            <div style="background-color: #f8f7f4; border: 1px solid #e5e1db; border-radius: 8px; padding: 16px; margin-top: 8px; white-space: pre-wrap;">${escapeHtml(message.trim())}</div>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e1db; margin-top: 24px; margin-bottom: 12px;" />
          <p style="font-size: 12px; color: #626262;">Sent from LearnedHub Explore landing page.</p>
        </div>
      `,
      text: `New ${cleanCategory}\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nCategory: ${cleanCategory}\n\nMessage:\n${message.trim()}\n\n---\nSent from LearnedHub Explore landing page.`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email. Please try again." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    console.error("Unexpected error in /api/contact:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
