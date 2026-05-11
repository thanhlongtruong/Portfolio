import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/app/service/transporter";
import { ratelimit } from "@/app/service/rate-limit";
import { formSchema } from "@/app/libs/validations/form-contact-schema";
import { getTranslations } from "next-intl/server";
import { Redis } from "@upstash/redis";

const abortedResponse = () =>
  new NextResponse(null, {
    status: 499,
    statusText: "Client Closed Request",
  });

export async function POST(req: NextRequest) {
  const signal = req.signal;

  if (signal.aborted) {
    return abortedResponse();
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json({ msg: t("responsesAPI.429") }, { status: 429 });
    }

    const schema = formSchema(t);

    const body = await req.json();

    const data = schema.safeParse(body);

    if (data.error) {
      return NextResponse.json(
        { msg: data.error.issues[0].message },
        { status: 400 }
      );
    }

    if (signal.aborted) {
      return abortedResponse();
    }

    const redis = Redis.fromEnv();

    const { email, topic, message } = data.data;

    const key = `email:${email}:${topic}:${message}`;

    const hash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(key)
    );

    const idempotencyKey = Buffer.from(hash).toString("hex");

    const lock = await redis.set(
      idempotencyKey,
      JSON.stringify({ msg: "processing" }),
      {
        nx: true,
        ex: 300, // TTL 300s
      }
    );

    if (!lock) {
      const existing = (await redis.get(idempotencyKey)) as {
        msg: string;
      };

      if (existing.msg === "processing") {
        return NextResponse.json(
          { msg: "Request is processing" },
          { status: 202 }
        );
      }

      return NextResponse.json(existing, { status: 200 });
    }

    if (signal.aborted) {
      return abortedResponse();
    }

    await transporter.verify();

    if (signal.aborted) abortedResponse();

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: topic,
      text: message,
      html: `
      <p><b>Email:</b> ${email}</p>
        <p><b>Topic:</b> ${topic}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    if (info.rejected.length > 0) {
      console.warn("Some recipients were rejected:", info.rejected);
      return NextResponse.json(
        { msg: t("responsesAPI.sendFailed") },
        { status: 400 }
      );
    }

    await redis.set(
      idempotencyKey,
      JSON.stringify({ msg: t("responsesAPI.200") }),
      {
        ex: 300,
      }
    );

    if (signal.aborted) {
      console.warn("Email sent but client already disconnected");
    }

    return NextResponse.json({ msg: t("responsesAPI.200") }, { status: 200 });
  } catch (e) {
    console.error("ERROR: ", e);

    return NextResponse.json({ msg: t("responsesAPI.500") }, { status: 500 });
  }
}
