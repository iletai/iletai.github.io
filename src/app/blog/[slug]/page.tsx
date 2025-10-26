import BackButton from "@/components/ui/back-button";
import { blogService } from "@/lib/api/blog";
import { ApiError } from "@/lib/api/client";
import type { BlogPost } from "@/lib/api/types";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { Calendar, Clock, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function loadBlogPost(slug: string): Promise<{ post: BlogPost | null; error: string | null }> {
    try {
        const response = await blogService.getBlogPostBySlug(slug);
        const post = response?.data;

        if (!post || typeof post.slug !== "string" || typeof post.title !== "string") {
            return {
                post: null,
                error: "Invalid article data.",
            };
        }

        return {
            post,
            error: null,
        };
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            return { post: null, error: null };
        }

        const message = error instanceof ApiError ? error.message : "Unable to load article.";
        return { post: null, error: message };
    }
}

async function loadRelatedPosts(slug: string): Promise<BlogPost[]> {
    try {
        const response = await blogService.getBlogPosts({ status: "published", limit: 4 });
        const posts = response?.posts ?? [];
        return posts.filter(post => post.slug !== slug).slice(0, 2);
    } catch {
        return [];
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { post, error } = await loadBlogPost(slug);

    if (!post) {
        if (error) {
            return (
                <div className="min-h-screen py-12">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <BackButton href="/blog" />
                        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700" role="alert">
                            {error}
                        </div>
                    </div>
                </div>
            );
        }
        notFound();
    }

    const relatedPosts = await loadRelatedPosts(slug);
    const readingTime = post.readingTime ?? calculateReadingTime(post.content ?? "");
    const markdownHtml = post.content
        ? post.content
            .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre><code class="language-$1">$2</code></pre>')
            .replace(/\n/g, "<br>")
        : "";

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Navigation */}
                <BackButton href="/blog" />

                {/* Article Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>

                    <p className="text-xl text-gray-600 mb-6">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 space-x-6">
                            <span>By {post.author?.name ?? "Anonymous"}</span>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <time dateTime={post.publishedAt}>
                                    {formatDate(post.publishedAt)}
                                </time>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {readingTime} min read
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="text-gray-500 hover:text-red-500 transition-colors">
                                <Heart className="h-5 w-5" />
                            </button>
                            <button className="text-gray-500 hover:text-blue-500 transition-colors">
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <article className="prose prose-lg max-w-none">
                    <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{
                            __html: markdownHtml
                        }}
                    />
                </article>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600">Tags:</span>
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag.id}
                                    href={`/blog?tag=${tag.slug}`}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Share article
                            </button>
                        </div>
                    </div>
                </footer>

                {/* Related Posts */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedPosts.map((relatedPost) => (
                            <article key={relatedPost.slug} className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    <Link
                                        href={`/blog/${relatedPost.slug}`}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {relatedPost.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {relatedPost.excerpt ?? relatedPost.content.slice(0, 120)}
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <time dateTime={relatedPost.publishedAt}>
                                        {formatDate(relatedPost.publishedAt)}
                                    </time>
                                </div>
                            </article>
                        ))}
                        {relatedPosts.length === 0 && (
                            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
                                No related articles to display.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
