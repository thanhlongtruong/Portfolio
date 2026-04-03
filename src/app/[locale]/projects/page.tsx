"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import TransitionLink from "@/app/components/transition-link";
import BtnNavigatePage from "@/app/components/btn-navigatepage";

export default function ProjectsPage() {
  const d = useTranslations("ProjectsPage");

  const projectList = d.raw("projectList");

  const projectKey = Object.keys(projectList);

  return (
    <>
      <div className="flex flex-col gap-y-3">
        <h1 className="topic">{d("title")}</h1>
        <h3 className="">{d("description")}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projectKey &&
          projectKey.map((value, i) => (
            <HoverCard key={i} openDelay={10} closeDelay={100}>
              <HoverCardTrigger asChild>
                <TransitionLink
                  href={`projects/${value}`}
                  className="border rounded-md p-5 shadow animate-hover-btn">
                  <p className="font-medium block text-left mb-2">
                    {d(`projectList.${value}.title`)}
                  </p>
                  <p className="line-clamp-3 text-left text-sm text-stone-600 dark:text-stone-500 font-normal">
                    {d(`projectList.${value}.description`)}
                  </p>
                </TransitionLink>
              </HoverCardTrigger>
              <HoverCardContent className="flex w-64 flex-col gap-0.5">
                <Image
                  alt={`${value} home`}
                  src={`/projects/${value}/home.jpg`}
                  width={500}
                  height={500}
                  sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 100vw"
                  priority
                  className="font-semibold"
                />
              </HoverCardContent>
            </HoverCard>
          ))}
      </div>
      <BtnNavigatePage />
    </>
  );
}
