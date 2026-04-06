import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import SkillsToolsPage from "./SkillsToolsPage";

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

export default function Page() {
  return <SkillsToolsPage />;
}
