import AnimatedCard from '@/components/motion/AnimatedCard';
import FadeInSection from '@/components/motion/FadeInSection';
import PageTransition from '@/components/motion/PageTransition';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MagicBackground from '@/components/ui/magic-background';
import { projectsService } from '@/lib/api';
import { Project } from '@/lib/types';
import { ExternalLink, Github } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Projects | Le Quang Trong Tai",
    description: "A collection of projects including full-stack web applications, mobile apps, and software solutions."
};

// Get projects data with fallback
async function getProjectsData(): Promise<Project[]> {
    try {
        const response = await projectsService.getProjects();
        // Map API Project to local Project interface, ensuring required fields
        const apiProjects = response.data.data || [];
        return apiProjects.map(project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            longDescription: project.longDescription,
            technologies: project.technologies,
            image: project.image || '/api/placeholder/600/400',
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            featured: project.featured ?? false,
            category: project.category,
            status: project.status,
            startDate: project.startDate || new Date().toISOString().split('T')[0],
            endDate: project.endDate
        }));
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        // Return fallback data with proper Project interface
        return [
            {
                id: "1",
                title: "E-commerce Platform",
                description: "Full-stack e-commerce solution with React, Node.js and MongoDB. Supports Stripe payments, inventory management and user authentication.",
                longDescription: "A complete e-commerce platform built with React for frontend and Node.js for backend. The application supports full features from product management, shopping cart, payment to order management.",
                technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT"],
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
                liveUrl: "https://example.com",
                githubUrl: "https://github.com/example",
                featured: true,
                category: "fullstack",
                status: "completed" as const,
                startDate: "2024-01-01",
                endDate: "2024-03-01"
            },
            {
                id: "2",
                title: "Task Management App",
                description: "Task management application with real-time collaboration using WebSocket and Prisma ORM.",
                longDescription: "Modern task management application with real-time collaboration capabilities. Users can create projects, assign tasks, track progress and communicate with team members.",
                technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket", "PostgreSQL"],
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
                liveUrl: "https://example.com",
                githubUrl: "https://github.com/example",
                featured: true,
                category: "fullstack",
                status: "completed" as const,
                startDate: "2024-02-01",
                endDate: "2024-04-01"
            },
            {
                id: "3",
                title: "Weather Dashboard",
                description: "Weather information dashboard with charts and forecasting using OpenWeather API.",
                longDescription: "Beautiful weather dashboard displaying current weather information and 7-day forecast. Integrated charts to visualize temperature trends and precipitation data.",
                technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
                image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop&crop=center",
                liveUrl: "https://example.com",
                githubUrl: "https://github.com/example",
                featured: false,
                category: "frontend",
                status: "completed" as const,
                startDate: "2023-11-01",
                endDate: "2023-12-01"
            }
        ];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjectsData();

    return (
        <PageTransition>
            <MagicBackground variant="combined" intensity="medium">
                <main className="relative min-h-screen pt-32 pb-12">
                    <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <FadeInSection className="text-center mb-12">
                            <AnimatedGradientText className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-sm mb-6">
                                Portfolio
                            </AnimatedGradientText>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                My Projects
                            </h1>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                                A collection of projects I&apos;ve worked on, from full-stack web applications to
                                backend APIs and frontend components. Each project is built with
                                modern technologies and best practices.
                            </p>
                        </FadeInSection>

                        {/* Projects Grid */}
                        <div className="grid gap-8 lg:gap-12">
                            {projects.map((project, index) => (
                                <FadeInSection
                                    key={project.id}
                                    delay={index * 0.1}
                                    className="group"
                                >
                                    <AnimatedCard className="overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300">
                                        <div className="grid lg:grid-cols-2 gap-8">
                                            {/* Project Image */}
                                            <div className="relative aspect-video lg:aspect-square overflow-hidden">
                                                <Image
                                                    src={project.image || "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop&crop=center"}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                {project.featured && (
                                                    <div className="absolute top-4 left-4">
                                                        <Badge variant="secondary" className="bg-blue-600 text-white">
                                                            Featured
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Project Details */}
                                            <div className="p-6 lg:p-8 flex flex-col justify-between">
                                                <div>
                                                    <CardHeader className="p-0 mb-4">
                                                        <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                                                            {project.title}
                                                        </CardTitle>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {project.longDescription || project.description}
                                                        </p>
                                                    </CardHeader>

                                                    <CardContent className="p-0">
                                                        {/* Technologies */}
                                                        <div className="flex flex-wrap gap-2 mb-6">
                                                            {project.technologies.map((tech) => (
                                                                <Badge key={tech} variant="outline" className="text-xs">
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-4">
                                                    {project.liveUrl && (
                                                        <Button asChild>
                                                            <Link
                                                                href={project.liveUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                                Live Demo
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    {project.githubUrl && (
                                                        <Button variant="outline" asChild>
                                                            <Link
                                                                href={project.githubUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Github className="h-4 w-4" />
                                                                Source Code
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedCard>
                                </FadeInSection>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <FadeInSection className="text-center mt-16">
                            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 lg:p-12">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                    Interested in my projects?
                                </h2>
                                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Get in touch to discuss your next project
                                </p>
                                <Button size="lg" asChild>
                                    <Link href="/contact">
                                        Let&apos;s Work Together
                                    </Link>
                                </Button>
                            </div>
                        </FadeInSection>
                    </div>
                </main>
            </MagicBackground>
        </PageTransition>
    );
}


// Filter projects by category
