import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Truong Thanh Long Portfolio",
    short_name: "Truong Thanh Long",
    description:
      "Portfolio of Truong Thanh Long - Software Engineer specializing in Next.js, Flutter, Node.js.",
    id: "/en",
    start_url: "/en",
    display: "standalone",
    background_color: "#F54927",
    theme_color: "#fff",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
        label: "Desktop view of Portfolio",
      },
      {
        src: "/screenshots/mobile.png",
        sizes: "390x844",
        type: "image/png",
        label: "Mobile view of Portfolio",
      },
    ],
  };
}
