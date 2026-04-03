import { projectList } from "../projects";

export type projectImagesType = {
  name: projectList;
  typeShow: "gallery" | "preview";
};

export const getImages = (project: projectImagesType) => {
  return Object.entries(PathImages[project.name][project.typeShow]);
};

const PathImages = {
  internship_management: {
    preview: {
      login: "/dang_nhap.jpg",
      internship_registration: "/dang_ky_thuc_tap.jpg",
      distribute_students: "/chia_sinh_vien.jpg",
      create_assignment: "/tao_assignment.jpg",
    },
    gallery: {
      register: "/dang_ky.jpg",
      account_information: "/thong_tin_tai_khoan.jpg",
      open_internship_registration: "/mo_dang_ky_thuc_tap.jpg",
      update_internship_registration_period:
        "/cap_nhat_dot_dang_ky_thuc_tap.jpg",
      delete_registration_period: "/xoa_dot_dang_ky.jpg",
      internship_registration_history: "/lich_su_da_mo_dang_ky_thuc_tap.jpg",
      registered_student_list: "/danh_sach_sinh_vien_da_dang_ky.jpg",
      registered_student_details:
        "/thong_tin_sinh_vien_da_dang_ky_thuc_tap.jpg",
      assign_supervisor: "/phan_cong_giang_vien_huong_dan.jpg",
      assigned_instructor_list: "/danh_sach_giang_vien_da_phan_cong.jpg",
      send_request_to_instructor: "/gui_yeu_cau_den_giang_vien_huong_dan.jpg",
      student_internship_class: "/lop_thuc_tap_sinh_vien.jpg",
      internship_assignment_class: "/lop_thuc_tap_assignment.jpg",
      internship_assignment_student_view: "/home.jpg",
      instructor_info_student_view:
        "/lop_thuc_tap_thong_tin_giang_vien_role_sinh_vien.jpg",
      update_assignment: "/cap_nhat_assignment.jpg",
      delete_assignment: "/xoa_assignment.jpg",
      submit_assignment: "/nop_bai.jpg",
      submission_list: "/danh_sach_nop_bai.jpg",
      send_notification: "/gui_thong_bao.jpg",
    },
  },
  cinefruit: {
    preview: {
      home_page: "/home.jpg",
      movie_information_page: "/Thong_Tin_Phim.jpg",
      seat_selection_page: "/Chon_Ghe.jpg",
      payment_page: "/Thanh_Toan.jpg",
    },
    gallery: {
      cinema_list_page: "/Danh_Sach_Rap.jpg",
      showtimes_by_cinema_page: "/Suat_Chieu_Phim_Theo_Rap.jpg",
      ticket_history_page: "/Lich_Su_Ve.jpg",
      combo_list_page: "/Danh_Sach_Combo.jpg",
    },
  },
  travfruit: {
    preview: {
      home: "/home.jpg",
      enter_information: "/dien_thong_tin.jpg",
      payment: "/thanh_toan.jpg",
      flight_management: "/ds_chuyenbay_admin.jpg",
    },
    gallery: {
      ticket_history: "/lich_su_ve.jpg",
      account_management: "/quan_li_account.jpg",
      add_flight: "/them_cb.jpg",
      transaction_management: "/quan_li_giao_dich.jpg",
      mobile_ui: "/home_rd.jpg",
    },
  },
  writing: {
    preview: {
      account_registration_page: "/dang ki.jpg",
      home_page: "/home.jpg",
      writing_page: "/writing.jpg",
      email: "/email.jpg",
    },
    gallery: {
      account_registration_page: "/dang ki.jpg",
      home_page: "/home.jpg",
      writing_page: "/writing.jpg",
      email: "/email.jpg",
    },
  },
  grapfood: {
    preview: {
      home_page: "/home.jpg",
      dish_page: "/mon_an.jpg",
      eatery_page: "/quan_an.jpg",
      order_page: "/dat_mon.jpg",
    },
    gallery: {
      home_page: "/home.jpg",
      dish_page: "/mon_an.jpg",
      eatery_page: "/quan_an.jpg",
      order_page: "/dat_mon.jpg",
    },
  },
};
