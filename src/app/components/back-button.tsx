"use client";

import { ArrowLeftIcon } from "lucide-react";
import TransitionLink from "./transition-link";

type Props = {
  path: string;
  back: string;
};

export default function BackButton(props: Props) {
  return (
    <TransitionLink
      href={props.path}
      className="h-fit w-fit flex items-center gap-1 transition duration-500 ease-out hover:underline hover:decoration-2 hover:underline-offset-2 hover:decoration-main">
      <ArrowLeftIcon /> {props.back}
    </TransitionLink>
  );
}
