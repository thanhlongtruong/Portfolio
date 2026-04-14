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
      const fullUrl = `${baseUrl}/${lang}${route}`;

      sitemap.push({
        url: fullUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            vi: `${baseUrl}/vi${route}`,
          },
        },
      });
    });
  });

  return sitemap;
}
