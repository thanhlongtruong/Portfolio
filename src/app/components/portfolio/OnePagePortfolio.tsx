"use client";

import React, { useRef } from "react";
import SkillsToolsSection from "../sections/SkillsToolsSection";
import ContactSection from "../sections/ContactSection";
import IntroductionSection from "../sections/IntroductionSection";
import { useTranslations } from "next-intl";

import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useActiveSidebarStore } from "@/app/store/active-sidebar-store";
import ProjectsSectionOnePage from "../sections/ProjectsSectionOnePage";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

type Props = {
  mode: ModeScroll;
};

export default function OnePagePortfolio({ mode }: Props) {
  const introductionPinRef = useRef<HTMLDivElement>(null);
  const projectsPinRef = useRef<HTMLDivElement>(null);
  const skillsToolsPinRef = useRef<HTMLDivElement>(null);
  const contactPinRef = useRef<HTMLDivElement>(null);

  const dProjectsPage = useTranslations("ProjectsPage");
  const dSkillsTools = useTranslations("Skills&Tools");

  const updateActive = useActiveSidebarStore((state) => state.updateActive);
  const setScrollToSection = useActiveSidebarStore(
    (state) => state.setScrollToSection
  );

  useGSAP(
    () => {
      const sections = [
        { id: "introduction", pin: introductionPinRef.current },
        { id: "projects", pin: projectsPinRef.current },
        { id: "skillstools", pin: skillsToolsPinRef.current },
        { id: "contact", pin: contactPinRef.current },
      ];

      const triggers = sections.flatMap(({ id, pin }) => {
        if (!pin) return [];

        const content = pin.firstElementChild;

        if (!(content instanceof HTMLElement)) return [];

        gsap.set(content, {
          transformOrigin: "center center",
          willChange: "transform, filter",
        });

        const animation = gsap.to(content, {
          filter: id === "contact" ? "blur(0px)" : "blur(3px)",
          scale: 0.9,
          duration: 1,
          paused: true,
        });

        const animationTrigger = ScrollTrigger.create({
          trigger: pin,
          start: id === "contact" ? "bottom 90%" : "bottom 70%",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
          animation: animation,
        });

        const activeTrigger = ScrollTrigger.create({
          trigger: pin,
          start: "top 35%",
          end: "bottom 70%",
          onEnter: () => updateActive(id),
          onEnterBack: () => updateActive(id),
        });

        return [animationTrigger, activeTrigger];
      });

      const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: element, offsetY: 75 },
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      setScrollToSection(scrollToSection);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      const handleHashChange = () => {
        const hash = window.location.hash.slice(1);
        if (!hash) return;

        ScrollTrigger.refresh();
        requestAnimationFrame(() => scrollToSection(hash));
      };

      window.addEventListener("hashchange", handleHashChange);

      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleLoad);

      const initialHash = window.location.hash.slice(1);
      if (initialHash) {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          scrollToSection(initialHash);
        });
      }

      return () => {
        window.removeEventListener("hashchange", handleHashChange);
        window.removeEventListener("load", handleLoad);

        setScrollToSection(null);

        triggers.forEach((trigger) => trigger.kill());
      };
    },
    {
      dependencies: [mode],
      revertOnUpdate: true,
    }
  );

  return (
    <div className="flex flex-col gap-y-10">
      <div ref={introductionPinRef} id="introduction" className="h-fit">
        <IntroductionSection mode={mode} />
      </div>

      <div ref={projectsPinRef} id="projects">
        <ProjectsSectionOnePage t={dProjectsPage} />
      </div>

      <div ref={skillsToolsPinRef} id="skillstools">
        <SkillsToolsSection t={dSkillsTools} mode={mode} />
      </div>

      <div ref={contactPinRef} id="contact" className="min-h-dvh">
        <ContactSection mode={mode} />
      </div>
    </div>
  );
}
