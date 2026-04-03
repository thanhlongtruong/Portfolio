"use client";

import PixelTransition from "@/components/PixelTransition";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactList } from "../configs/contact";
import Image from "next/image";
import BtnNavigatePage from "../components/btn-navigatepage";

export default function IntroductionPage() {
  const d = useTranslations("IntroductionPage");
  const links = [{ key: "linkedin" }, { key: "github" }, { key: "cv" }];

  return (
    <>
      <div className="flex gap-10">
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-y-3">
            <p className="uppercase font-bold lg:text-5xl md:text-3xl text-2xl">
              {d("actor")}
            </p>
            <p className="md:text-xl uppercase font-normal text-lg">
              Frontend | Fullstack-oriented | Mobile Flutter
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <p>{d("about1")}</p>
            <p>{d("about2")}</p>
          </div>

          <div className="flex flex-wrap gap-10">
            {links.map((value, i) => {
              const t = ContactList[value.key as "linkedin" | "github"];
              if (value.key === "cv") {
                return (
                  <Button
                    key={i}
                    variant="outline"
                    asChild
                    className="animate-hover-btn">
                    <Link
                      target="_blank"
                      href={d("cv.url")}
                      className="w-fit h-fit flex gap-4 items-center">
                      <Image
                        aria-hidden
                        src="/background/favicon.ico"
                        alt="actor"
                        width={22}
                        height={22}
                      />
                      {d("cv.title")}
                      <ArrowUpRight />
                    </Link>
                  </Button>
                );
              } else
                return (
                  <Button
                    key={i}
                    variant="outline"
                    asChild
                    className="animate-hover-btn">
                    <Link
                      target="_blank"
                      href={t.href}
                      className="w-fit h-fit flex gap-4 items-center">
                      <Image
                        aria-hidden
                        src={t.path}
                        alt={t.name}
                        width={22}
                        height={22}
                        className={`${value.key === "github" && "dark:invert"}`}
                      />
                      {t.name}
                      <ArrowUpRight />
                    </Link>
                  </Button>
                );
            })}
          </div>
        </div>
        <PixelTransition
          firstContent={
            <img
              src="/background/actor.png"
              alt="Actor"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            />
          }
          secondContent={
            <div className="w-full h-full px-2 py-5 flex flex-col justify-start gap-3 bg-stone-950 text-white text-sm">
              <Link
                target="_blank"
                href={d("university.link")}
                className="hover:underline hover:underline-offset-2">
                {d("university.name")}
              </Link>
              <p>{d("university.major")}</p>
              <p>{d("university.GPA")}</p>
              <p>{d("university.state")}</p>
            </div>
          }
          gridSize={10}
          pixelColor="#ffffff"
          once={false}
          animationStepDuration={0.4}
          className="custom-pixel-card"
        />
      </div>
      <BtnNavigatePage />
    </>
  );
}
