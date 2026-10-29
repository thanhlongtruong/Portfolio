import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import SkillsToolsSection from "@/app/components/sections/SkillsToolsSection";
import { getPageAlternates } from "@/utils/metadata";

type Params = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "Skills&Tools",
  });


  return {
    title: "Skills & Tools",
    description: t("description"),
    alternates: getPageAlternates(locale, "/skillstools"),
  };
}

export default async function Page({ params }: Params) {
  const { locale } = await params;

  const trans = await getTranslations({
    locale,
    namespace: "Skills&Tools",
  });

  return <SkillsToolsSection t={trans} />;
}
