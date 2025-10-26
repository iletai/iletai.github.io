import AnimatedCard from "@/components/motion/AnimatedCard";
import FadeInSection from "@/components/motion/FadeInSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MagicBackground from "@/components/ui/magic-background";
import { AnimatedGradientText, TextAnimate, TypingAnimation } from "@/components/ui/text-animate";

import { AppleCardsCarousel } from "@/components/ui/apple-cards-carousel";
import { CardStack, ExpandableCardStack } from "@/components/ui/card-stack";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { MagicNewsletter } from "@/components/ui/magic-newsletter";
import { blogService, projectsService } from "@/lib/api";
import type { BlogPost, Project } from "@/lib/api/types";
import { ArrowRight, Code, ExternalLink, Github, Palette, Rocket, Smartphone } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Le Quang Trong Tai - Full Stack Developer",
    description: "Specialized in developing modern web applications with React, Next.js and TypeScript. Passionate about creating valuable products and exceptional user experiences.",
};

// Data fetching functions
async function getFeaturedProjects(): Promise<Project[]> {
    try {
        const response = await projectsService.getFeaturedProjects(2);
        return response.data || [];
    } catch (error) {
        console.error('Failed to fetch featured projects:', error);
        // Fallback data for development
        return [
            {
                id: "1",
                title: "E-commerce Platform",
                description: "Full-stack e-commerce solution with React, Node.js and MongoDB",
                longDescription: "A comprehensive e-commerce platform built with modern technologies",
                technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
                liveUrl: "https://example.com",
                githubUrl: "https://github.com/example",
                featured: true,
                category: "Web Development",
                status: "completed",
                createdAt: "2024-01-15",
                updatedAt: "2024-01-15"
            },
            {
                id: "2",
                title: "Task Management App",
                description: "Task management application with real-time collaboration",
                longDescription: "A collaborative task management application with real-time features",
                technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
                liveUrl: "https://example.com",
                githubUrl: "https://github.com/example",
                featured: true,
                category: "Web Development",
                status: "completed",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            }
        ];
    }
}

async function getRecentBlogPosts(): Promise<BlogPost[]> {
    try {
        const response = await blogService.getBlogPosts({
            status: "published",
            limit: 2
        });
        return response.posts || [];
    } catch (error) {
        console.error('Failed to fetch recent blog posts:', error);
        // Fallback data for development
        return [
            {
                id: "1",
                slug: "getting-started-nextjs-15",
                title: "Getting Started with Next.js 15",
                excerpt: "Detailed guide to new features in Next.js 15",
                content: "Content here...",
                publishedAt: "2024-01-15",
                updatedAt: "2024-01-15",
                featured: false,
                readingTime: 5,
                status: "published",
                author: { id: "1", name: "Le Quang Trong Tai" },
                category: { id: "1", name: "Next.js", slug: "nextjs" },
                tags: [{ id: "1", name: "Next.js", slug: "nextjs" }]
            },
            {
                id: "2",
                slug: "react-server-components",
                title: "Understanding React Server Components",
                excerpt: "Deep dive into React Server Components and effective usage",
                content: "Content here...",
                publishedAt: "2024-01-10",
                updatedAt: "2024-01-10",
                featured: false,
                readingTime: 8,
                status: "published",
                author: { id: "1", name: "Le Quang Trong Tai" },
                category: { id: "2", name: "React", slug: "react" },
                tags: [{ id: "2", name: "React", slug: "react" }]
            }
        ];
    }
}

// Sample data for new components
const skillsData = [
    {
        id: "1",
        title: "Frontend Development",
        description: "Expert in user interface development with React, Next.js, TypeScript, and Tailwind CSS. Creating smooth, modern interactive web experiences with high performance and optimized SEO. From component design systems to performance optimization, every detail is carefully crafted to deliver the best user experience.",
        icon: <Code className="w-6 h-6" />,
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center",
    },
    {
        id: "2",
        title: "UI/UX Design",
        description: "Designing world-class user experiences with Figma, Adobe XD, and Framer. From research insights to wireframing, prototyping, and visual design - every step aims to create products that are not only beautiful but also solve real problems. Accessibility, usability, and emotional design are essential elements.",
        icon: <Palette className="w-6 h-6" />,
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center",
    },
    {
        id: "3",
        title: "Backend Development",
        description: "Building robust backend systems with Node.js, Python, and modern databases. From RESTful API design to microservices architecture, GraphQL integration, and cloud deployment. Security, scalability, and monitoring are top priorities in every project, ensuring systems run reliably 24/7.",
        icon: <Rocket className="w-6 h-6" />,
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&crop=center",
    },
    {
        id: "4",
        title: "iOS Development",
        description: "Creating native iOS applications with SwiftUI and Swift. Building intuitive, performant mobile experiences that leverage iOS-specific features and design guidelines. From Core Data integration to push notifications, App Store optimization, and seamless user interfaces that follow Apple's Human Interface Guidelines.",
        icon: <Smartphone className="w-6 h-6" />,
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center",
    },
];

