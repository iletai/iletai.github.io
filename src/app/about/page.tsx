'use client';

import AnimatedCard from "@/components/motion/AnimatedCard";
import FadeInSection from "@/components/motion/FadeInSection";
import PageTransition from "@/components/motion/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MagicBackground from "@/components/ui/magic-background";
import { AnimatedGradientText, TextAnimate, TypingAnimation } from "@/components/ui/text-animate";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Award,
    Compass,
    HeartHandshake,
    Lightbulb,
    Sparkles,
    Workflow
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
    {
        label: "Years Experience",
        value: "07+",
        description: "Cross-platform development from mobile native to enterprise web platforms"
    },
    {
        label: "Apps Published",
        value: "15+",
        description: "iOS apps, game titles, and web platforms serving millions of users"
    },
    {
        label: "Performance Optimization",
        value: "<200ms",
        description: "Average response time on mobile and web through optimized architecture"
    },
    {
        label: "App Store Rating",
        value: "4.8★",
        description: "Average rating for published iOS applications"
    },
    {
        label: "AAA Game Development",
        value: "Asphalt 8",
        description: "Contributed to AAA racing game with millions of downloads at Gameloft"
    }
] as const;

const journey = [
    {
        year: "2024",
        role: "Full Stack Engineer",
        company: "FPT Software",
        description:
            "Leading team in building AI-first platforms with micro-frontend architecture, optimized for development velocity and runtime performance.",
        stack: ["Next.js", "Turborepo", "TailwindCSS", "GraphQL", "React", "NestJS", "PostgreSQL", "AWS"]
    },
    {
        year: "2020-2024",
        role: "Senior iOS Developer",
        company: "FPT Software",
        description:
            "Developed high-quality native iOS applications for international markets, from music players to healthcare and luxury watch trading platforms. Specialized in SwiftUI, Combine, and MVVM architecture.",
        stack: ["Swift", "SwiftUI", "Combine", "HealthKit", "CoreData", "AVFoundation"]
    },
    {
        year: "2018-2020",
        role: "Game Developer",
        company: "Gameloft",
        description:
            "Programmed RPG games using C++, participated in developing mobile game titles with millions of downloads. Optimized performance and player experience across multiple platforms.",
        stack: ["C++", "Game Engine", "Mobile Optimization", "Cross-platform"]
    }
] as const;

const values = [
    {
        icon: <Lightbulb className="h-6 w-6 text-amber-500" aria-hidden="true" />,
        title: "Insight-Driven Design",
        description:
            "Every feature starts with user problems. I prioritize roadmaps based on data, qualitative interviews, and continuous experimentation."
    },
    {
        icon: <Workflow className="h-6 w-6 text-sky-500" aria-hidden="true" />,
        title: "Sustainable Processes",
        description:
            "Building CI/CD pipelines, coding standards, and design systems that enable teams to develop fast while maintaining quality."
    },
    {
        icon: <HeartHandshake className="h-6 w-6 text-rose-500" aria-hidden="true" />,
        title: "Transparent Collaboration",
        description:
            "Prioritizing clear communication, quick feedback, and proactively proposing better solutions for products."
    },
    {
        icon: <Compass className="h-6 w-6 text-emerald-500" aria-hidden="true" />,
        title: "Adaptability",
        description:
            "Staying updated with new technologies, conducting controlled experiments, and choosing solutions that best fit the business context."
    }
] as const;

const toolbelt = [
    {
        title: "Frontend & Web",
        items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook"]
    },
    {
        title: "Mobile & Native",
        items: ["Swift", "SwiftUI", "Combine", "HealthKit", "CoreData", "AVFoundation", "Xamarin"]
    },
    {
        title: "Backend & Cloud",
        items: ["Node.js", "NestJS", "FastAPI", "NoSQL", "PostgreSQL", "PlanetScale", "AWS", "Azure"]
    },
    {
        title: "Dev Experience",
        items: ["Turborepo", "Nx", "Vite", "Vitest", "Playwright", "GitHub Actions", "Fastlane"]
    },
    {
        title: "Product & Design",
        items: ["Figma", "Framer", "Notion", "Linear", "Hotjar", "Amplitude"]
    },
    {
        title: "Game & Graphics",
        items: ["C++", "C#", "Game Engine", "Core Graphics", "Metal", "Performance Optimization", "Cross-platform"]
    }
] as const;

