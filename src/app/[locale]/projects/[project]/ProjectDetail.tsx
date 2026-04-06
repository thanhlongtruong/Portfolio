"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import * as React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import { useIsMounted } from "@/app/hooks/useIsMounted";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ExternalLink } from "lucide-react";
import { getImages, projectImagesType } from "@/app/configs/images/projects";
import BackButton from "@/app/components/back-button";
import LoadImages from "@/app/components/load-images";
import { projectList } from "@/app/configs/projects";
import TransitionLink from "@/app/components/transition-link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectDetail({ project }: { project: string }) {
  const boxInfoRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();

  const router = useRouter();
  const pathname = usePathname();

  const dProject = useTranslations(`ProjectsPage.projectList.${project}`);
  const dProjectList = useTranslations("ProjectsPage.projectList");
  const d = useTranslations();

  const techStack = dProject.raw("stack.list");
  const features = dProject.raw("features.list");
  const challenges = dProject.raw("challenges.list");
  const learnings = dProject.raw("learnings.list");
  const links = dProject.raw("links");
  const keyLinks = Object.keys(links);

  useGSAP(
    () => {
      if (!isMounted) return;
      const el = boxInfoRef.current;
      if (!el) return;

      gsap.to(el, {
        filter: "blur(3px)",
        autoAlpha: 0,
        scale: 0.9,
        // position: 'sticky',
        scrollTrigger: {
          trigger: el,
          start: "bottom bottom-=100",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: 0.5,
          pinType: "transform",
          anticipatePin: 1,
        },
      });
    },
    { dependencies: [isMounted] }
  );

  const arrProjects = [
    "internship_management",
    "cinefruit",
    "travfruit",
    "writing",
    "grapfood",
  ];
  const projectImages: projectImagesType = {
    name: project as projectList,
    typeShow: "preview",
  };

  const getNextProject = () => {
    const currentIndex = arrProjects.indexOf(project);
    const nextIndex = (currentIndex + 1) % arrProjects.length;

    return dProjectList(`${arrProjects[nextIndex]}.title`);
  };

  const handleNextProject = () => {
    const currentIndex = arrProjects.indexOf(project);
    const nextIndex = (currentIndex + 1) % arrProjects.length;
    router.push(`/projects/${arrProjects[nextIndex]}`);
  };

  const [loadImages, setLoadImages] = useState(true);

  return (
    <div className="w-full min-h-screen flex flex-col gap-y-10">
      <BackButton path="/projects" back={d("BackProjects")} />

      <div ref={boxInfoRef} className="flex flex-col gap-10">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-1">
            <h1 itemProp="project_detail" className="topic">
              {dProject("title")}
            </h1>
            <p className="block text-right text-xs text-stone-600 dark:text-stone-400">
              {dProject("time")}
            </p>
          </div>

          <h3>{dProject("description")}</h3>
        </div>

        <p>
          {dProject("size")} - {dProject("position")}
        </p>

        <div className="flex flex-col gap-2">
          <p className="title">{dProject("stack.title")}</p>
          <div className="flex flex-wrap gap-5">
            {techStack &&
              techStack.map((value: string, i: number) => (
                <Button variant="outline" key={i}>
                  {value}
                </Button>
              ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div className="flex flex-col gap-2">
            <p className="title">{dProject("features.title")}</p>
            <ul className="list-disc list-inside">
              {features &&
                features.map((value: string, i: number) => (
                  <li key={i}>{value}</li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <p className="title">{dProject("challenges.title")}</p>
            <ul className="list-disc list-inside">
              {challenges &&
                challenges.map((value: string, i: number) => (
                  <li key={i}>{value}</li>
                ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div className="flex flex-col gap-2">
            <p className="title">{dProject("learnings.title")}</p>
            <ul className="list-disc list-inside">
              {learnings &&
                learnings.map((value: string, i: number) => (
                  <li key={i}>{value}</li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <p className="title">Links</p>
            <div className="flex flex-wrap gap-5">
              {keyLinks &&
                keyLinks.map((value: string, i: number) => {
                  if (value === "github") {
                    return (
                      <Button
                        asChild
                        variant="outline"
                        key={i}
                        className="animate-hover-btn">
                        <Link target="_blank" href={dProject("links.github")}>
                          <Image
                            src="/icons-software/github.svg"
                            alt="GitHub"
                            width={24}
                            height={24}
                            className="dark:invert"
                          />
                          Github
                          <ExternalLink />
                        </Link>
                      </Button>
                    );
                  }
                  if (value === "githubPage") {
                    return (
                      <Button
                        asChild
                        variant="outline"
                        key={i}
                        className="animate-hover-btn">
                        <Link
                          target="_blank"
                          href={dProject("links.githubPage")}>
                          <Image
                            src="/icons-software/github.svg"
                            alt="GitHub Pages"
                            width={24}
                            height={24}
                            className="dark:invert"
                          />
                          Frontend Site
                          <ExternalLink />
                        </Link>
                      </Button>
                    );
                  }
                  if (value === "vercel") {
                    return (
                      <Button
                        asChild
                        variant="outline"
                        key={i}
                        className="animate-hover-btn">
                        <Link target="_blank" href={dProject("links.vercel")}>
                          <Image
                            src="/icons-hosting/vercel.svg"
                            alt="Vercel"
                            width={24}
                            height={24}
                            className="dark:invert"
                          />
                          Client Site
                          <ExternalLink />
                        </Link>
                      </Button>
                    );
                  }
                  if (value === "vercelA") {
                    return (
                      <Button
                        asChild
                        variant="outline"
                        key={i}
                        className="animate-hover-btn">
                        <Link target="_blank" href={dProject("links.vercelA")}>
                          <Image
                            src="/icons-hosting/vercel.svg"
                            alt="Vercel"
                            width={24}
                            height={24}
                            className="dark:invert"
                          />
                          Admin Site <ExternalLink />
                        </Link>
                      </Button>
                    );
                  }
                  if (value === "youtube") {
                    return (
                      <Button
                        asChild
                        variant="outline"
                        key={i}
                        className="animate-hover-btn">
                        <Link target="_blank" href={dProject("links.youtube")}>
                          <Image
                            src="/icons-social/youtube.svg"
                            alt="YouTube"
                            width={24}
                            height={24}
                            className="text-inherit"
                          />
                          Preview <ExternalLink />
                        </Link>
                      </Button>
                    );
                  }
                  if (value === "figma") {
                    return (
                      <Button
                        asChild
                        variant="outline"
                        key={i}
                        className="animate-hover-btn">
                        <Link target="_blank" href={dProject("links.figma")}>
                          <Image
                            src="/icons-design/figma.svg"
                            alt="Figma"
                            width={20}
                            height={20}
                            className="text-inherit"
                          />
                          Design <ExternalLink />
                        </Link>
                      </Button>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full h-fit gap-5 ${
          project === "cinefruit"
            ? "columns-2 md:columns-3 lg:columns-4"
            : "columns-1 md:columns-2"
        }`}>
        {getImages(projectImages) &&
          getImages(projectImages).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col gap-y-1 mb-5 break-inside-avoid">
              <div className="relative">
                {loadImages && <LoadImages />}
                <Image
                  src={`${pathname}${value}`}
                  alt={key}
                  onLoad={() => setLoadImages(false)}
                  loading="lazy"
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "auto" }}
                  className={`rounded-md transition-opacity duration-300 ${
                    loadImages ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
              <p className="">{dProject(`images.${key}`)}</p>
            </div>
          ))}
      </div>

      <Button variant="default" asChild className="w-full">
        <TransitionLink href={`${pathname}/gallery`}>
          {d("more")}
        </TransitionLink>
      </Button>

      <div className="md:flex justify-between hidden gap-10">
        <BackButton path="/projects" back={d("BackProjects")} />
        <button
          type="button"
          className="line-clamp-1 cursor-pointer h-fit flex items-center gap-1 transition duration-500 ease-out hover:underline hover:decoration-2 hover:underline-offset-2 hover:decoration-main"
          onClick={handleNextProject}>
          {d("NextProject")} {getNextProject()}
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
