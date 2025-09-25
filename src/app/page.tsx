import AnimatedCard from "@/components/motion/AnimatedCard";
import FadeInSection from "@/components/motion/FadeInSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedGradientText, TextAnimate, TypingAnimation } from "@/components/ui/text-animate";

import { AppleCardsCarousel } from "@/components/ui/apple-cards-carousel";
import { CardStack, ExpandableCardStack } from "@/components/ui/card-stack";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ArrowRight, Code, ExternalLink, Github, Palette, Rocket } from "lucide-react";
import Link from "next/link";

// Temporary static data - will be replaced with API calls
const featuredProjects = [
    {
        id: "1",
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution với React, Node.js và MongoDB",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "/images/projects/ecommerce.jpg",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
    },
    {
        id: "2",
        title: "Task Management App",
        description: "Ứng dụng quản lý công việc với real-time collaboration",
        technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
        image: "/images/projects/taskapp.jpg",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
    },
];

const recentPosts = [
    {
        slug: "getting-started-nextjs-15",
        title: "Getting Started with Next.js 15",
        excerpt: "Hướng dẫn chi tiết về những tính năng mới trong Next.js 15",
        publishedAt: "2024-01-15",
        readingTime: 5,
    },
    {
        slug: "react-server-components",
        title: "Understanding React Server Components",
        excerpt: "Deep dive vào React Server Components và cách sử dụng hiệu quả",
        publishedAt: "2024-01-10",
        readingTime: 8,
    },
];

// Sample data for new components
const skillsData = [
    {
        id: "1",
        title: "Frontend Development",
        description: "React, Next.js, TypeScript, Tailwind CSS. Tạo ra giao diện người dùng hiện đại, responsive và có trải nghiệm tuyệt vời.",
        icon: <Code className="w-6 h-6" />,
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
        id: "2",
        title: "UI/UX Design",
        description: "Figma, Adobe XD, Framer. Thiết kế giao diện đẹp mắt, tối ưu trải nghiệm người dùng và dễ sử dụng.",
        icon: <Palette className="w-6 h-6" />,
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
        id: "3",
        title: "Backend Development",
        description: "Node.js, Python, Database design. Xây dựng API mạnh mẽ, bảo mật và có khả năng mở rộng cao.",
        icon: <Rocket className="w-6 h-6" />,
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
];

const testimonialsData = [
    {
        id: "1",
        quote: "Làm việc cùng anh ấy là một trải nghiệm tuyệt vời. Code rất clean và delivery đúng thời gian.",
        name: "Nguyễn Văn A",
        title: "Product Manager tại TechCorp",
        rating: 5,
    },
    {
        id: "2",
        quote: "Kỹ năng frontend xuất sắc, hiểu rõ về UX/UI và luôn đưa ra những giải pháp sáng tạo.",
        name: "Trần Thị B",
        title: "Senior Designer tại StartupXYZ",
        rating: 5,
    },
    {
        id: "3",
        quote: "Professional, reliable và có khả năng học hỏi rất nhanh. Highly recommended!",
        name: "John Smith",
        title: "CTO tại GlobalTech",
        rating: 5,
    },
];

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
                <div className="max-w-7xl mx-auto">
                    <FadeInSection>
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                <TextAnimate animationType="word" animation="slideUp">
                                    Xin chào, tôi là
                                </TextAnimate>{" "}
                                <AnimatedGradientText className="text-4xl sm:text-6xl font-bold">
                                    LÊ QUANG TRỌNG TÀI
                                </AnimatedGradientText>
                            </h1>
                            <TypingAnimation
                                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                                duration={50}
                                startDelay={1000}
                            >
                                Chuyên phát triển ứng dụng web hiện đại với React, Next.js và TypeScript.
                                Đam mê tạo ra những sản phẩm có giá trị và trải nghiệm người dùng tuyệt vời.
                            </TypingAnimation>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    <Link href="/projects">
                                        Xem dự án
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link href="/contact">
                                        Liên hệ
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dự án nổi bật</h2>
                            <p className="text-lg text-gray-600">
                                Một số dự án gần đây mà tôi đã thực hiện
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {featuredProjects.map((project, index) => (
                            <AnimatedCard key={project.id} index={index}>
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">Project Image</span>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-900">
                                        {project.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <Badge key={tech} variant="secondary">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        {project.liveUrl && (
                                            <Button variant="link" size="sm" asChild className="p-0 h-auto text-blue-600">
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <ExternalLink className="h-4 w-4 mr-1" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button variant="link" size="sm" asChild className="p-0 h-auto text-gray-600">
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Github className="h-4 w-4 mr-1" />
                                                    Source Code
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </AnimatedCard>
                        ))}
                    </div>

                    <FadeInSection delay={0.4}>
                        <div className="text-center">
                            <Button variant="link" asChild className="text-blue-600 hover:text-blue-800 font-semibold">
                                <Link href="/projects">
                                    Xem tất cả dự án
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* Apple Cards Carousel for Projects */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <TextAnimate
                                animationType="word"
                                animation="slideUp"
                                className="text-3xl font-bold mb-4"
                            >
                                Dự án nổi bật
                            </TextAnimate>
                            <p className="text-lg text-gray-300">
                                Khám phá những dự án được tôi thực hiện với công nghệ hiện đại
                            </p>
                        </div>
                    </FadeInSection>

                    <AppleCardsCarousel items={featuredProjects.map(project => ({
                        category: project.technologies[0],
                        title: project.title,
                        src: project.image || "/api/placeholder/600/400",
                        content: <p className="text-neutral-600 text-base md:text-lg font-normal max-w-3xl mx-auto">
                            {project.description}
                        </p>
                    }))} />
                </div>
            </section>

            {/* Skills Card Stack */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-indigo-900">
                <div className="max-w-7xl mx-auto">
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <AnimatedGradientText className="text-3xl font-bold mb-4">
                                Kỹ năng chuyên môn
                            </AnimatedGradientText>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Những công nghệ và kỹ năng tôi sử dụng hàng ngày
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <ExpandableCardStack items={skillsData} />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative h-96">
                                <CardStack items={skillsData} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <TextAnimate
                                animationType="character"
                                animation="blurIn"
                                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                            >
                                Khách hàng nói gì
                            </TextAnimate>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Phản hồi từ những người đã làm việc cùng tôi
                            </p>
                        </div>
                    </FadeInSection>

                    <InfiniteMovingCards
                        items={testimonialsData}
                        direction="left"
                        speed="slow"
                        className="mb-8"
                    />
                </div>
            </section>

            {/* Recent Blog Posts */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog gần đây</h2>
                            <p className="text-lg text-gray-600">
                                Chia sẻ kiến thức và kinh nghiệm lập trình
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {recentPosts.map((post, index) => (
                            <AnimatedCard key={post.slug} index={index}>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-900">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="hover:text-blue-600 transition-colors"
                                        >
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <time dateTime={post.publishedAt}>
                                            {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                                        </time>
                                        <span>{post.readingTime} phút đọc</span>
                                    </div>
                                </CardContent>
                            </AnimatedCard>
                        ))}
                    </div>

                    <FadeInSection delay={0.4}>
                        <div className="text-center">
                            <Button variant="link" asChild className="text-blue-600 hover:text-blue-800 font-semibold">
                                <Link href="/blog">
                                    Xem tất cả bài viết
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </FadeInSection>
                </div>
            </section>
        </div>
    );
}
