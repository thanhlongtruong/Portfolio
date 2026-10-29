import BtnNavigatePage from "@/app/components/btn-navigatepage";
import { useTranslations } from "next-intl"; import { getPageAlternates } from "@/utils/metadata";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  setRequestLocale(locale);

  return {
    alternates: getPageAlternates(locale, "/experience"),
  };
}


export default function ExperiencePage() {
  const d = useTranslations("ExperiencePage");
  return (
    <section className="min-h-dvh flex flex-col gap-y-10">
      <h1 className="topic">{d("title")}</h1>

      <p className="text-center pt-10 text-xl">{d("updating")}</p>

      <BtnNavigatePage />
    </section>
  );
}
