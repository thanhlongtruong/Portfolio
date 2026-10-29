"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".bar", { yPercent: 0 }, {
      yPercent: -100,
      duration: 0.4,
      ease: "power4.inOut",
      stagger: 0.05,
    });
  });

  return <>{children}</>;
}
