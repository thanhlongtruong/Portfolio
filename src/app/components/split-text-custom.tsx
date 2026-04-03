import SplitText from "@/components/SplitText";

function SplitTextCustom({ text, index }: { text: string; index: number }) {
  const handleAnimationComplete = () => {};

  return (
    <SplitText
      text={text}
      index={index}
      className="text-2xl font-medium text-left py-5"
      delay={150}
      duration={1.8}
      ease="elastic.out(1,0.3)"
      splitType="words"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-100px"
      textAlign="left"
      onLetterAnimationComplete={handleAnimationComplete}
    />
  );
}

export default SplitTextCustom;
