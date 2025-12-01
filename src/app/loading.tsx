"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

function Loading() {
  const counterRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let currentValue = 0;

    function updateCounter() {
      if (currentValue === 100) return;

      currentValue += Math.floor(Math.random() * 10) + 1;

      if (currentValue > 100) {
        currentValue = 100;
      }

      if (counterRef.current) {
        counterRef.current.innerText = currentValue + "%";
      }

      const delay = Math.floor(Math.random() * 200) + 50;
      setTimeout(updateCounter, delay);
    }
    updateCounter();

    gsap.to(".counter", 0.25, {
      delay: 3.5,
      opacity: 0,
    });

    gsap.to(".bar", 1.5, {
      delay: 3.5,
      height: 0,
      stagger: {
        amount: 0.5,
      },
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(".counter", { display: "none" });
        gsap.set(".bar", { display: "none" });
        gsap.set(".overlay", { display: "none" });
      },
    });
  }, []);

  return (
    <>
      <h1 ref={counterRef} className="counter">
        0
      </h1>

      <div ref={overlayRef} className="overlay">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </>
  );
}

export default Loading;
