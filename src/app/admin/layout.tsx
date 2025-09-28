'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (!isLoading && !isAuthenticated && !isLoginPage) {
            router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [isAuthenticated, isLoading, isLoginPage, router, pathname]);

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-50'>
                <div className='flex flex-col items-center space-y-4'>
                    <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
                    <p className='text-gray-600'>Loading...</p>
                </div>
            </div>
        );
    }

    // Render login page without admin layout
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    // Render admin layout for authenticated users
    return (
        <div className='min-h-screen bg-gray-50'>
            <AdminSidebar />
            <div className='lg:ml-64'>
                <AdminHeader />
                <main className='py-6'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    );
}
