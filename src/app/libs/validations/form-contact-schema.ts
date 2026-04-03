import { _Translator } from "next-intl";
import * as z from "zod";

export const formSchema = (
  d: _Translator<Record<string, any>, "ContactPage">
) =>
  z.object({
    email: z.email(d("form.email.invalid")).min(5, d("form.email.min")).max(100, d("form.email.max")),
    topic: z
      .string()
      .min(10, d("form.topic.min"))
      .max(200, d("form.topic.max")),
    message: z
      .string()
      .min(100, d("form.message.min"))
      .max(1000, d("form.message.max")),
  });
