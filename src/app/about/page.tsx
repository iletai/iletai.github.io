import AnimatedCard from "@/components/motion/AnimatedCard";
import FadeInSection from "@/components/motion/FadeInSection";
import PageTransition from "@/components/motion/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MagicBackground from "@/components/ui/magic-background";
import { AnimatedGradientText, TextAnimate, TypingAnimation } from "@/components/ui/text-animate";
import {
    ArrowRight,
    Award,
    Compass,
    HeartHandshake,
    Lightbulb,
    Sparkles,
    Workflow
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About | Lê Quang Trọng Tài",
    description:
        "Khám phá hành trình, triết lý và giá trị cốt lõi trong công việc phát triển sản phẩm số của Lê Quang Trọng Tài."
};

const stats = [
    {
        label: "Năm kinh nghiệm",
        value: "07+",
        description: "Phát triển sản phẩm cho startup và enterprise với yêu cầu khắt khe"
    },
    {
        label: "Dự án hoàn thành",
        value: "45+",
        description: "Từ MVP tốc độ cao đến nền tảng quy mô hàng triệu người dùng"
    },
    {
        label: "Tối ưu hiệu suất",
        value: "<200ms",
        description: "Thời gian phản hồi trung bình nhờ kiến trúc hiện đại và caching thông minh"
    },
    {
        label: "Độ hài lòng",
        value: "98%",
        description: "Điểm NPS từ khách hàng và đối tác trong 3 năm gần nhất"
    }
] as const;

const journey = [
    {
        year: "2024",
        role: "Lead Frontend Engineer",
        company: "VisionAI Platform",
        description:
            "Dẫn dắt team xây dựng platform AI-first với kiến trúc micro-frontend, tối ưu cho tốc độ phát triển và hiệu suất runtime.",
        stack: ["Next.js", "Turborepo", "TailwindCSS", "GraphQL"]
    },
    {
        year: "2022",
        role: "Senior Fullstack Developer",
        company: "FintechNova",
        description:
            "Thiết kế hệ thống onboarding đa quốc gia với i18n, security compliance và trải nghiệm người dùng đột phá.",
        stack: ["React", "NestJS", "PostgreSQL", "AWS"]
    },
    {
        year: "2020",
        role: "Product Engineer",
        company: "HealthTech Labs",
        description:
            "Triển khai nền tảng telemedicine real-time, đảm bảo tuân thủ HIPAA và khả năng mở rộng gấp đôi lượng người dùng.",
        stack: ["Next.js", "WebRTC", "Redis", "Kubernetes"]
    }
] as const;

const values = [
    {
        icon: <Lightbulb className="h-6 w-6 text-amber-500" aria-hidden="true" />,
        title: "Thiết kế dẫn đầu bởi insight",
        description:
            "Mọi tính năng đều bắt đầu từ bài toán của người dùng. Tôi sắp xếp roadmap dựa trên data, phỏng vấn định tính và thử nghiệm liên tục."
    },
    {
        icon: <Workflow className="h-6 w-6 text-sky-500" aria-hidden="true" />,
        title: "Quy trình bền vững",
        description:
            "Xây dựng pipeline CI/CD, coding standard và design system giúp team phát triển nhanh nhưng vẫn dễ bảo trì."
    },
    {
        icon: <HeartHandshake className="h-6 w-6 text-rose-500" aria-hidden="true" />,
        title: "Hợp tác minh bạch",
        description:
            "Ưu tiên giao tiếp rõ ràng, phản hồi nhanh chóng và luôn chủ động đề xuất giải pháp tốt hơn cho sản phẩm."
    },
    {
        icon: <Compass className="h-6 w-6 text-emerald-500" aria-hidden="true" />,
        title: "Khả năng thích ứng",
        description:
            "Luôn cập nhật công nghệ mới, thử nghiệm có kiểm soát và chọn giải pháp phù hợp nhất với bối cảnh doanh nghiệp."
    }
] as const;

