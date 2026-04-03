"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import LoadImages from "@/app/components/load-images";
import Image from "next/image";
import { getImages, projectImagesType } from "@/app/configs/images/projects";
import { projectList } from "@/app/configs/projects";
import BackButton from "@/app/components/back-button";

type Params = {
  params: Promise<{
    locale: string;
    project: string;
  }>;
};

function GalleryPage({ params }: Params) {
  const { project } = React.use(params);

  const [loadImages, setLoadImages] = React.useState(true);

  const d = useTranslations(`ProjectsPage.projectList.${project}`);

  const projectImages: projectImagesType = {
    name: project as projectList,
    typeShow: "gallery",
  };

  return (
    <>
      <BackButton path={`/projects/${project}`} back={d("title")} />

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
                  src={`/projects/${project}${value}`}
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
              <p className="">{d(`images.${key}`)}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default GalleryPage;
