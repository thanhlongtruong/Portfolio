import OnePagePortfolio from "@/app/components/portfolio/OnePagePortfolio";
import IntroductionSection from "@/app/components/sections/IntroductionSection";
import { getScrollModeCookie } from "../scroll-mode";

export default async function Page() {
  const modeScroll = await getScrollModeCookie();

  return modeScroll === "one-page" ? (
    <OnePagePortfolio mode={modeScroll} />
  ) : (
    <IntroductionSection />
  );
}
