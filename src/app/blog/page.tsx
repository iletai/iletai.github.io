import MagicBackground from "@/components/ui/magic-background";
import { blogService } from "@/lib/api/blog";
import { ApiError } from "@/lib/api/client";
import type { BlogPost } from "@/lib/api/types";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface BlogPageData {
    posts: BlogPost[];
    totalCount: number;
    limit: number;
    page: number;
    error: string | null;
}

async function fetchBlogPageData(): Promise<BlogPageData> {
    try {
        const response = await blogService.getBlogPosts({ status: "published", limit: 20 });
        const postsData = response?.posts;

        if (!Array.isArray(postsData)) {
            throw new Error("Invalid blog data returned from API.");
        }

        const posts = postsData.filter((post): post is BlogPost =>
            Boolean(post && typeof post.slug === "string" && typeof post.title === "string")
        );

        return {
            posts,
            totalCount: response?.totalCount ?? posts.length,
            limit: response?.limit ?? 20,
            page: response?.page ?? 1,
            error: null,
        };
    } catch (error) {
        const message = error instanceof ApiError ? error.message : "Unable to load blog posts. Please try again later.";

        return {
            posts: [],
            totalCount: 0,
            limit: 20,
            page: 1,
            error: message,
        };
    }
}

export default async function BlogPage() {
    const { posts, totalCount, limit, page, error } = await fetchBlogPageData();
    const allTags = [...new Set(posts.flatMap(post => post.tags?.map(tag => tag.name).filter(Boolean) ?? []))];
    const featuredPosts = posts.filter(post => post.featured);
    const totalPages = Math.max(1, Math.ceil(totalCount / (limit || 1)));
    const displayPages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1);

    return (
        <MagicBackground variant="dots" intensity="medium">
            <div className="min-h-screen pt-32 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
                        <p className="text-lg text-gray-600 max-w-3xl">
                            Sharing knowledge, experience, and insights about programming, web technologies, and
                            software development. From basic tutorials to advanced concepts.
                        </p>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                            <p className="font-medium">Error loading blog posts:</p>
                            <p className="mt-1 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Tags Filter */}
                    {allTags.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Filter by tag:</h3>
                            <div className="flex flex-wrap gap-2">
                                <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors">
                                    All
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
                    )}

                    {/* Featured Posts */}
                    {featuredPosts.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {featuredPosts.map((post) => (
                                    <article
                                        key={post.slug}
                                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                                            {post.coverImage ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-500">Featured Post Image</span>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {(post.tags ?? []).slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag.id}
                                                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                                                    >
                                                        {tag.name}
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
                                                {post.excerpt ?? post.content.slice(0, 160)}
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
                                                    {(post.readingTime ?? calculateReadingTime(post.content))} min read
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Posts */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Posts</h2>
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                        <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                                            {(post.tags ?? []).map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                                >
                                                    {tag.name}
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
                                                {(post.readingTime ?? calculateReadingTime(post.content))} min read
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
                                        {post.excerpt ?? post.content.slice(0, 160)}
                                    </p>
                                </article>
                            ))}
                            {posts.length === 0 && !error && (
                                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
                                    No published posts available yet. Please check back later.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center">
                        <div className="flex space-x-2">
                            {displayPages.map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    className={`px-3 py-2 rounded transition-colors ${pageNumber === page
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    type="button"
                                    aria-current={pageNumber === page ? "page" : undefined}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            {totalPages > displayPages.length && (
                                <span className="px-3 py-2 text-gray-500" aria-hidden="true">
                                    …
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MagicBackground>
    );
}
