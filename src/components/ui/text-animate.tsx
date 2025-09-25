"use client";

import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

interface TextAnimateProps {
  children: string;
  className?: string;
  animationType?: "character" | "word" | "line";
  animation?: "slideUp" | "slideDown" | "blurIn" | "fadeIn" | "scaleIn";
  delay?: number;
}

const animationConfigs = {
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  slideDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  blurIn: {
    initial: { filter: "blur(10px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
};

export function TextAnimate({
  children,
  className = "",
  animationType = "character",
  animation = "slideUp",
  delay = 0,
}: TextAnimateProps) {
  const [scope, animate] = useAnimate();
  const config = animationConfigs[animation];

  useEffect(() => {
    let elements: NodeListOf<Element>;

    if (animationType === "character") {
      elements = scope.current?.querySelectorAll(".char") || [];
    } else if (animationType === "word") {
      elements = scope.current?.querySelectorAll(".word") || [];
    } else {
      elements = scope.current?.querySelectorAll(".line") || [];
    }

    animate(
      elements,
      config.animate,
      {
        duration: 0.5,
        delay: stagger(0.05, { startDelay: delay }),
        ease: "easeOut",
      }
    );
  }, [scope, animate, config, delay, animationType]);

  const splitText = () => {
    if (animationType === "character") {
      return children.split("").map((char, i) => (
        <motion.span
          key={i}
          className="char inline-block"
          initial={config.initial}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    } else if (animationType === "word") {
      return children.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="word inline-block mr-2"
          initial={config.initial}
        >
          {word}
        </motion.span>
      ));
    } else {
      return (
        <motion.span
          className="line inline-block"
          initial={config.initial}
        >
          {children}
        </motion.span>
      );
    }
  };

  return (
    <div ref={scope} className={className}>
      {splitText()}
    </div>
  );
}

// Typing Animation Component
interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  startDelay?: number;
}

export function TypingAnimation({
  children,
  className = "",
  duration = 100,
  startDelay = 0,
}: TypingAnimationProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const chars = scope.current?.querySelectorAll(".typing-char");
      if (chars) {
        animate(
          chars,
          { opacity: 1 },
          {
            duration: 0,
            delay: stagger(duration / 1000),
          }
        );
      }
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [scope, animate, duration, startDelay]);

  return (
    <div ref={scope} className={className}>
      {children.split("").map((char, i) => (
        <span
          key={i}
          className="typing-char opacity-0"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

// Gradient Text Component
interface AnimatedGradientTextProps {
  children: string;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className = "",
}: AnimatedGradientTextProps) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-size-200 ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.div>
  );
}
