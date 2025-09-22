import {
  PATH_ICONS_DATABASE,
  PATH_ICONS_FRAMEWORK,
  PATH_ICONS_HOSTING,
  PATH_ICONS_LANGUAGE,
  PATH_ICONS_LIBRARY,
  PATH_ICONS_SOFTWARE,
} from "./path_icons_skill";

const PATH_IMAGE = "/projects/writing/";

export const Writing = [
  {
    path: `${PATH_IMAGE}dang ki.jpg`,
    vi: "Dang ky",
    en: "Register",
  },
  {
    path: `${PATH_IMAGE}home.jpg`,
    vi: "Trang chu",
    en: "Home",
  },
  {
    path: `${PATH_IMAGE}writing.jpg`,
    vi: "Writing",
    en: "Writing",
  },
  {
    path: `${PATH_IMAGE}email.jpg`,
    vi: "Email",
    en: "Email",
  },
];

export const WritingDeploy = [
  {
    linkWeb: "https://english-writing-fruit-v1.vercel.app/",
    iconSrc: `${PATH_ICONS_HOSTING}vercel.svg`,
    iconName: "Vercel",
    content: "Visit website",
  },
  {
    linkWeb: "https://github.com/thanhlongtruong/English-Writing-AI",
    iconSrc: `${PATH_ICONS_SOFTWARE}github.svg`,
    iconName: "GitHub",
    content: "Github",
  },
];

export const WritingTechnologies = [
  {
    path: `${PATH_ICONS_SOFTWARE}vscode.svg`,
    name: "VS Code",
  },
  {
    path: "devtool/vitejs.svg",
    name: "Vite + React",
  },
  {
    path: `${PATH_ICONS_LANGUAGE}typescript.svg`,
    name: "TypeScript",
  },
  {
    path: `${PATH_ICONS_FRAMEWORK}tailwindcss.svg`,
    name: "Tailwind CSS",
  },
  {
    path: "",
    name: "Responsive design",
  },
];

export const BackendTechnologies = [
  {
    path: `${PATH_ICONS_FRAMEWORK}expressjs.svg`,
    name: "Express.js",
  },
  {
    path: `${PATH_ICONS_LANGUAGE}typescript.svg`,
    name: "TypeScript",
  },
  {
    path: "icons-ai/openai.svg",
    name: "OpenAI",
  },
  {
    path: `${PATH_ICONS_LIBRARY}jwt.svg`,
    name: "JWT",
  },
  {
    path: `${PATH_ICONS_DATABASE}mongodb.svg`,
    name: "MongoDB",
  },
  {
    path: `${PATH_ICONS_SOFTWARE}postman.svg`,
    name: "Postman",
  },
];
