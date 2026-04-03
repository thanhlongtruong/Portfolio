import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { transporter } from "@/app/service/transporter";
import { ratelimit } from "@/app/service/rate-limit";
import { formSchema } from "@/app/libs/validations/form-contact-schema";
import { getTranslations } from "next-intl/server";

export async function POST(req: Request) {
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
    await transporter.verify();
    console.log("Server is ready to take our messages");

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: data.data.email,
      subject: data.data.topic,
      text: data.data.message,
      html: `
      <p><b>Email:</b> ${data.data.email}</p>
        <p><b>Topic:</b> ${data.data.topic}</p>
        <p><b>Message:</b> ${data.data.message}</p>
      `,
    });

    if (info.rejected.length > 0) {
      console.warn("Some recipients were rejected:", info.rejected);
      return NextResponse.json(
        { msg: t("responsesAPI.sendFailed") },
        { status: 400 }
      );
    }

    return NextResponse.json({ msg: t("responsesAPI.200") }, { status: 200 });
  } catch (e) {
    console.error("ERROR: ", e);

    return NextResponse.json({ msg: t("responsesAPI.500") }, { status: 500 });
  }
}
