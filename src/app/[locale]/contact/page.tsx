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
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import BtnNavigatePage from "@/app/components/btn-navigatepage";

export default function ContactPage() {
  const d = useTranslations("ContactPage");
  const dPending = useTranslations();

  const [isPending, setPending] = useState(false);

  const topic = [{ key: "email" }, { key: "linkedin" }];

  const form = useForm({
    defaultValues: {
      email: "",
      topic: "",
      message: "",
    },
    validators: {
      onSubmit: formSchema(d),
    },
    onSubmit: async ({ value }) => {
      if (isPending) return;

      setPending(true);

      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const result = await res.json();

      setPending(false);
      form.reset();

      if (!res.ok) {
        return toast.warning(result?.msg || d("responsesAPI.500"));
      }

      return toast.success(result?.msg || d("responsesAPI.200"));
    },
  });

  return (
    <>
      <h1 className="topic">{d("title")}</h1>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-y-10">
          {topic.map((value, i) => {
            const t = ContactList[value.key as "email" | "linkedin"];
            return (
              <div key={i} className="flex flex-col gap-2">
                <p className="title">{t.name}</p>
                <div className="flex flex-wrap gap-5">
                  <Link
                    target="_blank"
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

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{d("contact.title")}</CardTitle>
            <CardDescription></CardDescription>
            <CardAction>
              <Field orientation="horizontal">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}>
                  {d("contact.btnReset")}
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
                          {d("contact.email")}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder={d("contact.placeholderEmail")}
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
                          {d("contact.topic")}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder={d("contact.placeholderTopic")}
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
                          {d("contact.message")}
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder={d("contact.placeholderMessage")}
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
                <Button variant="secondary" disabled>
                  <Spinner data-icon="inline-start" />
                  {dPending("Pending")}
                </Button>
              )}

              {!isPending && (
                <Button type="submit" form="bug-report-form">
                  {d("contact.btnSubmit")}
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
