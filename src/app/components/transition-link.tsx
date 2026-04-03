"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { ComponentProps, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props extends ComponentProps<typeof Link> {
  back?: boolean;
}

gsap.registerPlugin(useGSAP);

const TransitionLink = ({
  children,
  href,
  back = false,
  onClick,
  ...props
}: Props) => {
  const router = useRouter();

  const { contextSafe } = useGSAP(() => {});

  const handleClick = contextSafe(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      // if (e.defaultPrevented) return;
      e.preventDefault();

      const tl = gsap.timeline({
        onComplete: () => {
          onClick?.(e);
          if (back) router.back();
          else if (href) router.push(href.toString());
        },
      });

      tl.to(".bar", {
        yPercent: -100,
        duration: 0.6,
        ease: "power4.inOut",
        stagger: 0.05,
      });
    }
  );

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
