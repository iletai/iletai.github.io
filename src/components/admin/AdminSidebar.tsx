'use client';

import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
    BarChart3,
    ChevronLeft,
    ChevronRight,
    Eye,
    FileText,
    FolderOpen,
    Home,
    LayoutDashboard,
    MessageSquare,
    Settings,
    Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
    {
        name: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
        description: 'System overview',
    },
    {
        name: 'Blog Posts',
        href: '/admin/blog',
        icon: FileText,
        description: 'Manage blog posts',
    },
    {
        name: 'Projects',
        href: '/admin/projects',
        icon: FolderOpen,
        description: 'Manage projects',
    },
    {
        name: 'Messages',
        href: '/admin/contacts',
        icon: MessageSquare,
        description: 'Contact messages',
    },
    {
        name: 'Statistics',
        href: '/admin/analytics',
        icon: BarChart3,
        description: 'Traffic analysis',
    },
    {
        name: 'Users',
        href: '/admin/users',
        icon: Users,
        description: 'Admin management',
    },
    {
        name: 'Settings',
        href: '/admin/settings',
        icon: Settings,
        description: 'System configuration',
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {/* Sidebar for desktop */}
            <div
                className={cn(
                    'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300',
                    collapsed ? 'lg:w-20' : 'lg:w-64'
                )}
            >
                <div className='flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto'>
                    {/* Logo & Collapse Button */}
                    <div className='flex items-center justify-between px-4'>
                        {!collapsed && (
                            <Link href='/admin/dashboard' className='flex items-center'>
                                <span className='text-xl font-bold text-gray-900'>Admin Panel</span>
                            </Link>
                        )}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'
                        >
                            {collapsed ? (
                                <ChevronRight className='h-5 w-5 text-gray-600' />
                            ) : (
                                <ChevronLeft className='h-5 w-5 text-gray-600' />
                            )}
                        </button>
                    </div>

                    {/* Quick Actions */}
                    {!collapsed && (
                        <div className='mt-6 px-4'>
                            <div className='flex space-x-2'>
                                <Link
                                    href='/'
                                    target='_blank'
                                    className='flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors'
                                >
                                    <Eye className='h-4 w-4 mr-1' />
                                    Xem site
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className='mt-8 flex-1 px-2 space-y-1'>
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                                        isActive
                                            ? 'bg-blue-100 text-blue-900'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                                        collapsed ? 'justify-center' : ''
                                    )}
                                    title={collapsed ? item.name : undefined}
                                >
                                    <item.icon
                                        className={cn(
                                            'flex-shrink-0 h-5 w-5',
                                            isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600',
                                            collapsed ? '' : 'mr-3'
                                        )}
                                    />
                                    {!collapsed && <span className='truncate'>{item.name}</span>}
                                    {!collapsed && isActive && (
                                        <div className='ml-auto'>
                                            <div className='h-2 w-2 bg-blue-600 rounded-full'></div>
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info */}
                    {!collapsed && user && (
                        <div className='flex-shrink-0 px-4 py-4 border-t border-gray-200'>
                            <div className='flex items-center'>
                                <div className='h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center'>
                                    <span className='text-sm font-medium text-white'>
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className='ml-3 min-w-0'>
                                    <p className='text-sm font-medium text-gray-900 truncate'>{user.name}</p>
                                    <p className='text-xs text-gray-500 capitalize'>{user.role}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile sidebar backdrop */}
            <div className='lg:hidden'>
                {/* Mobile sidebar will be implemented later with proper mobile menu */}
                <div className='bg-white border-b border-gray-200 px-4 py-3'>
                    <div className='flex items-center justify-between'>
                        <Link href='/admin/dashboard'>
                            <span className='text-lg font-bold text-gray-900'>Admin</span>
                        </Link>
                        <Link
                            href='/'
                            target='_blank'
                            className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700'
                        >
                            <Home className='h-4 w-4 mr-1' />
                            Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
