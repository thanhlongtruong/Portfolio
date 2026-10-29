import OnePagePortfolio from "@/app/components/portfolio/OnePagePortfolio";
import IntroductionSection from "@/app/components/sections/IntroductionSection";
import { getScrollModeCookie } from "../scroll-mode";
import { getPageAlternates } from "@/utils/metadata";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    alternates: getPageAlternates(locale),
  };
}

export default async function Page() {
  const modeScroll = await getScrollModeCookie();

  return modeScroll === "one-page" ? (
    <OnePagePortfolio mode={modeScroll} />
  ) : (
    <IntroductionSection />
  );
}
