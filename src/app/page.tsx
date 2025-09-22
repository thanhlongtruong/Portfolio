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

import {
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
  TravFruitAdminDeploy,
  TravfruitAdminTechnologies,
  TravfruitBackendTechnologies,
  TravFruitDeploy,
  TravfruitTechnologies,
} from "./configs/lang_image_travfruit";
import {
  Grapfood,
  GrapfoodDeploy,
  GrapfoodTechnologies,
} from "./configs/lang_image_grapfood";
import {
  CineFruit,
  CineFruitDeploy,
  CineFruitTechnologies,
} from "./configs/lang_image_cinefruit";
import { useEffect, useRef, useState, Suspense, lazy } from "react";

const Countdown = dynamic(() => import("react-countdown"), { ssr: false });
import moment from "moment";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { getFile } from "./api-client/save-file";
import { useMutation, useQuery } from "@tanstack/react-query";

import Loading from "./loading";
import { checkKeyboard } from "./api-client/check-keyboard";

const LazyUploadFile = lazy(() => import("./components/upload-file"));

const LazySwiperSlideComponent = lazy(
  () => import("./components/swiper-slide")
);

export default function Home() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const { text, lang, setLang } = useLang();

  const [isDropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const [isUIUploadFile, setUIUploadFile] = useState(false);

  const bufferRef = useRef("");

  const handleTurnOffDropdown = () => setDropdownMenu(false);

  const mutationCallCheckKey = useMutation({
    mutationFn: checkKeyboard,
    retry: 0,
    onSuccess: () => {
      setUIUploadFile(true);
    },
  });

  useEffect(() => {
    const buffer: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length !== 1 || isUIUploadFile) return;
      buffer.push(e.key.toLowerCase());
      if (buffer.length > 6) buffer.length = 0;

      bufferRef.current += e.key.toLowerCase();

      if (buffer.length === 6) {
        mutationCallCheckKey.mutate(buffer.join(""));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { data } = useQuery({
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
                <p className="topic flex flex-wrap gap-x-2.5">
                  <span>{"Hi there, I'm"}</span>
                  <span>Truong Thanh Long</span>
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
                        ), GPA hiện tại 2.94/4.0. Trong quá trình học tập và làm{" "}
                        <React_Scrool
                          to={text.navbar.projects.href}
                          smooth={true}
                          duration={1000}
                          offset={-115}
                          className="font-semibold cursor-pointer text-shadow-md hover:underline hover:underline-offset-4 text-shadow-pink-600">
                          đồ án
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
                          đang tìm kiếm công việc thực tập full-time
                        </span>{" "}
                        liên quan đến kiến thức đã học là lập trình web{" "}
                        <span className="font-semibold underline underline-offset-4 decoration-2 decoration-wavy decoration-blue-600">
                          NextJS-React
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
                        ), current GPA 2.94/4.0. During my studies and{" "}
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
                          am looking for a full-time internship
                        </span>{" "}
                        related to my knowledge of{" "}
                        <span className="font-semibold underline underline-offset-4 decoration-2 decoration-wavy decoration-blue-600">
                          NextJS-React
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
                    // .filter((cv: { _id: string; url: string; name: string }) =>
                    //   lang === "en"
                    //     ? cv.name.toLowerCase().includes("english")
                    //     : !cv.name.toLowerCase().includes("english")
                    // )
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
              <h1 className="topic autoShow">{text.navbar.skills.label}</h1>

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
                  <div className="gap-1 flex flex-col">
                    <div className="autoShow">
                      <p className="text-xl lg:text-2xl font-semibold">
                        FrontEnd GrapFood
                      </p>
                      <h6 className="text-stone-500 text-base">
                        Last updated April 27, 2024
                      </h6>
                    </div>

                    <ul className="list-disc list-inside autoShow text-base lg:text-lg">
                      <li>
                        {lang != "en"
                          ? "Project đầu tiên sử dụng ReactJS để xây dựng giao diện cơ bản về GrapFood."
                          : "The first project uses ReactJS to build the basic interface of GrapFood."}
                      </li>
                      <li>
                        {lang != "en"
                          ? "Khởi tạo: npx create-react-app my-app."
                          : "Initialization: npx create-react-app my-app."}
                      </li>
                      <li>{"Style & Responsive Design: Tailwind CSS."}</li>
                      <li>Format code: Prettier.</li>
                      <li>Deploy: GitHub Pages.</li>
                    </ul>
                  </div>
                  <Suspense
                    fallback={
                      <div className="mx-auto text-lg w-fit h-fit py-1 px-3 text-white">
                        Loading slide...
                      </div>
                    }>
                    <LazySwiperSlideComponent
                      arrTechStack={GrapfoodTechnologies}
                      arrImg={Grapfood}
                      arrDeploy={GrapfoodDeploy}
                    />
                  </Suspense>
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
                    <div className="gap-1 flex flex-col">
                      <p className="text-lg font-semibold autoShow">
                        1. FrontEnd Client
                      </p>

                      <ul className="list-disc list-inside autoShow text-base lg:text-lg">
                        <li>
                          {lang != "en"
                            ? "TRAVFRUIT là website mô tả quá trình đặt vé máy bay."
                            : "TRAVFRUIT is a website that describes the process of booking airline tickets."}
                        </li>

                        <li>
                          {lang != "en"
                            ? "Xây dựng components bằng library ReactJS (JavaScript)."
                            : "Building components using ReactJS (JavaScript) library."}
                        </li>
                        <li>Style & Responsive Design: Tailwind CSS</li>
                        <li>
                          {lang != "en" ? "Chức năng:" : "Feature:"}
                          <ul className="list-disc list-inside ml-5">
                            <li>
                              {lang != "en"
                                ? "Tìm, sort chuyến bay."
                                : "Find and sort flights."}
                            </li>
                            <li>
                              {lang != "en"
                                ? "Đặt vé đi & khứ hồi."
                                : "Book one-way and round-trip tickets."}
                            </li>
                            <li>
                              {lang != "en"
                                ? "Chọn vị trí ngồi & điền thông tin."
                                : "Select your seat & fill in your information."}
                            </li>
                            <li>
                              {lang != "en"
                                ? "Thanh toán trực tuyến: MoMo, VietQR, PayPal."
                                : "Online payment: MoMo, VietQR, PayPal."}
                            </li>
                            <li>
                              {lang != "en"
                                ? "Xem lịch sử & hủy vé đi/khứ hồi."
                                : "View history and cancel one-way/return tickets."}
                            </li>
                          </ul>
                        </li>
                        <li>
                          {lang != "en"
                            ? "Call API: axios + useQuery & useMutation giúp tự động catching, giảm số lần call API."
                            : "Call API: axios + useQuery & useMutation helps automatically catching, reducing the number of API calls."}
                        </li>
                        <li>
                          {lang != "en"
                            ? "React Hook Form: hỗ trợ xây dựng form giúp hạn chế sử dụng useState và validate dữ liệu dễ dàng."
                            : "React Hook Form: supports form building to help limit the use of useState and validate data easily."}
                        </li>
                        <li>
                          {lang != "en"
                            ? "Các hook đã sử dụng: useState, useEffect, useCallback, useContext,..."
                            : "Hooks used: useState, useEffect, useCallback, useContext,..."}
                        </li>
                        <li>
                          {lang != "en"
                            ? "Authentication: gửi mã xác nhận tới email khi đặt vé, accessToken và refreshToken được lưu tại localStorage giúp lưu trạng thái login và được đính kèm vào Headers mỗi khi request nhằm check role và authorization."
                            : "Authentication: send confirmation code to email when booking ticket, accessToken and refreshToken are saved in localStorage to save login status and are attached to Headers every request to check role and authorization."}
                        </li>
                        <li>Deploy: Vercel.</li>
                        <li>Account demo: 0000000000, password: travFruit</li>
                      </ul>
                    </div>

                    <Suspense
                      fallback={
                        <div className="mx-auto text-lg w-fit h-fit py-1 px-3 text-white">
                          Loading slide...
                        </div>
                      }>
                      <LazySwiperSlideComponent
                        arrImg={TravFruit}
                        arrTechStack={TravfruitTechnologies}
                        arrDeploy={TravFruitDeploy}
                      />
                    </Suspense>
                  </div>

                  <div className="gap-10 flex flex-col">
                    <div className="gap-1 flex flex-col">
                      <p className="text-lg font-semibold autoShow">
                        2. FrontEnd Admin
                      </p>

                      <ul className="list-disc list-inside autoShow text-base lg:text-lg">
                        <li>Build: Vite + React (JavaScript).</li>
                        <li>Style: Tailwind CSS.</li>
                        <li>
                          {lang != "en" ? "Chức năng:" : "Feature:"}
                          <ul className="list-disc list-inside ml-4">
                            <li>
                              {lang != "en"
                                ? "Quản lý account & vé theo từng account."
                                : "Manage accounts & tickets by account."}
                            </li>
                            <li>
                              {lang != "en"
                                ? "Quản lý chuyến bay."
                                : "Flight management."}
                            </li>
                            <li>
                              {lang != "en"
                                ? "Quản lý giao dịch."
                                : "Transaction management."}
                            </li>
                          </ul>
                        </li>
                        <li>Deploy: Vercel.</li>
                        <li>Account demo: 0000000000, password: travFruit</li>
                      </ul>
                    </div>

                    <Suspense
                      fallback={
                        <div className="mx-auto text-lg w-fit h-fit py-1 px-3 text-white">
                          Loading slide...
                        </div>
                      }>
                      <LazySwiperSlideComponent
                        arrImg={TravFruitAdmin}
                        arrTechStack={TravfruitAdminTechnologies}
                        arrDeploy={TravFruitAdminDeploy}
                      />
                    </Suspense>
                  </div>

                  <div className="gap-10 flex flex-col">
                    <div className="gap-y-1 flex flex-col">
                      <p className="text-lg font-semibold autoShow">
                        3. BackEnd{" "}
                      </p>

                      <ul className="list-disc list-inside autoShow text-base lg:text-lg">
                        <li>
                          Build server: NodeJS(Express) & Database: MongoDB.
                        </li>
                        <li>
                          {lang != "en"
                            ? "Giới hạn request (rate-limit), gửi email xác thực (nodemailer)."
                            : "Rate-limit requests, send verification emails (nodemailer)."}
                        </li>
                        <li>
                          {lang != "en"
                            ? "Middleware: xác thực quyền truy cập từ token được đính kèm vào Headers."
                            : "Middleware: authenticates access from tokens attached to Headers."}
                        </li>
                        <li>
                          {lang != "en"
                            ? "Tự động xóa và hoàn vé vé nếu chưa thanh toán sau 15 phút."
                            : "Automatically delete and refund tickets if not paid after 15 minutes."}
                        </li>
                        <li>
                          {lang != "en"
                            ? "Cors: xác định domain nào được phép call API."
                            : "Cors: determines which domains are allowed to call the API."}
                        </li>
                        <li>
                          {lang != "en"
                            ? "Helmet: hạn chế rủi ro bị tấn công web."
                            : "Helmet: reduces the risk of web attacks."}
                        </li>
                        <li>Postman: test API.</li>
                      </ul>
                    </div>

                    <Suspense
                      fallback={
                        <div className="mx-auto text-lg w-fit h-fit py-1 px-3 text-white">
                          Loading slide...
                        </div>
                      }>
                      <LazySwiperSlideComponent
                        arrTechStack={TravfruitBackendTechnologies}
                      />
                    </Suspense>
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

                    <ul className="list-disc list-inside autoShow text-base lg:text-lg">
                      <li>
                        {lang != "en"
                          ? "CINEFRUIT là ứng dụng đặt vé xem phim được xây dựng bằng Framework Flutter(Dart)."
                          : "CINEFRUIT is a movie ticket booking application built using Flutter (Dart) Framework."}
                      </li>
                      <li>
                        {lang != "en"
                          ? "Sử dụng Figma để thiết kế UI cho ứng dụng."
                          : "Use Figma to design UI for apps."}
                      </li>

                      <li>
                        {lang != "en" ? "Chức năng: " : "Feature: "}
                        <ul className="list-disc list-inside ml-4">
                          <li>
                            {lang != "en"
                              ? "Tìm & xem danh sách phim."
                              : "Find & view movie lists."}
                          </li>
                          <li>
                            {lang != "en"
                              ? "Top 5 phim có đánh cao."
                              : "Top 5 movies with high ratings."}
                          </li>
                          <li>
                            {lang != "en"
                              ? "Danh sách rạp."
                              : "List of theaters."}
                          </li>
                          <li>
                            {lang != "en"
                              ? "Suất chiếu theo phim và rạp."
                              : "Showtimes by movie and theater."}
                          </li>
                          <li>
                            {lang != "en"
                              ? "Chọn vị trí ngồi và giữ ghế trong 15 phút."
                              : "Choose a seat and hold it for 15 minutes."}
                          </li>
                          <li>
                            {lang != "en"
                              ? "Chọn số lượng & xem danh sách thức ăn, đồ uống."
                              : "Select quantity & view food and beverage list."}
                          </li>
                          <li>
                            {lang != "en"
                              ? "Thanh toán trực tuyến: MoMo, Paypal."
                              : "Online payment: MoMo, Paypal."}
                          </li>
                          <li>
                            {lang != "en"
                              ? "Hủy & tiếp tục thanh toán."
                              : "Cancel & continue payment."}
                          </li>
                          <li>
                            {lang != "en"
                              ? "Giữ trạng thái đặt vé khi vào lại ứng dụng nếu còn thời gian."
                              : "Keep your booking status when you re-enter the app if there is still time."}
                          </li>
                          <li>
                            {lang != "en"
                              ? "Lưu token tại shared preferences giúp giữ trạng thái login."
                              : "Saving tokens in shared preferences helps maintain login state."}
                          </li>
                        </ul>
                      </li>
                      <li>
                        {lang != "en"
                          ? "Dio: là 1 HTTP Client để call API giống http nhưng dio hỗ trợ interceptor giúp gắn token vào headers,..."
                          : "Dio: is an HTTP Client to call API like http but dio supports interceptor to help attach token to headers,..."}
                      </li>
                      <li>
                        {lang != "en"
                          ? "GetX: quản lý route và truyền state, hỗ trợ snackbar, dialog,... mà không cần context."
                          : "GetX: route management and state transfer, support snackbar, dialog,... without context."}
                      </li>
                      <li>
                        {lang != "en"
                          ? "Riverpod: quản lý trạng thái, không cần truyền data giữa các widget."
                          : "Riverpod: state management, no need to pass data between widgets."}
                      </li>
                      <li>
                        {lang != "en"
                          ? "Webview: mở trình duyệt ngay trong app Flutter."
                          : "Webview: open the browser right in the Flutter app."}
                      </li>
                      <li>
                        Build server: NodeJS(Express) & Database: MongoDB.
                      </li>
                      <li>
                        {lang != "en"
                          ? "Tự động xóa trạng thái giữ ghế khi hết thời gian."
                          : "Automatically clear seat hold status when time expires."}
                      </li>
                      <li>
                        {lang != "en"
                          ? "Authentication: gửi mail xác thực, tạo và xác thực token(JWT)."
                          : "Authentication: send verification email, generate and authenticate token (JWT)."}
                      </li>
                      <li>Postman: test API.</li>
                      <li>
                        {lang != "en"
                          ? "Deploy: sử dụng AltServer & AltStore chạy ứng dụng trên điện thoại."
                          : "Deploy: use AltServer & AltStore to run the application on the phone."}
                      </li>
                    </ul>
                  </div>

                  <Suspense
                    fallback={
                      <div className="mx-auto text-lg w-fit h-fit py-1 px-3 text-white">
                        Loading slide...
                      </div>
                    }>
                    <LazySwiperSlideComponent
                      slideType="mobile"
                      arrImg={CineFruit}
                      arrTechStack={CineFruitTechnologies}
                      arrDeploy={CineFruitDeploy}
                    />
                  </Suspense>
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
