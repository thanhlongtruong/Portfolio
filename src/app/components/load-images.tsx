"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

export default function LoadImages() {
  const d = useTranslations();
  return (
    <Button disabled size="sm">
      <Spinner data-icon="inline-start" />
      {d("LoadingImages")}
    </Button>
  );
}