const toolbelt = [
    {
        title: "Frontend",
        items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook"]
    },
    {
        title: "Backend & Cloud",
        items: ["Node.js", "NestJS", "FastAPI", "PostgreSQL", "PlanetScale", "AWS", "Azure"]
    },
    {
        title: "Dev Experience",
        items: ["Turborepo", "Nx", "Vite", "Vitest", "Playwright", "GitHub Actions", "Sentry"]
    },
    {
        title: "Product & Design",
        items: ["Figma", "Framer", "Notion", "Linear", "Hotjar", "Amplitude"]
    }
] as const;

export default function AboutPage() {
    return (
        <MagicBackground variant="combined" intensity="medium">
            <PageTransition>
                <main className="relative min-h-screen py-16 sm:py-24">
                    <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" aria-hidden="true" />

                    <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 sm:px-6 lg:px-8">
                        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                            <FadeInSection>
                                <div>
                                    <AnimatedGradientText className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                                        About
                                    </AnimatedGradientText>
                                    <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                                        <TextAnimate animationType="word" animation="slideUp">
                                            Kiến tạo trải nghiệm số tinh tế và bền vững
                                        </TextAnimate>
                                    </h1>
                                    <TypingAnimation
                                        className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
                                        duration={55}
                                        startDelay={600}
                                    >
                                        Tôi là Lê Quang Trọng Tài – một product engineer yêu thích việc kết hợp nghệ thuật thiết kế với sức mạnh của công nghệ. Mission của tôi là giúp doanh nghiệp tạo ra sản phẩm số mang lại giá trị dài hạn cho người dùng.
                                    </TypingAnimation>
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                                            <Link href="/projects">
                                                Khám phá dự án
                                                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg">
                                            <Link href="/contact">
                                                Kết nối cùng tôi
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.2}>
                                <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-1 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
                                    <div className="relative h-80 w-full overflow-hidden rounded-[1.35rem]">
                                        <Image
                                            src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=1000&fit=crop&crop=entropy"
                                            alt="Không gian làm việc sáng tạo với ánh sáng tự nhiên"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                    <div className="mt-4 space-y-2 px-4 pb-4">
                                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                                            Product Engineer / Experience Crafter
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Tập trung vào hiệu suất, accessibility và storytelling cho mọi sản phẩm.
                                        </p>
                                    </div>
                                </div>
                            </FadeInSection>
                        </section>

                        <section aria-labelledby="about-stats">
                            <FadeInSection>
                                <div className="text-center">
                                    <h2
                                        id="about-stats"
                                        className="text-3xl font-bold text-gray-900 dark:text-white"
                                    >
                                        <AnimatedGradientText>
                                            Những con số biết nói
                                        </AnimatedGradientText>
                                    </h2>
                                    <p className="mt-3 max-w-2xl text-center text-base text-gray-600 dark:text-gray-300">
                                        Những chỉ số dưới đây được tổng hợp từ các dự án gần đây và đánh giá thực tế từ khách hàng.
                                    </p>
                                </div>
                                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {stats.map((stat, index) => (
                                        <AnimatedCard key={stat.label} index={index} className="h-full">
                                            <CardHeader>
                                                <CardTitle className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                                                    {stat.value}
                                                </CardTitle>
                                                <CardDescription className="text-base font-semibold text-gray-900 dark:text-white">
                                                    {stat.label}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {stat.description}
                                                </p>
                                            </CardContent>
                                        </AnimatedCard>
                                    ))}
                                </div>
                            </FadeInSection>
                        </section>

                        <section aria-labelledby="about-journey" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                            <FadeInSection direction="right" className="space-y-4">
                                <h2
                                    id="about-journey"
                                    className="text-3xl font-bold text-gray-900 dark:text-white"
                                >
                                    <AnimatedGradientText>
                                        Hành trình phát triển
                                    </AnimatedGradientText>
                                </h2>
                                <p className="text-base text-gray-600 dark:text-gray-300">
                                    Tôi luôn tin rằng hành trình tạo ra sản phẩm tốt bắt đầu từ việc kết nối sâu sắc với người dùng, chuyển hóa insight thành giải pháp có thể mở rộng và đo lường được.
                                </p>
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                                    Continuous Discovery & Delivery
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.1}>
                                <ol className="relative space-y-8 border-l border-blue-100 pl-6 dark:border-blue-900/40">
                                    {journey.map((item) => (
                                        <li key={`${item.year}-${item.company}`} className="ml-4">
                                            <div className="absolute -left-[9px] h-4 w-4 rounded-full border-2 border-white bg-blue-500 dark:border-slate-900" aria-hidden="true" />
                                            <div className="rounded-2xl border border-gray-100/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">
                                                        {item.year}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <Award className="h-4 w-4" aria-hidden="true" />
                                                        {item.company}
                                                    </div>
                                                </div>
                                                <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
                                                    {item.role}
                                                </h3>
                                                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                                    {item.description}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-2" aria-label="Công nghệ tiêu biểu">
                                                    {item.stack.map((tech) => (
                                                        <Badge key={tech} variant="secondary">
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
                                        className="text-3xl font-bold text-gray-900 dark:text-white"
                                    >
                                        <AnimatedGradientText>
                                            Giá trị dẫn đường
                                        </AnimatedGradientText>
                                    </h2>
                                    <p className="mt-3 max-w-2xl text-center text-base text-gray-600 dark:text-gray-300">
                                        Bốn nguyên tắc giúp tôi giữ vững chất lượng trong mọi dự án – từ discovery đến delivery.
                                    </p>
                                </div>
                                <div className="mt-10 grid gap-6 md:grid-cols-2">
                                    {values.map((value, index) => (
                                        <AnimatedCard key={value.title} index={index} className="h-full">
                                            <CardHeader className="flex flex-row items-start gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
                                                    {value.icon}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        {value.title}
                                                    </CardTitle>
                                                    <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                                                        {value.description}
                                                    </CardDescription>
                                                </div>
                                            </CardHeader>
                                        </AnimatedCard>
                                    ))}
                                </div>
                            </FadeInSection>
                        </section>

                        <section aria-labelledby="about-toolkit" className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
                            <FadeInSection direction="left" className="space-y-4">
                                <h2
                                    id="about-toolkit"
                                    className="text-3xl font-bold text-gray-900 dark:text-white"
                                >
                                    <AnimatedGradientText>
                                        Bộ công cụ ưa thích
                                    </AnimatedGradientText>
                                </h2>
                                <p className="text-base text-gray-600 dark:text-gray-300">
                                    Tôi kết hợp các công cụ tốt nhất để đảm bảo lifecycle khép kín: từ lên ý tưởng, thiết kế, phát triển, test đến vận hành và đo lường hiệu quả.
                                </p>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-blue-700 dark:text-blue-300">
                                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                                    Design Systems
                                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                                    Performance SLOs
                                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                                    Developer Experience
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.15}>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {toolbelt.map((group) => (
                                        <div key={group.title} className="rounded-2xl border border-gray-100/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {group.title}
                                            </h3>
                                            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
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

                        <section aria-labelledby="about-cta" className="overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-10 shadow-lg dark:border-blue-500/20 dark:from-slate-900 dark:via-slate-900/70 dark:to-blue-950">
                            <FadeInSection>
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <AnimatedGradientText className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                                            Let&apos;s collaborate
                                        </AnimatedGradientText>
                                        <h2 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">
                                            Sẵn sàng đồng hành để đưa sản phẩm của bạn lên một tầm cao mới
                                        </h2>
                                        <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">
                                            Từ ý tưởng đầu tiên đến quá trình scale-up, tôi có thể hỗ trợ bạn về chiến lược sản phẩm, kiến trúc kỹ thuật và trải nghiệm người dùng.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                                            <Link href="/contact">
                                                Đặt lịch trao đổi
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg">
                                            <Link href="/projects">
                                                Xem portfolio
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
