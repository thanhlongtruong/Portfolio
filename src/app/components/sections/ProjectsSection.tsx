import { getTranslations } from "next-intl/server";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import TransitionLink from "@/app/components/transition-link";
import BtnNavigatePage from "@/app/components/btn-navigatepage";

type Props = {
  t: Awaited<ReturnType<typeof getTranslations<"ProjectsPage">>>;
};

export default function ProjectsSection({ t }: Props) {
  const projectList = t.raw("projectList") as Record<
    string,
    { title: string; description: string }
  >;

  const projectKeys = Object.keys(projectList);

  return (
    <section className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-3">
        <h1 itemProp="projects" className="topic">
          {t("title")}
        </h1>
        <h3 className="">{t("description")}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projectKeys &&
          projectKeys.map((value) => (
            <HoverCard key={value} openDelay={10} closeDelay={100}>
              <HoverCardTrigger asChild>
                <TransitionLink
                  href={`projects/${value}`}
                  className="border rounded-md p-5 shadow animate-hover-btn">
                  <p className="font-medium block text-left mb-2">
                    {t(`projectList.${value}.title`)}
                  </p>
                  <p className="line-clamp-3 text-left text-sm text-stone-600 dark:text-stone-500 font-normal">
                    {t(`projectList.${value}.description`)}
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
    </section>
  );
}
