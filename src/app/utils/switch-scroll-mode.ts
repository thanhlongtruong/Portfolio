import { setScrollModeCookie } from "@/app/scroll-mode";
import gsap from "gsap";

type SwitchScrollModeParams = {
  mode: ModeScroll;
  pathname: string;
  router: {
    push: (href: string) => void;
    refresh: () => void;
  };
};

const ONE_PAGE_SECTIONS = new Set(["projects", "skillstools", "contact"]);

export async function switchScrollMode({
  mode,
  pathname,
  router,
}: SwitchScrollModeParams) {
  await setScrollModeCookie(mode);

  const segments = pathname.split("/").filter(Boolean);

  const route = segments[0];

  if (mode === "one-page") {
    if (route === "projects" && segments.length >= 2) {
      router.refresh();
      return;
    }

    if (ONE_PAGE_SECTIONS.has(route) && segments.length === 1) {
      router.push(`/#${route}`);
      return;
    }

    router.refresh();
    return;
  }
  if (mode === "multi-page") {
    const hash = window.location.hash.slice(1);

    if (ONE_PAGE_SECTIONS.has(hash)) {
      router.push(`/${hash}`);
      return;
    }

    router.refresh();
    return;
  }
}
