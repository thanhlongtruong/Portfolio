"use client";

import {
  useScroll,
  motion,
  useTransform,
  MotionValue,
  TransformInputRange,
  useSpring,
} from "motion/react";
import React, { useRef } from "react";

function Paragraph({ value }: { value: string }) {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = value.split(" ");

  return (
    <p
      className={`lg:text-lg text-base flex flex-wrap max-w-[1280px] text-stone-200`}
      ref={element}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({
  children,
  range,
  progress,
}: {
  children: string;
  range: TransformInputRange;
  progress: MotionValue<number>;
}) => {
  const characters = children.split("");
  const amount = range[1] - range[0];
  const step = amount / children.length;
  return (
    <span className="mr-3 relative">
      {characters.map((character, i) => {
        const start = range[0] + step * i;
        const end = range[0] + step * (i + 1);

        return (
          <Character key={i} range={[start, end]} progress={progress} index={i}>
            {character}
          </Character>
        );
      })}
    </span>
  );
};

const Character = ({
  children,
  range,
  progress,
  index,
}: {
  children: string;
  range: TransformInputRange;
  progress: MotionValue<number>;
  index: number;
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const spring = useSpring(opacity, { stiffness: 100, damping: 20 });
  return (
    <span>
      <span className="opacity-10 absolute">{children}</span>
      <motion.span
        style={{ opacity: spring }}
        transition={{ duration: 0.05, delay: index * 0.05 }}>
        {children}
      </motion.span>
    </span>
  );
};
export default Paragraph;
