"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";

function Cursor() {
  useEffect(() => {
    const handMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to("#cursor", {
        x: clientX - 20 / 2,
        y: clientY - 20 / 2,
        duration: 1,
        delay: 0,
        ease: "power4.out",
      });
    };

    window.addEventListener("mousemove", handMouseMove);

    return () => {
      window.removeEventListener("mousemove", handMouseMove);
    };
  }, []);
  return (
    <div
      id="cursor"
      className="hidden lg:block fixed z-50 top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference"></div>
  );
}

export default Cursor;
