import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import SkillsToolsSection from "@/app/components/sections/SkillsToolsSection";

type Params = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Skills&Tools",
  });
  return {
    title: "Skills & Tools",
    description: t("description"),
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
