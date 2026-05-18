"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { toast } from "sonner";

import { useForm } from "@tanstack/react-form";
import { ContactList } from "@/app/configs/contact";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { formSchema } from "@/app/libs/validations/form-contact-schema";
import { useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import BtnNavigatePage from "@/app/components/btn-navigatepage";
import { Copy } from "lucide-react";

type FormValues = {
  email: string;
  topic: string;
  message: string;
};

const STORAGE_KEY = "email-form";

export default function ContactPage() {
  const dContactPage = useTranslations("ContactPage");
  const d = useTranslations();

  const [isPending, setPending] = useState(false);

  const topic = [{ key: "email" }, { key: "linkedin" }];

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const defaultValues = useMemo<FormValues>(() => {
    if (typeof window === "undefined") {
      return {
        email: "",
        topic: "",
        message: "",
      };
    }

    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        email: "",
        topic: "",
        message: "",
      };
    }

    try {
      return JSON.parse(saved);
    } catch {
      return {
        email: "",
        topic: "",
        message: "",
      };
    }
  }, []);

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: formSchema(dContactPage),
    },
    onSubmit: async ({ value }) => {
      if (isPending) return;

      setPending(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const controller = new AbortController();
      abortRef.current = controller;

      let timeLeft = 5000;
      const start = Date.now();

      timeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch("/api/send-message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
            signal: controller.signal,
          });

          toast.dismiss(toastId);

          const result = await res.json();

          form.reset({
            email: "",
            message: "",
            topic: "",
          });

          sessionStorage.removeItem(STORAGE_KEY);

          if (!res.ok) {
            return toast.warning(
              result?.msg || dContactPage("responsesAPI.500")
            );
          }

          return toast.success(result?.msg || dContactPage("responsesAPI.200"));
        } catch (e) {
          if (controller.signal.aborted)
            return toast.warning(dContactPage("abort"));
        } finally {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (!controller.signal.aborted) setPending(false);
        }
      }, timeLeft);

      const toastId = toast(`${dContactPage("btn.expire")} 5s`, {
        action: {
          label: "Undo",

          onClick: () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            if (intervalRef.current) clearInterval(intervalRef.current);

            controller.abort();
            setPending(false);
            toast.error(dContactPage("btn.cancel"));
          },
        },
        duration: timeLeft,
        dismissible: false,
      });

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, timeLeft - elapsed);

        const seconds = Math.ceil(remaining / 1000);

        toast(`${dContactPage("btn.expire")} ${seconds}s`, {
          id: toastId,
          duration: timeLeft,
        });

        if (remaining <= 0) {
          toast.dismiss(toastId);
          clearInterval(intervalRef.current!);
        }
      }, 100);
    },
  });

  useEffect(() => {
    form.store.subscribe(() => {
      const values = form.store.state.values;

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });
  }, [form.state.values]);

  const writeTextInClipboard = (text: string) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success(d("clipboard.200"));
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          toast.warning(d("clipboard.404"));
        });
    } else {
      console.error("Clipboard API is not supported!");
      toast.error(d("clipboard.500"));
    }
  };

  return (
    <>
      <h1 itemProp="contact" className="topic">
        {dContactPage("title")}
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-y-10">
          {topic.map((value, i) => {
            const t = ContactList[value.key as "email" | "linkedin"];
            return (
              <div key={i} className="flex flex-col gap-2">
                {t.name === "Email" ? (
                  <div className="flex items-center gap-5">
                    <p className="title">{t.name}</p>{" "}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        writeTextInClipboard(t.href.split(":")[1])
                      }>
                      <Copy />
                    </Button>
                  </div>
                ) : (
                  <p className="title">{t.name}</p>
                )}
                <div className="flex flex-wrap gap-5">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={t.href}
                    className="w-fit h-fit flex gap-4 items-center animate-underline">
                    <Image
                      aria-hidden
                      src={t.path!}
                      alt={t.name}
                      width={25}
                      height={25}
                    />
                    <p className="break-all">{t.href}</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <Card className="w-full md:max-w-sm">
          <CardHeader>
            <CardTitle>{dContactPage("contact.title")}</CardTitle>
            <CardDescription></CardDescription>
            <CardAction>
              <Field orientation="horizontal">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset({
                      email: "",
                      message: "",
                      topic: "",
                    });

                    sessionStorage.removeItem(STORAGE_KEY);
                  }}>
                  {dContactPage("contact.btnReset")}
                </Button>
              </Field>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form
              id="bug-report-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}>
              <FieldGroup>
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          {dContactPage("contact.email")}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder={dContactPage("contact.placeholderEmail")}
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="topic"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          {dContactPage("contact.topic")}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder={dContactPage("contact.placeholderTopic")}
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="message"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          {dContactPage("contact.message")}
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder={dContactPage(
                              "contact.placeholderMessage"
                            )}
                            rows={6}
                            className="min-h-24 resize-none"
                            aria-invalid={isInvalid}
                          />
                          <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums">
                              {field.state.value.length}/1000
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Field>
              {isPending && (
                <Button disabled variant="secondary">
                  <Spinner data-icon="inline-start" />
                  {d("Pending")}
                </Button>
              )}

              {!isPending && (
                <Button type="submit" form="bug-report-form">
                  {dContactPage("contact.btnSubmit")}
                </Button>
              )}
            </Field>
          </CardFooter>
        </Card>
      </div>

      <BtnNavigatePage />
    </>
  );
}
