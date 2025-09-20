import {
  PATH_ICONS_DATABASE,
  PATH_ICONS_DESIGN,
  PATH_ICONS_FRAMEWORK,
  PATH_ICONS_LANGUAGE,
  PATH_ICONS_LIBRARY,
  PATH_ICONS_SOFTWARE,
} from "./path_icons_skill";

const PATH_IMAGE_CINEFRUIT = "/projects/cinefruit/";


export const CineFruit = [
  {
    path: `${PATH_IMAGE_CINEFRUIT}Chon_Ghe.jpg`,
    vi: "Chon ghe",
    en: "Select seat",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}Danh_Sach_Combo.jpg`,
    vi: "Danh sach Combo",
    en: "Combo list",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}Danh_Sach_Rap.jpg`,
    vi: "Danh sach rap",
    en: "Theater list",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}Lich_Su_Ve.jpg`,
    vi: "Lich su ve",
    en: "Ticket history",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}Phim_Hot.jpg`,
    vi: "Phim hot",
    en: "Hot movies",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}Suat_Chieu_Phim_Theo_Rap.jpg`,
    vi: "Suat chieu",
    en: "Showtime",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}Thanh_Toan.jpg`,
    vi: "Thanh toan",
    en: "Payment",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}Thong_Tin_Phim.jpg`,
    vi: "Thong tin phim",
    en: "Movie information",
  },
];

export const CineFruitTechnologies = [
  {
    path: `${PATH_ICONS_SOFTWARE}vscode.svg`,
    name: "VS Code",
  },
  {
    path: `${PATH_ICONS_FRAMEWORK}flutter.svg`,
    name: "Flutter",
  },
  {
    path: `${PATH_ICONS_LANGUAGE}dart.svg`,
    name: "Dart",
  },
  {
    path: `${PATH_ICONS_FRAMEWORK}expressjs.svg`,
    name: "Express.js",
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
    link: "https://www.getpostman.com/",
  },
];

export const CineFruitDeploy = [
  {
    linkWeb:
      "https://www.figma.com/design/kbXqz4aedVBh7FknIAquoJ/App-dat-ve-xem-phim---CineFruit?node-id=0-1&t=1FfdUidmf1A5n0VV-1",
    iconSrc: `${PATH_ICONS_DESIGN}figma.svg`,
    iconName: "Figma",
    content: "Visit Figma",
  },
  {
    linkWeb: "https://youtu.be/tnN4lSVfiu0",
    iconSrc: "icons-social/youtube.svg",
    iconName: "Youtube",
    content: "Youtube",
  },
  {
    linkWeb: "https://github.com/thanhlongtruong/cinefruit",
    iconSrc: `${PATH_ICONS_SOFTWARE}github.svg`,
    iconName: "Github",
    content: "Github",
  },
];
