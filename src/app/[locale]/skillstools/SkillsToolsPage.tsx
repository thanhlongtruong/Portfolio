"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { SkillsToolsList } from "@/app/configs/skillstools";
import { useTranslations } from "next-intl";
import BtnNavigatePage from "@/app/components/btn-navigatepage";

export default function SkillsToolsPage() {
  const d = useTranslations("Skills&Tools");

  const topic = [
    { topic: "Frontend Web", key: "fe-web" },
    { topic: "Frontend App", key: "fe-app" },
    { topic: "Backend", key: "be" },
    { topic: "Database", key: "db" },
    { topic: "Tools", key: "tools" },
    { topic: "Others", key: "others" },
  ];
  return (
    <>
      <div className="flex flex-col gap-y-3">
        <h1 itemProp="skillstools" className="topic">
          SKILLS & TOOLS
        </h1>
        <h3 className="">{d("description")}</h3>
      </div>
      {topic.map((value, i) => (
        <div key={i} className="flex flex-col gap-2">
          <p className="title">{value.topic}</p>
          <div className="flex flex-wrap gap-5">
            {SkillsToolsList[
              value.key as
                | "fe-web"
                | "fe-app"
                | "be"
                | "db"
                | "tools"
                | "others"
            ].map((val, i2) => {
              if (
                val.name === "GitHub" ||
                val.name === "Shadcn UI" ||
                val.name === "ExpressJS"
              ) {
                return (
                  <Button variant="outline" key={i2}>
                    <Image
                      src={val.path}
                      alt={val.name}
                      width={22}
                      height={22}
                      className="text-inherit dark:invert"
                    />
                    {val.name}
                  </Button>
                );
              } else
                return (
                  <Button variant="outline" key={i2}>
                    <Image
                      src={val.path}
                      alt={val.name}
                      width={22}
                      height={22}
                      className="text-inherit"
                    />
                    {val.name}
                  </Button>
                );
            })}
          </div>
        </div>
      ))}
      <BtnNavigatePage />
    </>
  );
}
