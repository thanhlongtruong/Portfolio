"use client";

import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import Link from "next/link";

import { useLang } from "../contexts/languege";

function SwiperSlideComponent({
  slideType = "website",
  arrImg,
  arrTechStack,
  arrDeploy,
}: {
  slideType?: string;
  arrImg?: Array<{
    path: string;
    vi: string;
    en: string;
  }>;

  arrTechStack: Array<{ name: string; path: string }>;

  arrDeploy?: Array<{
    linkWeb: string;
    iconSrc: string;
    iconName: string;
    content: string;
  }>;
}) {
  const { lang } = useLang();

  return (
    <>
      {arrImg && arrImg.length > 0 && (
        <div>
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            slidesPerView={"auto"}
            breakpoints={
              slideType === "mobile"
                ? {
                    768: { slidesPerView: 2 },
                  }
                : {}
            }
            pagination={{ clickable: true }}
            speed={2000}
            centeredSlides
            effect={"coverflow"}
            preventClicks
            loop={true}
            grabCursor
            coverflowEffect={
              slideType === "mobile"
                ? {
                    rotate: 30,
                    stretch: 65,
                    depth: 350,
                    modifier: 1,
                    slideShadows: true,
                  }
                : {
                    rotate: 0,
                    stretch: 80,
                    depth: 350,
                    modifier: 1,
                    slideShadows: true,
                  }
            }
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}>
            {arrImg.map((i, index) => (
              <SwiperSlide key={index} className="slide-inner">
                <div
                  className={` ${
                    slideType === "mobile"
                      ? "w-[245px] h-[450px] md:w-[240px] md:h-[450px] lg:w-[280px] lg:h-[560px]"
                      : "w-full h-[200px] md:h-[430px] lg:w-5xl lg:h-[570px]"
                  } relative mx-auto`}>
                  <Image
                    src={i.path}
                    alt={lang !== "en" ? i.vi : i.en}
                    fill
                    className="rounded-md"
                  />
                  <div className="absolute bottom-0 right-0 bg-[url('/background/zwartevilt.png')] text-center w-fit px-3 md:px-7 max-w-full py-1 rounded-tl-xl">
                    <p className="multi-color-text font-semibold font-mono w-fit md:text-base text-sm">
                      {lang != "en" ? i.vi : i.en}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 w-full">
        {arrTechStack.map((t) => (
          <div
            key={t.name}
            className="flex items-center py-1 px-4 w-fit border rounded-md border-stone-600 gap-x-1">
            {t.path != "" && (
              <Image
                aria-hidden
                src={t.path}
                alt={t.name}
                width={24}
                height={24}
                className="w-6 h-6 imageReveal"
              />
            )}
            <p className="imageReveal">{t.name}</p>
          </div>
        ))}
      </div>

      {arrDeploy && arrDeploy.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {arrDeploy.map((i) => (
            <Link
              key={i.linkWeb}
              target="_blank"
              href={i.linkWeb}
              className="transition-all ease-out hover:scale-110 duration-700 flex items-center w-fit py-1 px-4 border rounded-md border-stone-600 hover:border-blue-500 gap-x-1">
              <Image
                aria-hidden
                src={i.iconSrc}
                alt={i.iconName}
                width={24}
                height={24}
                className="w-6 h-6 imageReveal"
              />
              <p className="multi-color-text font-semibold font-mono w-fit imageReveal">
                {i.content}
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default memo(SwiperSlideComponent);
