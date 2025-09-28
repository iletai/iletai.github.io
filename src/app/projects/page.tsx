'use client';

import AnimatedCard from '@/components/motion/AnimatedCard';
import FadeInSection from '@/components/motion/FadeInSection';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MagicBackground from '@/components/ui/magic-background';
import { useProjects } from '@/hooks/useApi';
import { Project } from '@/lib/types';
import { AlertCircle, ArrowLeft, ExternalLink, Github, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Static data - API integration ready but backend not implemented yet
const projects = [
    {
        id: "1",
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution với React, Node.js và MongoDB. Hỗ trợ thanh toán Stripe, quản lý inventory và user authentication.",
        longDescription: "Một nền tảng thương mại điện tử hoàn chỉnh được xây dựng với React cho frontend và Node.js cho backend. Ứng dụng hỗ trợ đầy đủ các tính năng từ quản lý sản phẩm, giỏ hàng, thanh toán đến quản lý đơn hàng.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
        featured: true,
        category: "fullstack",
    },
    {
        id: "2",
        title: "Task Management App",
        description: "Ứng dụng quản lý công việc với real-time collaboration sử dụng WebSocket và Prisma ORM.",
        longDescription: "Ứng dụng quản lý tác vụ hiện đại với khả năng cộng tác theo thời gian thực. Người dùng có thể tạo project, assign tasks, track progress và communicate với team members.",
        technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
        featured: true,
        category: "fullstack",
    },
    {
        id: "3",
        title: "Weather Dashboard",
        description: "Dashboard hiển thị thông tin thời tiết với charts và forecasting sử dụng OpenWeather API.",
        longDescription: "Dashboard thời tiết với giao diện đẹp mắt, hiển thị thông tin thời tiết hiện tại và dự báo 7 ngày. Tích hợp charts để visualize temperature trends và precipitation data.",
        technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop&crop=center",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
        featured: false,
        category: "frontend",
    },
    {
        id: "4",
        title: "Blog API",
        description: "RESTful API cho blog platform với authentication, CRUD operations và file upload.",
        longDescription: "RESTful API được xây dựng với Node.js và Express, cung cấp đầy đủ endpoints cho blog platform. Hỗ trợ user authentication, CRUD operations cho posts và comments, file upload cho images.",
        technologies: ["Node.js", "Express", "MongoDB", "JWT", "Multer"],
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop&crop=center",
        githubUrl: "https://github.com/example",
        featured: false,
        category: "backend",
    },
];

const categories = [
    { id: "all", label: "Tất cả" },
    { id: "fullstack", label: "Full-stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
];

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    // API calls
    const { data: allProjects, loading, error } = useProjects();

    // Handle API data structure - the API returns data.projects, not data.data
    const apiProjects = allProjects?.data as Record<string, unknown>;
    const projectsData = (apiProjects?.projects as Project[]) || (apiProjects?.data as Project[]) || projects;

    // Filter projects by category
    const filteredProjects = selectedCategory === "all"
        ? projectsData
        : projectsData.filter((project) => (project as Project).category === selectedCategory);
    return (
        <MagicBackground variant="combined" intensity="medium" className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <FadeInSection className="mb-12">
                    <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Về trang chủ
                    </Link>

                    {/* API Status Notice */}
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-green-600 mr-2" />
                            <span className="text-green-800 font-medium">
                                {allProjects && apiProjects ? 'API Connected ✅' : 'API Integration Active'}
                            </span>
                        </div>
                        <p className="text-green-700 text-sm mt-1">
                            {allProjects && apiProjects
                                ? `Đang hiển thị dữ liệu từ backend API. Tìm thấy ${projectsData.length} projects.`
                                : 'Projects API đã tích hợp. Fallback data được sử dụng khi API không khả dụng.'
                            }
                        </p>
                    </div>

                    <h1 className="text-4xl font-bold mb-4">
                        <AnimatedGradientText className="text-4xl font-bold">
                            Dự án của tôi
                        </AnimatedGradientText>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        Tổng hợp các dự án mà tôi đã thực hiện, từ ứng dụng web full-stack đến
                        các API backend và frontend components. Mỗi dự án đều được build với
                        công nghệ hiện đại và best practices.
                    </p>
                </FadeInSection>

                {/* Category Filter */}
                <FadeInSection direction="up" delay={0.2} className="mb-8">
                    <div className="flex flex-wrap gap-4">
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                className="px-4 py-2"
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.label}
                            </Button>
                        ))}
                    </div>
                </FadeInSection>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <span className="ml-2 text-lg">Đang tải projects...</span>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-red-900 mb-2">Lỗi khi tải dữ liệu</h3>
                            <p className="text-red-700 mb-4">{error}</p>
                            <p className="text-sm text-red-600">Đang hiển thị dữ liệu tĩnh thay thế.</p>
                        </div>
                    </div>
                )}

                {/* Projects Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <AnimatedCard key={project.id} className="h-full flex flex-col" index={index}>
                                {/* Project Image */}
                                <div className="h-48 relative overflow-hidden rounded-t-lg">
                                    <Image
                                        src={project.image || '/placeholder-project.jpg'}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                <CardHeader>
                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <Badge variant="secondary" className="mb-2 w-fit">
                                            Featured
                                        </Badge>
                                    )}

                                    <CardTitle className="text-xl">
                                        {project.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <p className="text-muted-foreground mb-4 line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="outline"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <Badge variant="outline">
                                                    +{project.technologies.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        {project.liveUrl && (
                                            <Button variant="outline" size="sm" asChild>
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button variant="outline" size="sm" asChild>
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Github className="h-4 w-4 mr-2" />
                                                    Code
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </AnimatedCard>
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                <FadeInSection direction="up" delay={0.4} className="mt-16 text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Quan tâm đến dự án của tôi?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Hãy liên hệ để thảo luận về dự án tiếp theo của bạn
                    </p>
                    <Button asChild size="lg">
                        <Link href="/contact">
                            Liên hệ ngay
                        </Link>
                    </Button>
                </FadeInSection>
            </div>
        </MagicBackground>
    );
}
