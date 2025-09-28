'use client';

import { useAuth } from '@/contexts/AuthContext';
import { cn, formatDateTime } from '@/lib/utils';
import { Bell, ChevronDown, Home, LogOut, Menu, Search, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Mock notifications - will be replaced with real data
const mockNotifications = [
    {
        id: '1',
        type: 'contact',
        title: 'New message from customer',
        message: 'John Doe sent a contact message',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        read: false,
    },
    {
        id: '2',
        type: 'system',
        title: 'System update',
        message: 'System has been updated to new version',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: true,
    },
];

export default function AdminHeader() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const notificationsRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const unreadCount = mockNotifications.filter((n) => !n.read).length;

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // TODO: Implement search functionality
            console.log('Searching for:', searchQuery);
        }
    };

    if (!user) return null;

    return (
        <header className='bg-white shadow-sm border-b border-gray-200 lg:ml-64'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Mobile menu button & Search */}
                    <div className='flex items-center flex-1 lg:hidden'>
                        <button
                            type='button'
                            className='p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
                        >
                            <Menu className='h-5 w-5' />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className='flex-1 max-w-2xl hidden lg:block'>
                        <form onSubmit={handleSearch} className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Search className='h-4 w-4 text-gray-400' />
                            </div>
                            <input
                                type='text'
                                placeholder='Search articles, projects, messages...'
                                className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Right side actions */}
                    <div className='flex items-center space-x-4'>
                        {/* Quick Link to Main Site */}
                        <Link
                            href='/'
                            target='_blank'
                            className='hidden lg:inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            <Home className='h-4 w-4 mr-1.5' />
                            Homepage
                        </Link>

                        {/* Notifications */}
                        <div className='relative' ref={notificationsRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 relative'
                            >
                                <Bell className='h-5 w-5' />
                                {unreadCount > 0 && (
                                    <span className='absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className='absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200'>
                                    <div className='px-4 py-2 border-b border-gray-100'>
                                        <h3 className='text-sm font-semibold text-gray-900'>Notifications</h3>
                                    </div>
                                    <div className='max-h-64 overflow-y-auto'>
                                        {mockNotifications.length > 0 ? (
                                            mockNotifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={cn(
                                                        'px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0',
                                                        !notification.read && 'bg-blue-50'
                                                    )}
                                                >
                                                    <div className='flex items-start'>
                                                        <div className='flex-1 min-w-0'>
                                                            <p className='text-sm font-medium text-gray-900 truncate'>
                                                                {notification.title}
                                                            </p>
                                                            <p className='text-sm text-gray-600 mt-1'>
                                                                {notification.message}
                                                            </p>
                                                            <p className='text-xs text-gray-500 mt-1'>
                                                                {formatDateTime(notification.timestamp)}
                                                            </p>
                                                        </div>
                                                        {!notification.read && (
                                                            <div className='ml-2'>
                                                                <div className='h-2 w-2 bg-blue-600 rounded-full'></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className='px-4 py-6 text-center text-sm text-gray-500'>
                                                No new notifications
                                            </div>
                                        )}
                                    </div>
                                    <div className='px-4 py-2 border-t border-gray-100'>
                                        <button className='text-sm text-blue-600 hover:text-blue-800 font-medium'>
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className='relative' ref={userMenuRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className='flex items-center max-w-xs bg-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-2 hover:bg-gray-50'
                            >
                                <div className='h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center'>
                                    <span className='text-sm font-medium text-white'>
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className='ml-2 hidden lg:block text-left'>
                                    <p className='text-sm font-medium text-gray-900'>{user.name}</p>
                                    <p className='text-xs text-gray-500 capitalize'>{user.role}</p>
                                </div>
                                <ChevronDown className='ml-2 h-4 w-4 text-gray-600' />
                            </button>

                            {showUserMenu && (
                                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200'>
                                    <div className='px-4 py-2 border-b border-gray-100'>
                                        <p className='text-sm font-medium text-gray-900'>{user.name}</p>
                                        <p className='text-xs text-gray-500'>{user.email}</p>
                                    </div>

                                    <Link
                                        href='/admin/profile'
                                        className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <User className='mr-3 h-4 w-4 text-gray-400' />
                                        Personal profile
                                    </Link>

                                    <Link
                                        href='/admin/settings'
                                        className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <Settings className='mr-3 h-4 w-4 text-gray-400' />
                                        Settings
                                    </Link>

                                    <div className='border-t border-gray-100 mt-1'>
                                        <button
                                            onClick={handleLogout}
                                            className='flex items-center w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                                        >
                                            <LogOut className='mr-3 h-4 w-4 text-red-400' />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
