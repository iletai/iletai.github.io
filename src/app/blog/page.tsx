import MagicBackground from "@/components/ui/magic-background";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

// Temporary static data - will be replaced with API calls
const blogPosts = [
    {
        slug: "getting-started-nextjs-15",
        title: "Getting Started with Next.js 15",
        excerpt: "Hướng dẫn chi tiết về những tính năng mới trong Next.js 15, bao gồm App Router, Server Components và các optimization mới.",
        content: "Next.js 15 đã ra mắt với nhiều tính năng mới...",
        publishedAt: "2024-01-15",
        tags: ["Next.js", "React", "Web Development"],
        featured: true,
    },
    {
        slug: "react-server-components",
        title: "Understanding React Server Components",
        excerpt: "Deep dive vào React Server Components và cách sử dụng hiệu quả để tối ưu performance và user experience.",
        content: "React Server Components là một tính năng mới...",
        publishedAt: "2024-01-10",
        tags: ["React", "Server Components", "Performance"],
        featured: true,
    },
    {
        slug: "typescript-best-practices",
        title: "TypeScript Best Practices 2024",
        excerpt: "Tổng hợp các best practices khi sử dụng TypeScript trong dự án React và Node.js hiện đại.",
        content: "TypeScript đã trở thành standard...",
        publishedAt: "2024-01-05",
        tags: ["TypeScript", "Best Practices", "JavaScript"],
        featured: false,
    },
    {
        slug: "building-restful-apis",
        title: "Building RESTful APIs with Node.js",
        excerpt: "Hướng dẫn xây dựng RESTful API với Node.js, Express và MongoDB. Bao gồm authentication, validation và error handling.",
        content: "Khi xây dựng RESTful API...",
        publishedAt: "2023-12-28",
        tags: ["Node.js", "API", "Backend"],
        featured: false,
    },
    {
        slug: "css-grid-vs-flexbox",
        title: "CSS Grid vs Flexbox: Khi nào dùng gì?",
        excerpt: "So sánh chi tiết giữa CSS Grid và Flexbox, khi nào nên sử dụng layout nào để đạt hiệu quả tối ưu.",
        content: "CSS Grid và Flexbox đều là...",
        publishedAt: "2023-12-20",
        tags: ["CSS", "Layout", "Frontend"],
        featured: false,
    },
    {
        slug: "docker-for-developers",
        title: "Docker cho Developers: Từ cơ bản đến nâng cao",
        excerpt: "Học Docker từ những khái niệm cơ bản cho đến containerize ứng dụng và deploy lên production.",
        content: "Docker đã thay đổi cách...",
        publishedAt: "2023-12-15",
        tags: ["Docker", "DevOps", "Deployment"],
        featured: false,
    },
];

const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

export default function BlogPage() {
    return (
        <MagicBackground variant="dots" intensity="medium">
            <div className="min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12">
                        <Link
                            href="/"
                            className="text-blue-600 hover:text-blue-800 inline-flex items-center mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Về trang chủ
                        </Link>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
                        <p className="text-lg text-gray-600 max-w-3xl">
                            Chia sẻ kiến thức, kinh nghiệm và insights về lập trình, công nghệ web và
                            software development. Từ tutorials cơ bản đến advanced concepts.
                        </p>
                    </div>

                    {/* Tags Filter */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Lọc theo tag:</h3>
                        <div className="flex flex-wrap gap-2">
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors">
                                Tất cả
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Posts */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết nổi bật</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {blogPosts
                                .filter(post => post.featured)
                                .map((post) => (
                                    <article
                                        key={post.slug}
                                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                                            <span className="text-gray-500">Featured Post Image</span>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="hover:text-blue-600 transition-colors"
                                                >
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    <time dateTime={post.publishedAt}>
                                                        {formatDate(post.publishedAt)}
                                                    </time>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {calculateReadingTime(post.content)} phút đọc
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                        </div>
                    </div>

                    {/* All Posts */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tất cả bài viết</h2>
                        <div className="space-y-6">
                            {blogPosts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                        <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <time dateTime={post.publishedAt}>
                                                    {formatDate(post.publishedAt)}
                                                </time>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {calculateReadingTime(post.content)} phút đọc
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="hover:text-blue-600 transition-colors"
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center">
                        <div className="flex space-x-2">
                            <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                1
                            </button>
                            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                                2
                            </button>
                            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                                3
                            </button>
                            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MagicBackground>
    );
}
