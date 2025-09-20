import {
  PATH_ICONS_DATABASE,
  PATH_ICONS_FRAMEWORK,
  PATH_ICONS_HOSTING,
  PATH_ICONS_LANGUAGE,
  PATH_ICONS_LIBRARY,
  PATH_ICONS_SOFTWARE,
} from "./path_icons_skill";

const PATH_IMAGE_TRAVFRUIT = "/projects/travfruit/";
const PATH_IMAGE_TRAVFRUIT_ADMIN = "/projects/travfruit_admin/";

export const TravFruit = [
  {
    path: `${PATH_IMAGE_TRAVFRUIT}home.jpg`,
    vi: "Trang chu",
    en: "Home",
  },
  {
    path: `${PATH_IMAGE_TRAVFRUIT}ds_chuyenbay.jpg`,
    vi: "Danh sach chuyen bay",
    en: "Flight list",
  },
  {
    path: `${PATH_IMAGE_TRAVFRUIT}dien_thong_tin.jpg`,
    vi: "Nhap thong tin",
    en: "Enter information",
  },
  {
    path: `${PATH_IMAGE_TRAVFRUIT}thanh_toan.jpg`,
    vi: "Thanh toan",
    en: "Payment",
  },
  {
    path: `${PATH_IMAGE_TRAVFRUIT}lich_su_ve_chua_thanh_toan.jpg`,
    vi: "Lich su ve",
    en: "Ticket history",
  },
  {
    path: `${PATH_IMAGE_TRAVFRUIT}chua_thanh_toan_khi_chon_chuyenbay_khac.jpg`,
    vi: "Kiem tra trang thai",
    en: "Check flight selection",
  },
];

export const TravFruitDeploy = [
  {
    linkWeb: "https://travfruitv4.vercel.app/",
    iconSrc: `${PATH_ICONS_HOSTING}vercel.svg`,
    iconName: "Vercel",
    content: "Visit website",
  },
  {
    linkWeb: "https://github.com/thanhlongtruong/travFruit/tree/travFruit.v4",
    iconSrc: `${PATH_ICONS_SOFTWARE}github.svg`,
    iconName: "GitHub",
    content: "Github",
  },
];

export const TravfruitTechnologies = [
  {
    path: `${PATH_ICONS_SOFTWARE}vscode.svg`,
    name: "VS Code",
  },
  {
    path: `${PATH_ICONS_LIBRARY}react.svg`,
    name: "ReactJS",
  },
  {
    path: `${PATH_ICONS_LANGUAGE}javascript.svg`,
    name: "Javascript",
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

export const TravFruitAdmin = [
  {
    path: `${PATH_IMAGE_TRAVFRUIT_ADMIN}quan_li_account.jpg`,
    vi: "Quan ly tai khoan",
    en: "Account Management",
  },
  {
    path: `${PATH_IMAGE_TRAVFRUIT_ADMIN}ds_chuyenbay.jpg`,
    vi: "Quan ly chuyen bay",
    en: "Flight Management",
  },
  {
    path: `${PATH_IMAGE_TRAVFRUIT_ADMIN}them_cb.jpg`,
    vi: "Them chuyen bay",
    en: "Add Flight",
  },
  {
    path: `${PATH_IMAGE_TRAVFRUIT_ADMIN}tao_cb_3m.jpg`,
    vi: "Tao chuyen bay cho 3 thang",
    en: "Create Flights for 3 months",
  },
  {
    path: `${PATH_IMAGE_TRAVFRUIT_ADMIN}quan_li_giao_dich.jpg`,
    vi: "Quan ly giao dich",
    en: "Transaction Management",
  },
];

export const TravfruitAdminTechnologies = [
  {
    path: `${PATH_ICONS_SOFTWARE}vscode.svg`,
    name: "VS Code",
  },
  {
    path: "devtool/vitejs.svg",
    name: "Vite + React",
  },
  {
    path: `${PATH_ICONS_LANGUAGE}javascript.svg`,
    name: "Javascript",
  },
  {
    path: `${PATH_ICONS_FRAMEWORK}tailwindcss.svg`,
    name: "Tailwind CSS",
  },
];

export const TravFruitAdminDeploy = [
  {
    linkWeb: "https://travfruitv3admin.vercel.app/",
    iconSrc: `${PATH_ICONS_HOSTING}vercel.svg`,
    iconName: "Vercel",
    content: "Visit website",
  },
  {
    linkWeb: "https://github.com/thanhlongtruong/travFruit/tree/travFruit.v4",
    iconSrc: `${PATH_ICONS_SOFTWARE}github.svg`,
    iconName: "GitHub",
    content: "Github",
  },
];

export const TravfruitBackendTechnologies = [
  {
    path: `${PATH_ICONS_FRAMEWORK}expressjs.svg`,
    name: "Express.js",
  },
  {
    path: `${PATH_ICONS_LANGUAGE}javascript.svg`,
    name: "Javascript",
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
    path: `${PATH_ICONS_LIBRARY}dotenv.svg`,
    name: "dotenv",
  },
  {
    path: `${PATH_ICONS_SOFTWARE}postman.svg`,
    name: "Postman",
  },
];
