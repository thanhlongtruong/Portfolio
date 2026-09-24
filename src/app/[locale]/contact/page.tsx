import { Metadata } from "next";
import ContactSection from "../../components/sections/ContactSection";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: `${t("title")}`,
  };
}
export default function Page() {
  return <ContactSection />;
}
