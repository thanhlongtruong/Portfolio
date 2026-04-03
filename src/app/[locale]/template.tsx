"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".bar", {
      yPercent: -100,
      duration: 0.6,
      ease: "power4.inOut",
      stagger: 0.05,
    });
  });

  return <>{children}</>;
}
