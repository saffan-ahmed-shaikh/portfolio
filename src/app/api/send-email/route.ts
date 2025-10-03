import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  fullname: string;
  email: string;
  message: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function validatePayload(body: unknown): body is ContactPayload {
  if (!isRecord(body)) return false;
  const { fullname, email, message } = body as Record<string, unknown>;
  if (!isString(fullname) || !isString(email) || !isString(message))
    return false;
  if (fullname.trim().length === 0) return false;
  if (email.trim().length === 0) return false;
  if (message.trim().length < 10) return false;
  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!validatePayload(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Read SMTP credentials from environment variables
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT
      ? parseInt(process.env.SMTP_PORT, 10)
      : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.EMAIL_TO;

    if (!host || !port || !user || !pass || !toEmail) {
      return NextResponse.json(
        { error: "SMTP not configured" },
        { status: 500 }
      );
    }
    console.log("SMTP Config:", { host, port, user, pass, toEmail });
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: { user, pass },
    });

    const mailText = `New contact message from ${body.fullname} <${body.email}>:\n\n${body.message}`;

    await transporter.sendMail({
      from: `${body.fullname} <${body.email}>`,
      to: toEmail,
      subject: `New contact from ${body.fullname}`,
      text: mailText,
      html: `<p>New contact message from <strong>${body.fullname}</strong> &lt;${body.email}&gt;:</p><p>${body.message}
</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-email error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
