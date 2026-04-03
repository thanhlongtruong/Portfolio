import BtnNavigatePage from "@/app/components/btn-navigatepage";
import { useTranslations } from "next-intl";

export default function ExperiencePage() {
  const d = useTranslations("ExperiencePage");
  return (
    <>
      <h1 className="topic">{d("title")}</h1>

      <p className="text-center pt-10 text-xl">{d("updating")}</p>

      <BtnNavigatePage />
    </>
  );
}
