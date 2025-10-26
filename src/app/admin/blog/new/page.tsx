'use client';

import BlogEditor, { type BlogFormData } from '@/components/admin/BlogEditor';
import MagicBackground from '@/components/ui/magic-background';
import { blogService } from '@/lib/api/blog';
import type { Category, Tag } from '@/lib/api/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewBlogPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMetadata();
    }, []);

    const loadMetadata = async () => {
        try {
            const [categoriesRes, tagsRes] = await Promise.all([
                blogService.getBlogCategories(),
                blogService.getBlogTags(),
            ]);
            setCategories(categoriesRes.data || []);
            setTags(tagsRes.data || []);
        } catch (error) {
            console.error('Failed to load metadata:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (data: BlogFormData) => {
        try {
            // Sanitize data before sending to backend
            // Convert empty strings to undefined to match backend optional field validation
            const payload = {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                coverImage: data.coverImage?.trim() || undefined, // Empty string → undefined
                categoryId: data.categoryId?.trim() || undefined, // Empty string → undefined
                tags: data.tagIds, // Map tagIds to tags for backend
                status: data.status,
                featured: data.featured,
            };

            // Create new blog post via API
            const response = await blogService.createBlogPost(payload);

            if (response.data) {
                alert('Blog post created successfully!');
                router.push('/admin/blog');
            }
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('Failed to create blog post. Please try again.');
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
