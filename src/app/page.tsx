"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Cursor from "./components/cursor";
import AnimationBg from "./components/animation-bg";
import Link from "next/link";
import { useLang } from "./contexts/languege";
import { TypeAnimation } from "react-type-animation";
import { Link as React_Scrool, Element } from "react-scroll";
import { ListX, Menu, Phone } from "lucide-react";
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
import {
  PATH_ICONS_DESIGN,
  PATH_ICONS_HOSTING,
  PATH_ICONS_SOFTWARE,
  PathIconDatabase,
  PathIconDesign,
  PathIconFramework,
  PathIconHosting,
  PathIconLanguage,
  PathIconLibrary,
  PathIconSoftware,
} from "./configs/path_icons_skill";
import {
  TravFruit,
  TravFruitAdmin,
  TravfruitAdminTechnologies,
  TravfruitBackendTechnologies,
  TravfruitTechnologies,
} from "./configs/lang_image_travfruit";
import { Grapfood, GrapfoodTechnologies } from "./configs/lang_image_grapfood";
import {
  Cinefruit,
  CinefruitTechnologies,
} from "./configs/lang_image_cinefruit";
import { useEffect, useRef, useState, Suspense, lazy } from "react";

const Countdown = dynamic(() => import("react-countdown"), { ssr: false });
import moment from "moment";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Paragraph from "./components/character";

import { getFile } from "./api-client/save-file";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import Lenis from "lenis";

const LazyUploadFile = lazy(() => import("./components/upload-file"));

