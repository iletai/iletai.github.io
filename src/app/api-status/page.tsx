'use client';

import { useBlogPosts, useDashboardStats, useProjects } from '@/hooks/useApi';
import { AlertCircle, CheckCircle, Loader2, XCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface ApiStatus {
    endpoint: string;
    status: 'loading' | 'success' | 'error';
    data?: unknown;
    error?: string | null;
    description: string;
}

// Stable objects to prevent infinite re-renders
const blogParams = { limit: 5 };
const projectParams = { limit: 5 };

export default function ApiStatusPage() {
    const [testResults, setTestResults] = useState<ApiStatus[]>([]);

    // API hooks with stable parameters
    const dashboardStats = useDashboardStats();
    const blogPosts = useBlogPosts(blogParams);
    const projects = useProjects(projectParams);

    const runApiTests = useCallback(() => {
        const results: ApiStatus[] = [
            {
                endpoint: '/api/analytics/dashboard',
                status: dashboardStats.loading ? 'loading' : dashboardStats.error ? 'error' : 'success',
                data: dashboardStats.data,
                error: dashboardStats.error,
                description: 'Dashboard statistics'
            },
            {
                endpoint: '/api/blog/posts',
                status: blogPosts.loading ? 'loading' : blogPosts.error ? 'error' : 'success',
                data: blogPosts.data,
                error: blogPosts.error,
                description: 'Blog posts listing'
            },
            {
                endpoint: '/api/projects',
                status: projects.loading ? 'loading' : projects.error ? 'error' : 'success',
                data: projects.data,
                error: projects.error,
                description: 'Projects listing'
            }
        ];
        setTestResults(results);
    }, [dashboardStats, blogPosts, projects]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'loading':
                return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />;
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'error':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <AlertCircle className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'loading':
                return 'bg-yellow-50 border-yellow-200';
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    // Run tests on component mount
    useEffect(() => {
        runApiTests();
    }, [runApiTests]);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">API Integration Status</h1>
                    <p className="text-gray-600">
                        Trang này hiển thị trạng thái tích hợp API và kiểm tra kết nối với backend.
                    </p>
                </div>

                {/* API Configuration */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6">
                    <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
                    <div className="space-y-3">
                        <div>
                            <span className="font-medium text-gray-700">Base URL:</span>
                            <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">
                                {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787'}
                            </code>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Environment:</span>
                            <span className="ml-2 text-sm text-gray-600">
                                {process.env.NODE_ENV}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Test Button */}
                <div className="mb-6">
                    <button
                        onClick={runApiTests}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Test API Endpoints
                    </button>
                </div>

                {/* API Status */}
                <div className="space-y-4">
                    {testResults.map((result, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg border ${getStatusColor(result.status)}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    {getStatusIcon(result.status)}
                                    <div>
                                        <h3 className="font-medium text-gray-900">{result.endpoint}</h3>
                                        <p className="text-sm text-gray-600">{result.description}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${result.status === 'success' ? 'bg-green-100 text-green-800' :
                                    result.status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {result.status.toUpperCase()}
                                </span>
                            </div>

                            {result.error && (
                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                                    <p className="text-sm text-red-700 font-medium">Error:</p>
                                    <p className="text-sm text-red-600">{result.error}</p>
                                </div>
                            )}

                            {result.data != null && result.status === 'success' && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-700 font-medium mb-2">Response Preview:</p>
                                    <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-32">
                                        {JSON.stringify(result.data || {}, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Integration Guide */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-3">🚀 API Integration Status</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                        <p>✅ Frontend API client đã được setup với TypeScript types</p>
                        <p>✅ React hooks đã sẵn sàng cho UI integration</p>
                        <p>✅ Error handling và retry logic đã được implement</p>
                        <p>✅ Admin dashboard đã tích hợp API với fallback data</p>
                        <p>⚠️ Backend API chưa implement các endpoints</p>
                        <p>⚠️ Trang Blog và Projects đang sử dụng static data</p>
                    </div>
                    <div className="mt-4 p-3 bg-white border border-blue-300 rounded">
                        <p className="text-sm text-blue-900 font-medium">Next Steps:</p>
                        <p className="text-xs text-blue-700 mt-1">
                            Deploy backend API với các endpoints trong OpenAPI spec để kích hoạt tích hợp hoàn chỉnh.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
