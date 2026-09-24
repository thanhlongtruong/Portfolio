"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "scroll-mode";

export async function setScrollModeCookie(value: ModeScroll) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

export async function getScrollModeCookie(): Promise<ModeScroll> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value as ModeScroll;

  if (value === "one-page" || value === "multi-page") {
    return value;
  }

  return "one-page";
}
