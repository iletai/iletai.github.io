'use client';

import BlogEditor, { type BlogFormData } from '@/components/admin/BlogEditor';
import MagicBackground from '@/components/ui/magic-background';
import { blogService } from '@/lib/api/blog';
import type { BlogPost, Category, Tag } from '@/lib/api/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    const loadData = async () => {
        try {
            setLoading(true);

            // Load post by ID - We need to implement this
            // For now, try to find by slug or mock it
            const [categoriesRes, tagsRes] = await Promise.all([
                blogService.getBlogCategories(),
                blogService.getBlogTags(),
            ]);

            setCategories(categoriesRes.data || []);
            setTags(tagsRes.data || []);

            // TODO: Implement getPostById API call
            // For now, try to load all posts and find by ID
            const postsRes = await blogService.getBlogPosts({});
            const foundPost = postsRes.posts.find((p: BlogPost) => p.id === postId);

            if (!foundPost) {
                setError('Blog post not found');
                return;
            }

            setPost(foundPost);
        } catch (err) {
            console.error('Failed to load data:', err);
            setError('Failed to load blog post');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (data: BlogFormData) => {
        try {
            // Update blog post via API
            const response = await blogService.updateBlogPost(postId, {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                coverImage: data.coverImage,
                categoryId: data.categoryId,
                tagIds: data.tagIds,
                status: data.status,
                featured: data.featured,
            });

            if (response.data) {
                alert('Blog post updated successfully!');
                router.push('/admin/blog');
            }
        } catch (err) {
            console.error('Failed to update post:', err);
            alert('Failed to update blog post. Please try again.');
        }
    };

    const handleCancel = () => {
        if (confirm('Are you sure? All unsaved changes will be lost.')) {
            router.push('/admin/blog');
        }
    };

    if (loading) {
        return (
            <MagicBackground variant="dots" intensity="low">
                <div className="min-h-screen pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading editor...</p>
                        </div>
                    </div>
                </div>
            </MagicBackground>
        );
    }

    if (error || !post) {
        return (
            <MagicBackground variant="dots" intensity="low">
                <div className="min-h-screen pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center py-12">
                            <p className="text-red-600 text-lg">{error || 'Post not found'}</p>
                            <Link
                                href="/admin/blog"
                                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog Posts
                            </Link>
                        </div>
                    </div>
                </div>
            </MagicBackground>
        );
    }

    return (
        <MagicBackground variant="dots" intensity="low">
            <div className="min-h-screen pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        href="/admin/blog"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog Posts
                    </Link>

                    {/* Editor */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <BlogEditor
                            initialData={post}
                            categories={categories}
                            tags={tags}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            </div>
        </MagicBackground>
    );
}
