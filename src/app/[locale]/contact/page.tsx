import { Metadata } from "next";
import ContactSection from "../../components/sections/ContactSection";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageAlternates } from "@/utils/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: `${t("title")}`,
    alternates: getPageAlternates(locale, "/contact"),
  };
}
export default function Page() {
  return <ContactSection />;
}
