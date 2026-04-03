import type { MetadataRoute } from "next";

const baseUrl = "https://portfolio-thanhlong.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/projects/grapfood",
    "/projects/writing",
    "/projects/travfruit",
    "/projects/cinefruit",
    "/projects/internship_management",
    "/skillstools",
    "/contact",
  ];

  const languages = ["en", "vi"];

  const sitemap: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    languages.forEach((lang) => {
      sitemap.push({
        url: `${baseUrl}/${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            [lang]: `${baseUrl}/${lang}${route}`,
          },
        },
      });
    });
  });

  return sitemap;
}
