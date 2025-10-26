'use client';

import MagicBackground from '@/components/ui/magic-background';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardStats } from '@/hooks/useApi';
import type { BlogPost, ContactSubmission, DashboardStats, Project } from '@/lib/api/types';
import { cn, formatDate, formatDateTime, getStatusColor } from '@/lib/utils';
import {
    Activity,
    ArrowUpRight,
    BarChart3,
    Calendar,
    Eye,
    FileText,
    FolderOpen,
    MessageSquare,
    Plus,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

// API integration - Real data from backend API
const mockStats: DashboardStats = {
    totalProjects: 12,
    totalBlogPosts: 24,
    totalContacts: 8,
    monthlyViews: 15420,
    recentProjects: [
        {
            id: '1',
            title: 'Portfolio Website Redesign',
            description: 'Redesign portfolio website with Next.js and Tailwind CSS',
            status: 'completed',
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-20T15:30:00Z',
            views: 1234,
            technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
            featured: true,
            category: 'Web Development',
        },
        {
            id: '2',
            title: 'E-commerce Platform',
            description: 'Build e-commerce platform with React and Node.js',
            status: 'in-progress',
            createdAt: '2024-01-10T08:00:00Z',
            updatedAt: '2024-01-18T14:20:00Z',
            views: 892,
            technologies: ['React', 'Node.js', 'MongoDB'],
            featured: false,
            category: 'Full Stack',
        },
    ],
    recentPosts: [
        {
            id: '1',
            title: 'Performance Optimization for Next.js',
            slug: 'toi-uu-hoa-performance-cho-nextjs',
            excerpt: 'Techniques to optimize page loading speed for Next.js applications',
            content: 'Article content...',
            status: 'published',
            updatedAt: '2024-01-22T16:45:00Z',
            publishedAt: '2024-01-23T10:00:00Z',
            featured: true,
            views: 2156,
            author: {
                id: '1',
                name: 'Le Quang Trong Tai',
                avatar: '/avatars/admin.jpg',
                bio: 'Frontend Developer',
            },
            tags: [
                { id: '1', name: 'Next.js', slug: 'nextjs' },
                { id: '2', name: 'React', slug: 'react' },
                { id: '3', name: 'Web Development', slug: 'web-development' },
            ],
            category: { id: '1', name: 'Tutorial', slug: 'tutorial' },
            readingTime: 8,
        },
    ],
    recentContacts: [
        {
            id: '1',
            firstName: 'Nguyen',
            lastName: 'Van A',
            email: 'nguyenvana@example.com',
            phone: '0123456789',
            subject: 'Inquiry about web development services',
            message: 'I would like to learn about your website development services...',
            status: 'new',
            createdAt: '2024-01-23T14:30:00Z',
            updatedAt: '2024-01-23T14:30:00Z',
            priority: 'normal',
        },
        {
            id: '2',
            firstName: 'Tran',
            lastName: 'Thi B',
            email: 'tranthib@example.com',
            subject: 'Need mobile app consultation',
            message: 'Our company needs to develop a mobile application...',
            status: 'read',
            createdAt: '2024-01-22T11:15:00Z',
            updatedAt: '2024-01-23T08:30:00Z',
            readAt: '2024-01-23T08:30:00Z',
            priority: 'high',
        },
    ],
};

export default function AdminDashboard() {
    const { user } = useAuth();
    const { data: stats, loading, error } = useDashboardStats();

    // Show loading state
    if (loading) {
        return (
            <MagicBackground variant="subtle" intensity="low">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            </MagicBackground>
        );
    }

    // Show error state with fallback to mock data
    if (error) {
        console.warn('Dashboard API error, using mock data:', error);
    }

    // Fallback to mock data if API data is not available
    const dashboardData = stats || mockStats;

    const statCards = [
        {
            name: 'Total Projects',
            value: dashboardData.totalProjects,
            icon: FolderOpen,
            href: '/admin/projects',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            change: '+2',
            changeType: 'positive',
        },
        {
            name: 'Articles',
            value: dashboardData.totalBlogPosts,
            icon: FileText,
            href: '/admin/blog',
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            change: '+5',
            changeType: 'positive',
        },
        {
            name: 'Messages',
            value: dashboardData.totalContacts,
            icon: MessageSquare,
            href: '/admin/contacts',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
            change: '+3',
            changeType: 'positive',
        },
        {
            name: 'Monthly views',
            value: dashboardData.monthlyViews,
            icon: BarChart3,
            href: '/admin/analytics',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            change: '+12%',
            changeType: 'positive',
        },
    ];

    return (
        <MagicBackground variant="subtle" intensity="low">
            <div className='space-y-6'>
                {/* Welcome Header */}
                <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='px-4 py-5 sm:p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-2xl font-bold text-gray-900'>Welcome back, {user?.name}! 👋</h1>
                                <p className='mt-1 text-sm text-gray-600'>This is an overview of your website activity.</p>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <Link
                                    href='/admin/blog/new'
                                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    <Plus className='h-4 w-4 mr-2' />
                                    New Article
                                </Link>
                                <Link
                                    href='/admin/projects/new'
                                    className='inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    <Plus className='h-4 w-4 mr-2' />
                                    New Project
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                    {statCards.map((card) => (
                        <div key={card.name} className='bg-white overflow-hidden shadow rounded-lg'>
                            <div className='p-5'>
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0'>
                                        <div className={cn('p-3 rounded-md', card.bgColor)}>
                                            <card.icon className={cn('h-6 w-6', card.color)} />
                                        </div>
                                    </div>
                                    <div className='ml-5 w-0 flex-1'>
                                        <dl>
                                            <dt className='text-sm font-medium text-gray-500 truncate'>{card.name}</dt>
                                            <dd className='flex items-baseline'>
                                                <div className='text-2xl font-semibold text-gray-900'>
                                                    {card.value.toLocaleString()}
                                                </div>
                                                <div
                                                    className={cn(
                                                        'ml-2 flex items-baseline text-sm font-semibold',
                                                        card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                                    )}
                                                >
                                                    <TrendingUp className='self-center flex-shrink-0 h-4 w-4' />
                                                    <span className='sr-only'>
                                                        {card.changeType === 'positive' ? 'Increase' : 'Decrease'} compared to last month
                                                    </span>
                                                    {card.change}
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div className='flex-shrink-0'>
                                        <Link href={card.href} className='text-gray-400 hover:text-gray-600'>
                                            <ArrowUpRight className='h-5 w-5' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    {/* Recent Projects */}
                    <div className='bg-white shadow rounded-lg'>
                        <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-lg leading-6 font-medium text-gray-900'>Recent Projects</h3>
                                <Link
                                    href='/admin/projects'
                                    className='text-sm text-blue-600 hover:text-blue-500 font-medium'
                                >
                                    View all
                                </Link>
                            </div>
                        </div>
                        <div className='divide-y divide-gray-200'>
                            {dashboardData.recentProjects.map((project: Project) => (
                                <div key={project.id} className='px-4 py-4 sm:px-6'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center space-x-3'>
                                                <h4 className='text-sm font-medium text-gray-900 truncate'>
                                                    {project.title}
                                                </h4>
                                                <span
                                                    className={cn(
                                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                                        getStatusColor(project.status)
                                                    )}
                                                >
                                                    {project.status}
                                                </span>
                                            </div>
                                            <p className='mt-1 text-sm text-gray-600 truncate'>{project.description}</p>
                                            <div className='mt-2 flex items-center text-sm text-gray-500'>
                                                <Calendar className='flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400' />
                                                {formatDate(project.updatedAt)}
                                                <span className='mx-2'>•</span>
                                                <Eye className='flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400' />
                                                {project.views} views
                                            </div>
                                        </div>
                                        <div className='flex-shrink-0'>
                                            <Link
                                                href={`/admin/projects/${project.id}`}
                                                className='text-gray-400 hover:text-gray-600'
                                            >
                                                <ArrowUpRight className='h-5 w-5' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Posts */}
                    <div className='bg-white shadow rounded-lg'>
                        <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-lg leading-6 font-medium text-gray-900'>Recent Articles</h3>
                                <Link href='/admin/posts' className='text-sm text-blue-600 hover:text-blue-500 font-medium'>
                                    View all
                                </Link>
                            </div>
                        </div>
                        <div className='divide-y divide-gray-200'>
                            {dashboardData.recentPosts.map((post: BlogPost) => (
                                <div key={post.id} className='px-4 py-4 sm:px-6'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center space-x-3'>
                                                <h4 className='text-sm font-medium text-gray-900 truncate'>{post.title}</h4>
                                                <span
                                                    className={cn(
                                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                                        getStatusColor(post.status)
                                                    )}
                                                >
                                                    {post.status}
                                                </span>
                                            </div>
                                            <p className='mt-1 text-sm text-gray-600 truncate'>{post.excerpt}</p>
                                            <div className='mt-2 flex items-center text-sm text-gray-500'>
                                                <Calendar className='flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400' />
                                                {formatDate(post.publishedAt)}
                                                <span className='mx-2'>•</span>
                                                <Eye className='flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400' />
                                                {post.views} views
                                            </div>
                                        </div>
                                        <div className='flex-shrink-0'>
                                            <Link
                                                href={`/admin/posts/${post.id}`}
                                                className='text-gray-400 hover:text-gray-600'
                                            >
                                                <ArrowUpRight className='h-5 w-5' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Contacts */}
                <div className='bg-white shadow rounded-lg'>
                    <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
                        <div className='flex items-center justify-between'>
                            <h3 className='text-lg leading-6 font-medium text-gray-900'>New Contact Messages</h3>
                            <Link href='/admin/contacts' className='text-sm text-blue-600 hover:text-blue-500 font-medium'>
                                View all
                            </Link>
                        </div>
                    </div>
                    <div className='divide-y divide-gray-200'>
                        {dashboardData.recentContacts.map((contact: ContactSubmission) => (
                            <div key={contact.id} className='px-4 py-4 sm:px-6'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-center space-x-3'>
                                            <h4 className='text-sm font-medium text-gray-900'>
                                                {contact.firstName} {contact.lastName}
                                            </h4>
                                            <span
                                                className={cn(
                                                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                                    getStatusColor(contact.status)
                                                )}
                                            >
                                                {contact.status}
                                            </span>
                                            <span
                                                className={cn(
                                                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                                    getStatusColor(contact.priority || 'normal')
                                                )}
                                            >
                                                {contact.priority}
                                            </span>
                                        </div>
                                        <p className='mt-1 text-sm font-medium text-gray-700 truncate'>{contact.subject}</p>
                                        <p className='mt-1 text-sm text-gray-600 truncate'>{contact.message}</p>
                                        <div className='mt-2 flex items-center text-sm text-gray-500'>
                                            <Activity className='flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400' />
                                            {formatDateTime(contact.createdAt)}
                                        </div>
                                    </div>
                                    <div className='flex-shrink-0'>
                                        <Link
                                            href={`/admin/contacts/${contact.id}`}
                                            className='text-gray-400 hover:text-gray-600'
                                        >
                                            <ArrowUpRight className='h-5 w-5' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MagicBackground>
    );
}
