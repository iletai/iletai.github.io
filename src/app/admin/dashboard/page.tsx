'use client';

import MagicBackground from '@/components/ui/magic-background';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardStats } from '@/lib/types';
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
import { useEffect, useState } from 'react';

// Mock data - sẽ được thay thế bằng API calls thực tế
const mockStats: DashboardStats = {
    totalProjects: 12,
    totalBlogPosts: 24,
    totalContacts: 8,
    monthlyViews: 1520,
    recentProjects: [
        {
            id: '1',
            title: 'E-commerce Platform',
            description: 'Full-stack e-commerce solution',
            longDescription: 'Advanced e-commerce platform with modern features',
            technologies: ['React', 'Node.js', 'MongoDB'],
            image: '/projects/ecommerce.jpg',
            category: 'Web Development',
            projectStatus: 'completed',
            status: 'published',
            startDate: '2024-01-15',
            endDate: '2024-02-20',
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-02-20T15:30:00Z',
            authorId: 'user1',
            views: 245,
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/example',
            featured: true,
        },
        {
            id: '2',
            title: 'Portfolio Website',
            description: 'Personal portfolio with blog',
            longDescription: 'Modern portfolio website showcasing projects and blog',
            technologies: ['Next.js', 'TypeScript', 'Tailwind'],
            image: '/projects/portfolio.jpg',
            category: 'Personal',
            projectStatus: 'in-progress',
            status: 'draft',
            startDate: '2024-02-01',
            createdAt: '2024-02-01T09:00:00Z',
            updatedAt: '2024-02-15T14:20:00Z',
            authorId: 'user1',
            views: 89,
            githubUrl: 'https://github.com/portfolio',
            featured: false,
        },
    ],
    recentPosts: [
        {
            id: '1',
            title: 'Getting Started with Next.js 15',
            excerpt: 'Learn about the new features in Next.js 15',
            content: 'Full content here...',
            publishedAt: '2024-02-10T10:00:00Z',
            slug: 'getting-started-nextjs-15',
            author: {
                name: 'Admin User',
                avatar: '/avatars/admin.jpg',
                bio: 'Full-stack developer',
            },
            tags: ['Next.js', 'React', 'Web Development'],
            category: 'Tutorial',
            featured: true,
            readingTime: 5,
            coverImage: '/blog/nextjs-15.jpg',
            status: 'published',
            createdAt: '2024-02-10T08:00:00Z',
            updatedAt: '2024-02-10T10:00:00Z',
            authorId: 'user1',
            views: 456,
        },
    ],
    recentContacts: [
        {
            id: '1',
            firstName: 'Nguyễn',
            lastName: 'Văn A',
            email: 'nguyenvana@example.com',
            phone: '0123456789',
            subject: 'Hỏi về dự án web',
            message: 'Tôi muốn trao đổi về việc phát triển website...',
            status: 'new',
            createdAt: '2024-02-15T14:30:00Z',
            priority: 'normal',
        },
        {
            id: '2',
            firstName: 'Trần',
            lastName: 'Thị B',
            email: 'tranthib@example.com',
            subject: 'Cần tư vấn mobile app',
            message: 'Công ty tôi cần phát triển ứng dụng mobile...',
            status: 'read',
            createdAt: '2024-02-14T11:20:00Z',
            readAt: '2024-02-14T16:45:00Z',
            priority: 'high',
        },
    ],
};

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats>(mockStats);
    const [isLoading, setIsLoading] = useState(false);

    // In real app, fetch data from API
    useEffect(() => {
        // fetchDashboardData();
    }, []);

    const statCards = [
        {
            name: 'Tổng dự án',
            value: stats.totalProjects,
            icon: FolderOpen,
            href: '/admin/projects',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            change: '+2',
            changeType: 'positive',
        },
        {
            name: 'Bài viết',
            value: stats.totalBlogPosts,
            icon: FileText,
            href: '/admin/posts',
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            change: '+5',
            changeType: 'positive',
        },
        {
            name: 'Tin nhắn',
            value: stats.totalContacts,
            icon: MessageSquare,
            href: '/admin/contacts',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
            change: '+3',
            changeType: 'positive',
        },
        {
            name: 'Lượt xem tháng',
            value: stats.monthlyViews,
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
                                <h1 className='text-2xl font-bold text-gray-900'>Chào mừng trở lại, {user?.name}! 👋</h1>
                                <p className='mt-1 text-sm text-gray-600'>Đây là tổng quan về hoạt động website của bạn.</p>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <Link
                                    href='/admin/posts/new'
                                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    <Plus className='h-4 w-4 mr-2' />
                                    Bài viết mới
                                </Link>
                                <Link
                                    href='/admin/projects/new'
                                    className='inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    <Plus className='h-4 w-4 mr-2' />
                                    Dự án mới
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
                                                        {card.changeType === 'positive' ? 'Tăng' : 'Giảm'} so với tháng
                                                        trước
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
                                <h3 className='text-lg leading-6 font-medium text-gray-900'>Dự án gần đây</h3>
                                <Link
                                    href='/admin/projects'
                                    className='text-sm text-blue-600 hover:text-blue-500 font-medium'
                                >
                                    Xem tất cả
                                </Link>
                            </div>
                        </div>
                        <div className='divide-y divide-gray-200'>
                            {stats.recentProjects.map((project) => (
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
                                                {project.views} lượt xem
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
                                <h3 className='text-lg leading-6 font-medium text-gray-900'>Bài viết gần đây</h3>
                                <Link href='/admin/posts' className='text-sm text-blue-600 hover:text-blue-500 font-medium'>
                                    Xem tất cả
                                </Link>
                            </div>
                        </div>
                        <div className='divide-y divide-gray-200'>
                            {stats.recentPosts.map((post) => (
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
                                                {post.views} lượt xem
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
                            <h3 className='text-lg leading-6 font-medium text-gray-900'>Tin nhắn liên hệ mới</h3>
                            <Link href='/admin/contacts' className='text-sm text-blue-600 hover:text-blue-500 font-medium'>
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className='divide-y divide-gray-200'>
                        {stats.recentContacts.map((contact) => (
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
                                                    getStatusColor(contact.priority)
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
