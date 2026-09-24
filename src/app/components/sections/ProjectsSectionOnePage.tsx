import { getTranslations } from "next-intl/server";
import React from "react";
import BtnNavigatePage from "../btn-navigatepage";
import Image from "next/image";
import TransitionLink from "../transition-link";

type Props = {
  t: Awaited<ReturnType<typeof getTranslations<"ProjectsPage">>>;
};

function ProjectsSectionOnePage({ t }: Props) {
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
      <div className="flex flex-col gap-5">
        {projectKeys &&
          projectKeys.map((value) => (
            <div key={value} className="flex gap-5">
              <div className="border rounded-md p-5 shadow">
                <p className="font-medium block text-left mb-2">
                  {t(`projectList.${value}.title`)}
                </p>
                <p className="line-clamp-3 text-left text-sm text-stone-600 dark:text-stone-500 font-normal">
                  {t(`projectList.${value}.description`)}
                </p>
                <div className="flex flex-wrap gap-5 justify-end">
                  <TransitionLink
                    href={`projects/${value}`}
                    className="rounded-md py-2 px-3 shadow animate-hover-btn text-main hover:bg-main">
                    Details
                  </TransitionLink>
                </div>
              </div>
              <Image
                alt={`${value} home`}
                src={`/projects/${value}/home.jpg`}
                width={value === "cinefruit" ? 100 : 300}
                height={value === "cinefruit" ? 50 : 100}
                className="md:flex hidden"
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default ProjectsSectionOnePage;