export default function Home() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const { text, lang, setLang } = useLang();

  const [isDropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const [isUIUploadFile, setUIUploadFile] = useState(false);

  const bufferRef = useRef("");

  const handleTurnOffDropdown = () => setDropdownMenu(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const secret = process.env.SECRET_KEYBOARD!;
      bufferRef.current += e.key.toLowerCase();

      if (bufferRef.current.length > secret.length) {
        bufferRef.current = bufferRef.current.slice(-secret.length);
      }
      if (bufferRef.current === secret) {
        setUIUploadFile(true);
        bufferRef.current = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { status, data, error } = useQuery({
    queryKey: ["cv"],
    queryFn: getFile,
    refetchOnWindowFocus: false,
    retryDelay: 1000,
  });

  return (
    <>
      <Cursor />
      <AnimationBg />
      <Loading />
      <div
        className={`${
          isUIUploadFile && "h-screen overflow-hidden"
        } relative items-center min-h-screen w-full flex flex-col text-white max-w-[85.375rem] mx-auto`}>
        <nav className="w-[90%] border-2 border-zinc-800 rounded-lg flex justify-between items-center backdrop-blur-[2px] bg-zinc-900/40 h-13 px-5 sticky top-3 z-50">
          <Link href="/" className="uppercase text-lg">
            Fruit.
          </Link>
          <div className=" gap-1 duration-1000 transition-all hidden md:flex">
            {Object.values(text.navbar).map((i) => (
              <React_Scrool
                to={i.href}
                smooth={true}
                duration={2000}
                key={i.label}
                offset={-100}
                className=" hover:bg-zinc-900 hover:outline-2 hover:outline-stone-300 hover:cursor-pointer px-4 duration-1000 transition-colors py-1 rounded-md hover:text-white text-stone-300">
                {i.label}
              </React_Scrool>
            ))}
          </div>

          <Image
            alt={lang !== "en" ? "VI" : "EN"}
            src={
              lang !== "en"
                ? "/icons-lang/us-uk-lang.png"
                : "/icons-lang/vn-lang.png"
            }
            className="transition-all duration-1000 hover:cursor-pointer hidden md:block"
            width={30}
            height={0}
            onClick={() => setLang(lang === "en" ? "vi" : "en")}
          />

          <button
            className="md:hidden relative h-fit flex items-center duration-700 transition-all"
            onClick={() => setDropdownMenu(!isDropdownMenu)}>
            {isDropdownMenu ? <ListX className="text-red-500" /> : <Menu />}

            <div
              className={` ${
                isDropdownMenu ? "scale-y-100" : "scale-y-0"
              }  flex origin-top gap-1 duration-700 transition-all rounded-md absolute bg-stone-800 top-12 -left-23 flex-col w-fit`}>
              {Object.values(text.navbar).map((i) => (
                <React_Scrool
                  to={i.href}
                  smooth={true}
                  duration={1100}
                  key={i.label}
                  offset={-115}
                  onClick={handleTurnOffDropdown}
                  className="whitespace-nowrap hover:scale-110 shadow-lg cursor-pointer px-4 duration-700 transition-colors py-1 text-white ">
                  {i.label}
                </React_Scrool>
              ))}
              <div
                onClick={() => setLang(lang === "en" ? "vi" : "en")}
                className="multi-color-text whitespace-nowrap hover:scale-110 shadow-lg cursor-pointer px-4 duration-700 transition-colors py-1">
                {lang != "en" ? "English" : "Vietnamese"}
              </div>
            </div>
          </button>
        </nav>

        <main className="w-full lg:w-[90%] h-fit lg:px-0 px-5 pt-16 flex flex-col gap-y-20">
          <Element name="home">
            <section className="flex w-full justify-between">
              <div className="flex flex-col w-full md:w-[74%]">
                <p className="topic flex flex-wrap">
                  Hi there, I`m Truong Thanh Long
                </p>
                <TypeAnimation
                  sequence={[
                    "Web Developer - ReactJS",
                    1000,
                    "Mobile Flutter - Dart",
                    1000,
                    "FullStack - NextJS (ReactJS + Express)",
                    1000,
                  ]}
                  wrapper="div"
                  speed={60}
                  repeat={Infinity}
                  className="text-base md:text-xl lg:text-3xl tracking-wider uppercase inline-block mb-1"
                />
                <div className="mb-4 w-full">
                  <p className="lg:text-lg text-base break-words">
                    {lang !== "en" ? (
                      <>
                        Hiện tôi đang sống tại TP.Hồ Chí Minh và đang là{" "}
                        <span className="cursor-pointer relative group">
                          sinh viên năm 4
                          <span className="absolute hidden group-hover:block z-[1] bg-stone-900 text-white top-10 left-0 border border-stone-400">
                            <Countdown
                              date={moment(
                                "2025-11-21 12:00:00",
                                "YYYY-MM-DD HH:mm:ss"
                              ).valueOf()}
                              renderer={({
                                days,
                                hours,
                                minutes,
                                seconds,
                                completed,
                              }) =>
                                completed ? (
                                  <span className="multi-color-text px-3 py-1 whitespace-nowrap">
                                    University Graduate 🎓
                                  </span>
                                ) : (
                                  <span className="multi-color-text px-3 py-1 whitespace-nowrap">
                                    {days}d {hours}h {minutes}m {seconds}s
                                  </span>
                                )
                              }
                            />
                          </span>
                        </span>{" "}
                        chuyên ngành Công nghệ phần mềm của Trường Đại học Ngoại
                        ngữ - Tin học TP.Hồ Chí Minh (
                        <Link
                          target="_blank"
                          href="https://huflit.edu.vn/"
                          className="text-amber-400 font-semibold hover:underline hover:underline-offset-4">
                          HUFLIT
                        </Link>
                        ). Trong quá trình học tập và làm{" "}
                        <React_Scrool
                          to={text.navbar.projects.href}
                          smooth={true}
                          duration={1000}
                          offset={-115}
                          className="font-semibold cursor-pointer text-shadow-md hover:underline hover:underline-offset-4 text-shadow-pink-600">
                          dự án
                        </React_Scrool>{" "}
                        môn học, tôi đã tiếp cận với các{" "}
                        <React_Scrool
                          to={text.navbar.skills.href}
                          smooth={true}
                          duration={1000}
                          offset={-115}
                          className="font-semibold cursor-pointer text-shadow-md text-shadow-pink-600 hover:underline hover:underline-offset-4">
                          Frameworks & Libraries
                        </React_Scrool>{" "}
                        khác nhau, các khái niệm về lập trình hướng đối
                        tượng(OOP), thuật toán,... Tôi{" "}
                        <span className="text-blue-600 font-bold">
                          đang tìm kiếm công việc thực tập
                        </span>{" "}
                        liên quan đến kiến thức đã học là lập trình web{" "}
                        <span className="font-semibold underline underline-offset-4 decoration-2 decoration-wavy decoration-blue-600">
                          React
                        </span>{" "}
                        &{" "}
                        <span className="font-semibold underline underline-offset-4 decoration-2 decoration-wavy decoration-blue-600">
                          Mobile Flutter
                        </span>{" "}
                        nhằm học hỏi, áp dụng kiến thức, trải nghiệm tại môi
                        trường làm việc và hoàn thành môn thực tập công nghiệp.
                      </>
                    ) : (
                      <>
                        I am currently living in Ho Chi Minh City and am a{" "}
                        <span className="cursor-pointer relative group">
                          4th year student
                          <span className="absolute hidden group-hover:block z-[1] bg-stone-900 text-white top-10 left-0  border border-stone-400">
                            <Countdown
                              date={moment(
                                "2025-11-21 12:00:00",
                                "YYYY-MM-DD HH:mm:ss"
                              ).valueOf()}
                              renderer={({
                                days,
                                hours,
                                minutes,
                                seconds,
                                completed,
                              }) =>
                                completed ? (
                                  <span className="multi-color-text px-3 py-1 whitespace-nowrap">
                                    University Graduate 🎓
                                  </span>
                                ) : (
                                  <span className="multi-color-text px-3 py-1 whitespace-nowrap">
                                    {days}d {hours}h {minutes}m {seconds}s
                                  </span>
                                )
                              }
                            />
                          </span>
                        </span>{" "}
                        majoring in Software Technology at HCMC University of
                        Foreign Languages - Information Technology (
                        <Link
                          target="_blank"
                          href="https://huflit.edu.vn/en/"
                          className="text-amber-400 font-semibold hover:underline hover:underline-offset-4">
                          HUFLIT
                        </Link>
                        ). During my studies and{" "}
                        <React_Scrool
                          to={text.navbar.projects.href}
                          smooth={true}
                          duration={1000}
                          offset={-115}
                          className="font-semibold cursor-pointer text-shadow-md hover:underline hover:underline-offset-4 text-shadow-pink-600">
                          project
                        </React_Scrool>{" "}
                        work, I have been exposed to different{" "}
                        <React_Scrool
                          to={text.navbar.skills.href}
                          smooth={true}
                          duration={1000}
                          offset={-115}
                          className="font-semibold cursor-pointer text-shadow-md text-shadow-pink-600 hover:underline hover:underline-offset-4">
                          Frameworks & Libraries
                        </React_Scrool>
                        . I{" "}
                        <span className="text-blue-600 font-extrabold">
                          am looking for an internship
                        </span>{" "}
                        related to my knowledge of{" "}
                        <span className="font-semibold underline underline-offset-4 decoration-2 decoration-wavy decoration-blue-600">
                          React
                        </span>{" "}
                        web programming &{" "}
                        <span className="font-semibold underline underline-offset-4 decoration-2 decoration-wavy decoration-blue-600">
                          Mobile Flutter
                        </span>{" "}
                        to learn, apply my knowledge, gain experience in the
                        working environment and complete my industrial
                        internship.
                      </>
                    )}
                  </p>
                </div>

                <div className="flex gap-5 items-center flex-wrap">
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/in/long-thành-54629237a"
                    className="w-fit h-fit">
                    <Image
                      alt="LinkedIn"
                      src="icons-social/linkedin.svg"
                      className="transition-all hover:ease-in-out hover:scale-125 duration-700"
                      width={25}
                      height={25}
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href="https://github.com/thanhlongtruong"
                    className="w-fit h-fit">
                    <Image
                      alt="GitHub"
                      src="icons-software/github.svg"
                      className="transition-all hover:ease-in-out hover:scale-125 duration-700"
                      width={25}
                      height={25}
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href="mailto:truongthanhlong1542004@gmail.com"
                    className="w-fit h-fit">
                    <Image
                      aria-hidden
                      src="icons-social/gmail.svg"
                      alt="Email"
                      width={25}
                      height={25}
                      className="transition-all hover:ease-in-out hover:scale-125 duration-700"
                    />
                  </Link>
                  {data?.data
                    .filter((cv: { _id: string; url: string; name: string }) =>
                      lang === "en"
                        ? cv.name.toLowerCase().includes("english")
                        : !cv.name.toLowerCase().includes("english")
                    )
                    .map((cv: { _id: string; url: string; name: string }) => (
                      <Link
                        key={cv._id}
                        target="_blank"
                        href={cv.url}
                        className="outline-2 rounded-md transition-all hover:ease-out hover:outline-blue-500 hover:text-blue-300 duration-700 px-4 py-1">
                        {cv.name}
                      </Link>
                    ))}
                </div>
              </div>
              <div className="card-author hidden md:flex">
                <div className="author-inner">
                  <Image
                    src="/background/personal.JPEG"
                    alt="Author"
                    fill
                    className="rounded-full pointer-events-none "
                  />
                </div>
              </div>
            </section>
          </Element>

          <Element name="skills">
            <section className="w-full gap-10 flex flex-col">
              <div>
                <h1 className="topic autoShow">{text.navbar.skills.label}</h1>
                <Paragraph
                  value={
                    lang !== "en"
                      ? "Thiết kế, phần mềm, framework, ngôn ngữ lập trình, library,... trong quá trình học và làm đồ án tại trường:"
                      : "Design, software, framework, programming language, library during study and project at school:"
                  }
                />
              </div>

              <div className="flex flex-col gap-y-4 text-base">
                <div className="flex flex-wrap gap-5">
                  {PathIconDesign.map((ds) => (
                    <Link
                      target="_blank"
                      href={ds.link}
                      key={ds.name}
                      className="flex items-center py-1 px-4 border rounded-md border-stone-600 gap-x-1">
                      <Image
                        aria-hidden
                        src={ds.path}
                        alt={ds.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="imageReveal">{ds.name}</p>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-5">
                  {PathIconSoftware.map((s) => (
                    <Link
                      target="_blank"
                      href={s.link}
                      key={s.name}
                      className="flex items-center py-1 px-4 border rounded-md border-stone-600 gap-x-1">
                      <Image
                        aria-hidden
                        src={s.path}
                        alt={s.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="imageReveal">{s.name}</p>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-5">
                  {PathIconFramework.map((f) => (
                    <Link
                      target="_blank"
                      href={f.link}
                      key={f.name}
                      className="flex items-center py-1 px-4 border rounded-md border-stone-600 gap-x-1">
                      <Image
                        aria-hidden
                        src={f.path}
                        alt={f.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="imageReveal">{f.name}</p>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-5">
                  {PathIconLanguage.map((lg) => (
                    <Link
                      target="_blank"
                      href={lg.link}
                      key={lg.name}
                      className="flex items-center py-1 px-4 border rounded-md border-stone-600 gap-x-1">
                      <Image
                        aria-hidden
                        src={lg.path}
                        alt={lg.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="imageReveal">{lg.name}</p>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-5">
                  {PathIconLibrary.map((l) => (
                    <Link
                      target="_blank"
                      href={l.link}
                      key={l.name}
                      className="flex items-center py-1 px-4 border rounded-md border-stone-600 gap-x-1">
                      <Image
                        aria-hidden
                        src={l.path}
                        alt={l.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="imageReveal">{l.name}</p>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-5">
                  {PathIconDatabase.map((d) => (
                    <Link
                      target="_blank"
                      href={d.link}
                      key={d.name}
                      className="flex items-center py-1 px-4 border rounded-md border-stone-600 gap-x-1">
                      <Image
                        aria-hidden
                        src={d.path}
                        alt={d.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="imageReveal">{d.name}</p>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-5">
                  {PathIconHosting.map((h) => (
                    <Link
                      target="_blank"
                      href={h.link}
                      key={h.name}
                      className="flex items-center py-1 px-4 border rounded-md border-stone-600 gap-x-1">
                      <Image
                        aria-hidden
                        src={h.path}
                        alt={h.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="imageReveal">{h.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </Element>

          <Element name="projects">
            <section className="w-full">
              <h1 className="topic autoShow">{text.navbar.projects.label}</h1>
              <div className="gap-y-28 flex flex-col w-full">
                <div className="w-full gap-10 flex flex-col">
                  <div className="gap-4 flex flex-col">
                    <div className="autoShow">
                      <p className="text-xl lg:text-2xl font-semibold">
                        FrontEnd GrapFood
                      </p>
                      <h6 className="text-stone-500 text-base">
                        Last updated April 27, 2024
                      </h6>
                    </div>
                    <Paragraph
                      value={
                        lang != "en"
                          ? "Project đầu tiên sử dụng ReactJS để xây dựng giao diện cơ bản về GrapFood."
                          : "The first project uses ReactJS to build the basic interface of GrapFood."
                      }
                    />
                  </div>
                  <div>
                    <Swiper
                      modules={[
                        Navigation,
                        Pagination,
                        EffectCoverflow,
                        Autoplay,
                      ]}
                      slidesPerView={"auto"}
                      pagination={{ clickable: true }}
                      speed={2000}
                      centeredSlides
                      effect={"coverflow"}
                      preventClicks
                      loop={true}
                      grabCursor
                      coverflowEffect={{
                        rotate: 0,
                        stretch: 80,
                        depth: 350,
                        modifier: 1,
                        slideShadows: true,
                      }}
                      navigation
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}>
                      {Grapfood.map((i, index) => (
                        <SwiperSlide key={index} className="slide-inner">
                          <div className="relative w-full h-[200px] md:h-[430px] lg:w-5xl lg:h-[570px] mx-auto">
                            <Image
                              src={i.path}
                              alt={lang !== "en" ? i.vi : i.en}
                              fill
                              className="rounded-md"
                            />
                            <div className="absolute bottom-0 right-0 bg-[url('/background/zwartevilt.png')] text-center w-fit px-3 md:px-7 max-w-full py-1 rounded-tl-xl">
                              <p className=" multi-color-text font-semibold font-mono w-fit md:text-base text-sm">
                                {lang != "en" ? i.vi : i.en}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 w-full">
                    {GrapfoodTechnologies.map((t) => (
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
                  <ComponentVisitWeb_Github
                    icon={{
                      name: "GitHub Pages",
                      path: `${PATH_ICONS_SOFTWARE}github.svg`,
                    }}
                    web="https://thanhlongtruong.github.io/GrapFood_TTL/"
                    github="https://github.com/thanhlongtruong/GrapFood_TTL"
                  />
                </div>

                <div className="gap-4 flex flex-col">
                  <div className="autoShow">
                    <p className="text-xl lg:text-2xl font-semibold">
                      {lang != "en"
                        ? "Website đặt vé máy bay"
                        : "Flight booking website"}{" "}
                      - TRAVFRUIT
                    </p>
                    <h6 className="text-stone-500 text-base">
                      July, 2024 - Now
                    </h6>
                  </div>

                  <div className="gap-10 flex flex-col">
                    <div className="gap-y-1 flex flex-col">
                      <p className="text-lg font-semibold autoShow">
                        1. FrontEnd Client
                      </p>

                      <Paragraph
                        value={
                          lang != "en"
                            ? "TRAVFRUIT là một website mô tả quá trình đặt vé máy bay được xây dựng từ thư viện ReactJS viết bằng Javascript và Tailwind CSS để tạo UI và responsive design. Với các tính năng như: tìm chuyến, đặt và hủy vé đi và khứ hồi, thanh toán bằng MOMO, Paypal và VietQR,... Sử dụng với React hooks, React-query, React Hook Form, React-toastify, React-datepicker, axios, React-chatbot-kit, jwt-decode, React-dom,..."
                            : "TRAVFRUIT is a website that describes the process of booking airline tickets built from the ReactJS library written in Javascript and Tailwind CSS to create UI and responsive design. With features such as: finding flights, booking and canceling round-trip and round-trip tickets, paying with MOMO, Paypal and VietQR,... Using with React hooks, React-query, React Hook Form, React-toastify, React-datepicker, axios, React-chatbot-kit, jwt-decode, React-dom,..."
                        }
                      />
                    </div>
                    <div>
                      <Swiper
                        modules={[
                          Navigation,
                          Pagination,
                          EffectCoverflow,
                          Autoplay,
                        ]}
                        slidesPerView={"auto"}
                        pagination={{ clickable: true }}
                        speed={2000}
                        centeredSlides
                        effect={"coverflow"}
                        preventClicks
                        loop={true}
                        grabCursor
                        coverflowEffect={{
                          rotate: 0,
                          stretch: 80,
                          depth: 350,
                          modifier: 1,
                          slideShadows: true,
                        }}
                        navigation
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                        }}>
                        {TravFruit.map((i, index) => (
                          <SwiperSlide key={index} className="slide-inner">
                            <div className="relative w-full h-[200px] md:h-[430px] lg:w-5xl lg:h-[570px] mx-auto">
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
                    <div className="flex flex-wrap items-center gap-4 w-full">
                      {TravfruitTechnologies.map((t) => (
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
                    <ComponentVisitWeb_Github
                      icon={{
                        name: "Vercel",
                        path: `${PATH_ICONS_HOSTING}vercel.svg`,
                      }}
                      web="https://travfruitv4.vercel.app/"
                      github="https://github.com/thanhlongtruong/travFruit/tree/travFruit.v4/client"
                    />
                  </div>

                  <div className="gap-10 flex flex-col">
                    <div className="gap-y-1 flex flex-col">
                      <p className="text-lg font-semibold autoShow">
                        2. FrontEnd Admin
                      </p>

                      <Paragraph
                        value={
                          lang != "en"
                            ? "Website Admin TRAVFRUIT quản lý: tài khoản người dùng, chuyến bay, giao dịch."
                            : "Admin TRAVFRUIT website manages: user accounts, flights, transactions."
                        }
                      />
                    </div>

                    <div>
                      <Swiper
                        modules={[
                          Navigation,
                          Pagination,
                          EffectCoverflow,
                          Autoplay,
                        ]}
                        slidesPerView={"auto"}
                        pagination={{ clickable: true }}
                        speed={2000}
                        centeredSlides
                        loop
                        effect={"coverflow"}
                        preventClicks
                        grabCursor
                        coverflowEffect={{
                          rotate: 0,
                          stretch: 80,
                          depth: 350,
                          modifier: 1,
                          slideShadows: true,
                        }}
                        navigation
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                        }}>
                        {TravFruitAdmin.map((i, index) => (
                          <SwiperSlide key={index} className="slide-inner">
                            <div className="relative w-full h-[200px] md:h-[430px] lg:w-5xl lg:h-[570px] mx-auto">
                              <Image
                                src={i.path}
                                alt={lang !== "en" ? i.vi : i.en}
                                fill
                                className="rounded-md "
                              />
                              <div className="absolute bottom-0 right-0 bg-[url('/background/zwartevilt.png')] max-w-full text-center w-fit px-3 md:px-7 py-1 rounded-tl-xl">
                                <p className="multi-color-text font-semibold font-mono w-fit md:text-base text-sm">
                                  {lang != "en" ? i.vi : i.en}
                                </p>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 w-full">
                      {TravfruitAdminTechnologies.map((t) => (
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
                    <ComponentVisitWeb_Github
                      icon={{
                        name: "Vercel",
                        path: `${PATH_ICONS_HOSTING}vercel.svg`,
                      }}
                      web="https://travfruitv3admin.vercel.app/"
                      github="https://github.com/thanhlongtruong/travFruit/tree/travFruit.v4/admin.v2"
                    />
                  </div>

                  <div className="gap-10 flex flex-col">
                    <div className="gap-y-1 flex flex-col">
                      <p className="text-lg font-semibold autoShow">
                        3. BackEnd{" "}
                      </p>
                      <Paragraph
                        value={
                          lang != "en"
                            ? "Sử dụng Framework Express tạo các API, middleware xác thực người dùng khi gửi request và sử dụng MongoDB để lưu trữ dữ liệu. Ngoài ra còn có các thư viện để hỗ trợ như: cors, express-validator, moment,jsonwebtoken, nodemailer, nodemon,..."
                            : "Use the Express Framework to create APIs, middleware to authenticate users when sending requests and MongoDB to store data. There are also supporting libraries such as: cors, express-validator, moment, jsonwebtoken, nodemailer, nodemon,..."
                        }
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 w-full">
                      {TravfruitBackendTechnologies.map((t) => (
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
                  </div>
                </div>

                <div className="gap-10 flex flex-col">
                  <div className="gap-y-1 flex flex-col">
                    <div className="autoShow">
                      <p className="text-xl lg:text-2xl font-semibold">
                        {lang != "en"
                          ? "App đặt vé xem phim"
                          : "Movie ticket booking app"}{" "}
                        - CINEFRUIT
                      </p>
                      <h6 className="text-stone-500 text-base">
                        May, 2025 - August, 2025
                      </h6>
                    </div>
                    <Paragraph
                      value={
                        lang != "en"
                          ? "CINEFRUIT là ứng dụng đặt vé xem phim được xây dựng bằng Framework Flutter. Ứng dụng được triển khai với tính năng: xác minh email, danh sách phim hot, suất chiếu theo phim và rạp, chọn và giữ ghế,... Cùng với đó sử dụng Riverpod, GetX, http, shared_preferences, webview_flutter, Cupertino widgets, dio,... nhằm tối ưu quản lí trạng thái và trải nghiệm người dùng. Xây dựng BackEnd với Express và MongoDB để xử lý và thiết lập trạng thái ghế và xác thực JWT khi người dùng gửi request."
                          : "CINEFRUIT is a movie ticket booking application built on the Flutter Framework platform. The application is deployed with features: email authentication, hot movie list, theater showtimes, seat selection and booking,... Along with that, the application uses Riverpod, GetX, http, shared_preferences, webview_flutter, Cupertino widgets, dio,... to optimize state management and user experience. Build BackEnd with Express and MongoDB to process and set seat status, and authenticate JWT when users send requests."
                      }
                    />
                  </div>
                  <div>
                    <Swiper
                      modules={[
                        Navigation,
                        Pagination,
                        EffectCoverflow,
                        Autoplay,
                      ]}
                      slidesPerView="auto"
                      breakpoints={{
                        768: { slidesPerView: 2 },
                      }}
                      pagination={{ clickable: true }}
                      speed={2000}
                      effect={"coverflow"}
                      preventClicks
                      centeredSlides
                      loop={true}
                      grabCursor
                      coverflowEffect={{
                        rotate: 30,
                        stretch: 65,
                        depth: 350,
                        modifier: 1,
                        slideShadows: true,
                      }}
                      navigation
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}>
                      {Cinefruit.map((i, index) => (
                        <SwiperSlide key={index} className="slide-inner">
                          <div className="relative w-[245px] h-[450px] md:w-[240px] md:h-[450px] lg:w-[280px] lg:h-[560px] mx-auto">
                            <Image
                              src={i.path}
                              alt={lang !== "en" ? i.vi : i.en}
                              fill
                              className="rounded-md "
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
                  <div className="flex flex-wrap items-center gap-4 w-full">
                    {CinefruitTechnologies.map((t) => (
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
                  <div className="flex flex-wrap gap-4">
                    <Link
                      target="_blank"
                      href="https://www.figma.com/design/kbXqz4aedVBh7FknIAquoJ/App-dat-ve-xem-phim---CineFruit?node-id=0-1&t=1FfdUidmf1A5n0VV-1"
                      className="transition-all ease-out hover:scale-110 duration-700 flex items-center w-fit py-1 px-4 border rounded-md border-stone-600 hover:border-blue-500 gap-x-1">
                      <Image
                        aria-hidden
                        src={`${PATH_ICONS_DESIGN}figma.svg`}
                        alt="Figma"
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="multi-color-text font-semibold font-mono w-fit imageReveal">
                        Visit Figma
                      </p>
                    </Link>
                    <Link
                      target="_blank"
                      href="https://youtu.be/tnN4lSVfiu0"
                      className="transition-all ease-out hover:scale-110 duration-700 flex items-center w-fit py-1 px-4 border rounded-md border-stone-600 hover:border-blue-500 gap-x-1">
                      <Image
                        aria-hidden
                        src="icons-social/youtube.svg"
                        alt="Youtube"
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="multi-color-text font-semibold font-mono w-fit imageReveal text-zinc-950">
                        Youtube
                      </p>
                    </Link>
                    <Link
                      target="_blank"
                      href="https://github.com/thanhlongtruong/cinefruit"
                      className="flex items-center py-1 px-4 border w-fit rounded-md border-stone-600 hover:border-blue-600 gap-x-1 transition-all ease-out hover:scale-110 duration-700">
                      <Image
                        aria-hidden
                        src={`${PATH_ICONS_SOFTWARE}github.svg`}
                        alt="GitHub"
                        width={24}
                        height={24}
                        className="w-6 h-6 imageReveal"
                      />
                      <p className="multi-color-text font-semibold font-mono w-fit imageReveal">
                        Github
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </Element>

          <Element name="contact">
            <section className="h-fit mb-28 w-full autoShow">
              <h1 className="topic">{text.navbar.contact.label}</h1>
              <div className="flex flex-col gap-4 w-full">
                <Link
                  target="_blank"
                  href="mailto:truongthanhlong1542004@gmail.com"
                  className="w-fit h-fit flex gap-4 items-center animate-underline">
                  <Image
                    aria-hidden
                    src="icons-social/gmail.svg"
                    alt="Email"
                    width={25}
                    height={25}
                  />
                  <div className="flex flex-col items-start autoBlur">
                    <h3>EMAIL </h3>
                    <p className="break-all">
                      truongthanhlong1542004@gmail.com
                    </p>
                  </div>
                </Link>

                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/long-th%C3%A0nh-54629237a"
                  className="w-fit h-fit flex gap-4 items-center animate-underline">
                  <Image
                    aria-hidden
                    src="icons-social/linkedin.svg"
                    alt="Email"
                    width={25}
                    height={25}
                  />
                  <div className="flex flex-col items-start autoBlur">
                    <h3>LINKEDIN </h3>
                    <p className="break-all">
                      https://www.linkedin.com/in/long-th%C3%A0nh-54629237a
                    </p>
                  </div>
                </Link>

                <Link
                  target="_blank"
                  href="tel:+84967994184"
                  className="w-fit h-fit flex gap-4 items-center animate-underline">
                  <Phone className="w-[25px] h-[25px]" />
                  <div className="flex flex-col items-start autoBlur">
                    <h3>PHONE </h3>
                    <p>+84-967-994-184</p>
                  </div>
                </Link>
              </div>
            </section>
          </Element>
        </main>

        <footer className="border-t border-stone-600 w-full h-fit lg:px-0 px-5 pt-4 flex flex-col justify-center items-center gap-4">
          <div className="flex justify-around w-full lg:w-[90%]">
            <div className="flex flex-col gap-4">
              <h1>MOVE TO</h1>
              <React_Scrool
                to="home"
                smooth={true}
                duration={1100}
                offset={-115}
                className="hover:underline hover:underline-offset-4 hover:cursor-pointer duration-1000 transition-colors py-1 rounded-md hover:text-white text-stone-300">
                About me
              </React_Scrool>

              <React_Scrool
                to="skills"
                smooth={true}
                duration={1100}
                offset={-115}
                className="hover:underline hover:underline-offset-4 hover:cursor-pointer duration-1000 transition-colors py-1 rounded-md hover:text-white text-stone-300">
                Skills
              </React_Scrool>

              <React_Scrool
                to="projects"
                smooth={true}
                duration={1100}
                offset={-115}
                className="hover:underline hover:underline-offset-4 hover:cursor-pointer duration-1000 transition-colors py-1 rounded-md hover:text-white text-stone-300">
                Projects
              </React_Scrool>
            </div>
            <div className="flex flex-col gap-4">
              <h1>SOCIAL</h1>
              <Link
                target="_blank"
                href="https://github.com/thanhlongtruong"
                className="hover:underline hover:underline-offset-4 hover:cursor-pointer duration-1000 transition-colors py-1 rounded-md hover:text-white text-stone-300">
                Github
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/long-th%C3%A0nh-54629237a"
                className="hover:underline hover:underline-offset-4 hover:cursor-pointer duration-1000 transition-colors py-1 rounded-md hover:text-white text-stone-300">
                LinkedIn
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/tr.thanhlong/"
                className="hover:underline hover:underline-offset-4 hover:cursor-pointer duration-1000 transition-colors py-1 rounded-md hover:text-white text-stone-300">
                Instagram
              </Link>
            </div>
          </div>
          <div className="border-t border-stone-600 flex flex-wrap justify-between text-stone-400 gap-2 w-[90%] py-2">
            <p>Copyright © 2025 Fruit</p>
            <p>Built with Next.js & Tailwind CSS</p>
          </div>
        </footer>

        <Suspense
          fallback={
            <div className="text-red-600 text-xl w-fit h-fit py-1 px-3 bg-white">
              Loading Upload UI...
            </div>
          }>
          <LazyUploadFile
            isUIUploadFile={isUIUploadFile}
            handlesetUIUploadFile={() => setUIUploadFile(false)}
          />
        </Suspense>
      </div>
    </>
  );
}

interface Props {
  icon: {
    path: string;
    name: string;
  };
  web: string;
  github: string;
}

function ComponentVisitWeb_Github({ icon, web, github }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <Link
        target="_blank"
        href={web}
        className="transition-all ease-out hover:scale-110 duration-700 flex items-center w-fit py-1 px-4 border rounded-md border-stone-600 hover:border-blue-500 gap-x-1">
        <Image
          aria-hidden
          src={icon?.path}
          alt={icon?.name}
          width={24}
          height={24}
          className="w-6 h-6 imageReveal"
        />
        <p className="multi-color-text font-semibold font-mono w-fit imageReveal">
          Visit website
        </p>
      </Link>
      <Link
        target="_blank"
        href={github}
        className="flex items-center py-1 px-4 border w-fit rounded-md border-stone-600 hover:border-blue-500 gap-x-1 transition-all ease-out hover:scale-110 duration-700">
        <Image
          aria-hidden
          src={`${PATH_ICONS_SOFTWARE}github.svg`}
          alt="GitHub"
          width={24}
          height={24}
          className="w-6 h-6 imageReveal"
        />
        <p className="multi-color-text font-semibold font-mono w-fit imageReveal">
          Github
        </p>
      </Link>
    </div>
  );
}