const testimonialsData = [
    {
        id: "1",
        quote: "Working with him is an amazing experience. Clean code and on-time delivery.",
        name: "John Anderson",
        title: "Product Manager at TechCorp",
        rating: 5,
    },
    {
        id: "2",
        quote: "Excellent frontend skills, deep understanding of UX/UI and always provides creative solutions.",
        name: "Sarah Wilson",
        title: "Senior Designer at StartupXYZ",
        rating: 5,
    },
    {
        id: "3",
        quote: "Professional, reliable, and learns incredibly fast. Highly recommended!",
        name: "Michael Chen",
        title: "CTO at GlobalTech",
        rating: 5,
    },
];

export default async function HomePage() {
    const [featuredProjects, recentPosts] = await Promise.all([
        getFeaturedProjects(),
        getRecentBlogPosts()
    ]);

    return (
        <MagicBackground variant="combined" intensity="high">
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <FadeInSection>
                            <div className="text-center">
                                <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                    <TextAnimate animationType="word" animation="slideUp">
                                        Hello, I&apos;m
                                    </TextAnimate>{" "}
                                    <AnimatedGradientText className="text-4xl sm:text-6xl font-bold">
                                        LE QUANG TRONG TAI
                                    </AnimatedGradientText>
                                </h1>
                                <TypingAnimation
                                    className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                                    duration={50}
                                    startDelay={1000}
                                >
                                    Specialized in developing modern web applications with React, Next.js and TypeScript.
                                    Passionate about creating valuable products and exceptional user experiences.
                                </TypingAnimation>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                                        <Link href="/projects">
                                            View Projects
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg">
                                        <Link href="/contact">
                                            Contact
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
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Some recent projects I have worked on
                                </p>
                            </div>
                        </FadeInSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {featuredProjects.map((project, index) => (
                                <AnimatedCard key={project.id} index={index}>
                                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                                        <Image
                                            src={project.image || "/api/placeholder/800/600"}
                                            alt={project.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
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
                                        View All Projects
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
                                    Featured Projects
                                </TextAnimate>
                                <p className="text-lg text-gray-300">
                                    Explore projects I&apos;ve built with modern technologies
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
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <FadeInSection>
                            <div className="text-center mb-12">
                                <AnimatedGradientText className="text-3xl font-bold mb-4">
                                    Professional Skills
                                </AnimatedGradientText>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Technologies and skills I use daily
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
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <FadeInSection>
                            <div className="text-center mb-12">
                                <TextAnimate
                                    animationType="character"
                                    animation="blurIn"
                                    className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                                >
                                    What Clients Say
                                </TextAnimate>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Feedback from those who have worked with me
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

                {/* Newsletter Subscription */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        <FadeInSection>
                            <MagicNewsletter
                                variant="portfolio"
                                firstName="Tai"
                            />
                        </FadeInSection>
                    </div>
                </section>

                {/* Recent Blog Posts */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <FadeInSection>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Recent Blog Posts</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Sharing programming knowledge and experience
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
                                                {new Date(post.publishedAt).toLocaleDateString("en-US")}
                                            </time>
                                            <span>{post.readingTime} min read</span>
                                        </div>
                                    </CardContent>
                                </AnimatedCard>
                            ))}
                        </div>

                        <FadeInSection delay={0.4}>
                            <div className="text-center">
                                <Button variant="link" asChild className="text-blue-600 hover:text-blue-800 font-semibold">
                                    <Link href="/blog">
                                        View All Posts
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </FadeInSection>
                    </div>
                </section>
            </div>
        </MagicBackground>
    );
}
