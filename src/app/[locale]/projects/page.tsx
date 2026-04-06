import { getTranslations } from "next-intl/server";
import ProjectsPage from "./ProjectsPage";
import { Metadata } from "next";

type Params = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "ProjectsPage",
  });
  return {
    title: `${t("title")}`,
    description: t("description"),
  };
}

export default function Page() {
  return <ProjectsPage />;
}