export default function AboutPage() {
    return (
        <MagicBackground variant="combined" intensity="medium">
            <PageTransition>
                <main className="relative min-h-screen pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
                    <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" aria-hidden="true" />

                    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:gap-16 sm:px-6 md:gap-20 lg:px-8">
                        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
                            <FadeInSection>
                                <div className="max-w-full overflow-hidden">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <AnimatedGradientText className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
                                            About
                                        </AnimatedGradientText>
                                    </motion.div>
                                    <motion.h1
                                        className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <TextAnimate animationType="word" animation="slideUp">
                                            Crafting sophisticated and sustainable digital experiences
                                        </TextAnimate>
                                    </motion.h1>
                                    <motion.div
                                        className="mt-4 sm:mt-6 w-full overflow-hidden"
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <TypingAnimation
                                            className="text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg sm:leading-relaxed break-words hyphens-auto max-w-full pr-4"
                                            duration={55}
                                            startDelay={1000}
                                        >
                                            I&apos;m Le Quang Trong Tai – a versatile engineer with experience ranging from mobile native (iOS/Swift) to modern web platforms. From game development with C++ to healthcare apps with SwiftUI,
                                            I&apos;m passionate about creating digital products that positively impact users&apos; lives.
                                        </TypingAnimation>
                                    </motion.div>
                                    <motion.div
                                        className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                                                <Link href="/projects">
                                                    Explore Projects
                                                    <motion.div
                                                        animate={{ x: [0, 3, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                    >
                                                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                                                    </motion.div>
                                                </Link>
                                            </Button>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <Button asChild variant="outline" size="lg" className="transition-all duration-200 shadow-md hover:shadow-lg">
                                                <Link href="/contact">
                                                    Get In Touch
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.2}>
                                <motion.div
                                    className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-1 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/80 sm:max-w-md lg:max-w-sm"
                                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                    whileHover={{
                                        scale: 1.02,
                                        y: -5,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                >
                                    <motion.div
                                        className="relative h-80 w-full overflow-hidden rounded-[1.35rem] sm:h-96"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <Image
                                            src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=1000&fit=crop&crop=entropy"
                                            alt="Creative workspace with natural lighting"
                                            fill
                                            className="object-cover transition-transform duration-500"
                                            priority
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                                            initial={{ opacity: 0.5 }}
                                            whileHover={{ opacity: 0.3 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="mt-4 space-y-3 px-4 pb-5 sm:px-5 sm:pb-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <motion.p
                                            className="text-sm font-semibold text-blue-600 transition-colors dark:text-blue-300 sm:text-base"
                                            whileHover={{ scale: 1.02, x: 3 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            iOS Developer / Fullstack Engineer
                                        </motion.p>
                                        <motion.p
                                            className="text-sm leading-relaxed text-gray-600 transition-colors dark:text-gray-300 sm:text-base sm:leading-relaxed"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 1.2 }}
                                        >
                                            Specializing in mobile native, web platforms, and game development with focus on UX and performance.
                                        </motion.p>
                                    </motion.div>
                                </motion.div>
                            </FadeInSection>
                        </section>

                        <section aria-labelledby="about-stats">
                            <FadeInSection>
                                <div className="text-center">
                                    <h2
                                        id="about-stats"
                                        className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
                                    >
                                        <AnimatedGradientText>
                                            Numbers That Speak
                                        </AnimatedGradientText>
                                    </h2>
                                    <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                                        These metrics are compiled from recent projects and real client evaluations.
                                    </p>
                                </div>
                                <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: index * 0.15,
                                                ease: [0.4, 0, 0.2, 1],
                                                type: "spring",
                                                stiffness: 200
                                            }}
                                            whileHover={{
                                                scale: 1.05,
                                                y: -8,
                                                rotateY: 5,
                                                transition: { duration: 0.2, ease: "easeOut" }
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <AnimatedCard key={stat.label} index={index} className="h-full transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 dark:border-white/10 shadow-xl">
                                                <CardHeader className="pb-2 sm:pb-3">
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{
                                                            duration: 0.5,
                                                            delay: index * 0.15 + 0.3,
                                                            type: "spring",
                                                            stiffness: 300
                                                        }}
                                                    >
                                                        <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400 sm:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                            {stat.value}
                                                        </CardTitle>
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{
                                                            duration: 0.4,
                                                            delay: index * 0.15 + 0.5
                                                        }}
                                                    >
                                                        <CardDescription className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
                                                            {stat.label}
                                                        </CardDescription>
                                                    </motion.div>
                                                </CardHeader>
                                                <CardContent className="pt-0">
                                                    <motion.p
                                                        className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            duration: 0.4,
                                                            delay: index * 0.15 + 0.7
                                                        }}
                                                    >
                                                        {stat.description}
                                                    </motion.p>
                                                </CardContent>
                                            </AnimatedCard>
                                        </motion.div>
                                    ))}
                                </div>
                            </FadeInSection>
                        </section>

                        <section aria-labelledby="about-journey" className="grid gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                            <FadeInSection direction="right" className="space-y-3 sm:space-y-4">
                                <h2
                                    id="about-journey"
                                    className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
                                >
                                    <AnimatedGradientText>
                                        Development Journey
                                    </AnimatedGradientText>
                                </h2>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base sm:leading-relaxed">
                                    I believe that creating great products starts with deep user connections, transforming insights into scalable and measurable solutions.
                                </p>
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 sm:px-4 sm:py-2 sm:text-sm">
                                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                                    Continuous Discovery & Delivery
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.1}>
                                <ol className="relative space-y-6 border-l border-blue-100 pl-4 dark:border-blue-900/40 sm:space-y-8 sm:pl-6">
                                    {journey.map((item) => (
                                        <li key={`${item.year}-${item.company}`} className="ml-2 sm:ml-4">
                                            <div className="absolute -left-[7px] h-3 w-3 rounded-full border-2 border-white bg-blue-500 dark:border-slate-900 sm:-left-[9px] sm:h-4 sm:w-4" aria-hidden="true" />
                                            <div className="rounded-2xl border border-gray-100/70 bg-white/80 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:scale-[1.01] dark:border-white/10 dark:bg-slate-900/70 sm:p-6">
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300 sm:text-sm">
                                                        {item.year}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
                                                        <Award className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                                                        {item.company}
                                                    </div>
                                                </div>
                                                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white sm:mt-3 sm:text-xl">
                                                    {item.role}
                                                </h3>
                                                <p className="mt-1.5 text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-2 sm:text-sm sm:leading-relaxed">
                                                    {item.description}
                                                </p>
                                                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2" aria-label="Featured Technologies">
                                                    {item.stack.map((tech) => (
                                                        <Badge key={tech} variant="secondary" className="text-xs sm:text-sm">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </FadeInSection>
                        </section>

                        <section aria-labelledby="about-values">
                            <FadeInSection>
                                <div className="text-center">
                                    <h2
                                        id="about-values"
                                        className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
                                    >
                                        <AnimatedGradientText>
                                            Guiding Values
                                        </AnimatedGradientText>
                                    </h2>
                                    <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                                        Four principles that help me maintain quality across all projects – from discovery to delivery.
                                    </p>
                                </div>
                                <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
                                    {values.map((value, index) => (
                                        <AnimatedCard key={value.title} index={index} className="h-full transition-all duration-300 hover:scale-[1.02]">
                                            <CardHeader className="flex flex-row items-start gap-3 sm:gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10 sm:h-12 sm:w-12">
                                                    {value.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                                                        {value.title}
                                                    </CardTitle>
                                                    <CardDescription className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-2 sm:text-sm sm:leading-relaxed">
                                                        {value.description}
                                                    </CardDescription>
                                                </div>
                                            </CardHeader>
                                        </AnimatedCard>
                                    ))}
                                </div>
                            </FadeInSection>
                        </section>

                        <section aria-labelledby="about-toolkit" className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
                            <FadeInSection direction="left" className="space-y-3 sm:space-y-4">
                                <h2
                                    id="about-toolkit"
                                    className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
                                >
                                    <AnimatedGradientText>
                                        Favorite Toolkit
                                    </AnimatedGradientText>
                                </h2>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base sm:leading-relaxed">
                                    I combine the best tools to ensure a complete lifecycle: from ideation and design to development, testing, operations, and measuring effectiveness.
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-blue-700 dark:text-blue-300 sm:gap-3 sm:text-sm">
                                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                                    Design Systems
                                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                                    Performance SLOs
                                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                                    Developer Experience
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.15}>
                                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                                    {toolbelt.map((group) => (
                                        <div key={group.title} className="rounded-2xl border border-gray-100/70 bg-white/80 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:scale-[1.01] dark:border-white/10 dark:bg-slate-900/70 sm:p-6">
                                            <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                                                {group.title}
                                            </h3>
                                            <ul className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-300 sm:mt-4 sm:space-y-2 sm:text-sm">
                                                {group.items.map((item) => (
                                                    <li key={item} className="flex items-center gap-2">
                                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </FadeInSection>
                        </section>

                        <section aria-labelledby="about-cta" className="overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 shadow-lg dark:border-blue-500/20 dark:from-slate-900 dark:via-slate-900/70 dark:to-blue-950 sm:p-8 lg:p-10">
                            <FadeInSection>
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                                    <div className="flex-1">
                                        <AnimatedGradientText className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
                                            Let&apos;s collaborate
                                        </AnimatedGradientText>
                                        <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white sm:mt-4 sm:text-3xl">
                                            Ready to partner with you to elevate your product to new heights
                                        </h2>
                                        <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-300 sm:mt-3 sm:text-base">
                                            From initial concept to scaling up, I can support you with product strategy, technical architecture, and user experience.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                                            <Link href="/contact">
                                                Schedule a consultation
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg" className="transition-all duration-200">
                                            <Link href="/projects">
                                                View portfolio
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </FadeInSection>
                        </section>
                    </div>
                </main>
            </PageTransition>
        </MagicBackground>
    );
}
