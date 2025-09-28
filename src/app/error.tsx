'use client';

import { AlertTriangle, Home, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to error reporting service
        console.error('Application error:', error);
    }, [error]);

    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md mx-auto text-center px-4">
                {/* Error Icon */}
                <div className="mb-8">
                    <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="h-12 w-12 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        An error occurred
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Sorry, an unexpected error occurred. Please try again or contact us
                        if the problem persists.
                    </p>
                </div>

                {/* Error Details (Development Only) */}
                {isDevelopment && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                        <h3 className="font-semibold text-red-800 mb-2">Error Details (Development):</h3>
                        <p className="text-sm text-red-700 font-mono break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-red-600 mt-2">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4">
                    <button
                        onClick={reset}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Try again
                    </button>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Home className="h-4 w-4 mr-2" />
                            Go to homepage
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Mail className="h-4 w-4 mr-2" />
                            Report Error
                        </Link>
                    </div>
                </div>

                {/* Help Information */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">
                        If the error persists, please contact me via:
                    </p>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            📧 Email: <a href="mailto:iletai@hotmail.com" className="text-blue-600 hover:text-blue-800">iletai@hotmail.com</a>
                        </p>
                        <p className="text-sm text-gray-600">
                            💬 Or use{" "}
                            <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                                contact form
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
