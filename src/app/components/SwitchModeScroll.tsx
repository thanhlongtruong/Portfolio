"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { switchScrollMode } from "../utils/switch-scroll-mode";

function SwitchModeScroll({ modeScroll }: { modeScroll: ModeScroll }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isModeScroll, setModeScroll] = useState<ModeScroll>(modeScroll);
  const [isPending, startTransition] = useTransition();

  const handleCheckedChange = (value: boolean) => {
    const mode: ModeScroll = value ? "one-page" : "multi-page";
    setModeScroll(mode);
    startTransition(async () => {
      await switchScrollMode({
        mode,
        pathname,
        router,
      });
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="scroll-mode">One Page</Label>
      <Switch
        id="scroll-mode"
        checked={isModeScroll === "one-page"}
        onCheckedChange={handleCheckedChange}
        disabled={isPending}
      />
    </div>
  );
}

export default SwitchModeScroll;
