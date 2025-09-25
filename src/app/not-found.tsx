'use client';

import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md mx-auto text-center px-4">
                {/* 404 Animation */}
                <div className="mb-8">
                    <div className="text-9xl font-bold text-blue-600 opacity-20">404</div>
                    <div className="relative -mt-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Trang không tồn tại
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Home className="h-5 w-5 mr-2" />
                        Về trang chủ
                    </Link>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleGoBack}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Quay lại
                        </button>

                        <Link
                            href="/blog"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            Xem blog
                        </Link>
                    </div>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">Có thể bạn đang tìm:</p>
                    <div className="grid grid-cols-1 gap-2">
                        <Link
                            href="/projects"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            → Xem các dự án của tôi
                        </Link>
                        <Link
                            href="/blog"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            → Đọc bài viết trên blog
                        </Link>
                        <Link
                            href="/contact"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            → Liên hệ với tôi
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
