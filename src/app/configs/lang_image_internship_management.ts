import {
  PATH_ICONS_DATABASE,
  PATH_ICONS_DESIGN,
  PATH_ICONS_FRAMEWORK,
  PATH_ICONS_HOSTING,
  PATH_ICONS_LANGUAGE,
  PATH_ICONS_LIBRARY,
  PATH_ICONS_SOFTWARE,
} from "./path_icons_skill";

const PATH_IMAGE_CINEFRUIT = "/projects/internship_management/";

export const InternshipManagement = [
  {
    path: `${PATH_IMAGE_CINEFRUIT}dang_nhap.png`,
    vi: "Đăng nhập",
    en: "Login",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}dang_ky.png`,
    vi: "Đăng ký",
    en: "Register",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}thong_tin_tai_khoan.png`,
    vi: "Thông tin tài khoản",
    en: "Account information",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}mo_dang_ky_thuc_tap.png`,
    vi: "Mở đăng ký thực tập",
    en: "Open internship registration",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}cap_nhat_dot_dang_ky_thuc_tap.png`,
    vi: "Cập nhật đợt đăng ký thực tập",
    en: "Update internship registration period",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}xoa_dot_dang_ky.png`,
    vi: "Xóa đợt đăng ký",
    en: "Delete registration period",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}lich_su_da_mo_dang_ky_thuc_tap.png`,
    vi: "Lịch sử đã mở đăng ký thực tập",
    en: "History of opened internship registrations",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}dang_ky_thuc_tap.png`,
    vi: "Đăng ký thực tập",
    en: "Register for internship",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}danh_sach_sinh_vien_da_dang_ky.png`,
    vi: "Danh sách sinh viên đã đăng ký",
    en: "List of registered students",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}thong_tin_sinh_vien_da_dang_ky_thuc_tap.png`,
    vi: "Thông tin sinh viên đã đăng ký thực tập",
    en: "Information of students registered for internship",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}chia_sinh_vien.png`,
    vi: "Chia sinh viên",
    en: "Divide students",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}phan_cong_giang_vien_huong_dan.png`,
    vi: "Phân công giảng viên hướng dẫn",
    en: "Assign instructor",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}danh_sach_giang_vien_da_phan_cong.png`,
    vi: "Danh sách giảng viên đã phân công",
    en: "List of assigned instructors",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}gui_yeu_cau_den_giang_vien_huong_dan.png`,
    vi: "Gửi yêu cầu đến giảng viên hướng dẫn",
    en: "Send request to instructor",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}lop_thuc_tap_sinh_vien.png`,
    vi: "Lớp thực tập sinh viên",
    en: "Student internship class",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}lop_thuc_tap_assignment.png`,
    vi: "Lớp thực tập assignment",
    en: "Internship class assignment",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}lop_thuc_tap_assignment_role_sinh_vien.png`,
    vi: "Lớp thực tập assignment role sinh viên",
    en: "Internship class assignment student role",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}lop_thuc_tap_thong_tin_giang_vien_role_sinh_vien.png`,
    vi: "Lớp thực tập thông tin giảng viên role sinh viên",
    en: "Internship class instructor information student role",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}tao_assignment.png`,
    vi: "Tạo assignment",
    en: "Create assignment",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}cap_nhat_assignment.png`,
    vi: "Cập nhật assignment",
    en: "Update assignment",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}xoa_assignment.png`,
    vi: "Xóa assignment",
    en: "Delete assignment",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}nop_bai.png`,
    vi: "Nộp bài",
    en: "Submit assignment",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}danh_sach_nop_bai.png`,
    vi: "Danh sách nộp bài",
    en: "List of submitted assignments",
  },
  {
    path: `${PATH_IMAGE_CINEFRUIT}gui_thong_bao.png`,
    vi: "Gửi thông báo",
    en: "Send notification",
  },
];

export const InternshipManagementTechnologies = [
  {
    path: `${PATH_ICONS_SOFTWARE}vscode.svg`,
    name: "VS Code",
  },
  {
    path: `${PATH_ICONS_LANGUAGE}typescript.svg`,
    name: "TypeScript",
  },
  {
    path: `${PATH_ICONS_FRAMEWORK}nextjs.svg`,
    name: "Next.js",
  },
  {
    path: `${PATH_ICONS_LIBRARY}shadcn-ui.svg`,
    name: "Shadcn UI",
  },
  {
    path: "",
    name: "Edge Store",
  },
  {
    path: `${PATH_ICONS_LIBRARY}jwt.svg`,
    name: "JWT",
  },
  {
    path: `${PATH_ICONS_DATABASE}mongodb.svg`,
    name: "MongoDB",
  },
];

export const InternshipManagementDeploy = [
  {
    linkWeb: "https://internship-management-five.vercel.app/login",
    iconSrc: `${PATH_ICONS_HOSTING}vercel.svg`,
    iconName: "Vercel",
    content: "Visit website",
  },
  {
    linkWeb: "https://github.com/thanhlongtruong/internship-management",
    iconSrc: `${PATH_ICONS_SOFTWARE}github.svg`,
    iconName: "Github",
    content: "Github",
  },
];
