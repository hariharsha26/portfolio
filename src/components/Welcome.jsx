import { useRef, useEffect } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 }
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => {
    return (
      <span
        key={i}
        className={`${className} inline-block`}
        style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    );
  });
};

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: defaultWeight } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      fontVariationSettings: `"wght" ${weight}`,
      duration,
      ease: "power2.out"
    });
  };

  const handleMouseMove = (e) => {
    letters.forEach((letter) => {
      const { left, width } = letter.getBoundingClientRect();
      const letterCenter = left + width / 2;

      const distance = Math.abs(e.clientX - letterCenter);
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, defaultWeight);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    setupTextHover(titleRef.current, "title");
    setupTextHover(subtitleRef.current, "subtitle");
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef} className="whitespace-nowrap flex justify-center">
        {renderText(
          "Hey, I'm Harsha Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>

      <h1 ref={titleRef} className="mt-7 whitespace-nowrap flex justify-center">
        {renderText("Portfolio", "text-7xl sm:text-9xl italic font-georama")}
      </h1>
    </section>
  );
};

export default Welcome;