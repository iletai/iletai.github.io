'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlogPost, Category, Tag } from '@/lib/api/types';
import { Eye, Image as ImageIcon, Save, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// Dynamic import to avoid SSR issues with MDEditor
const MDEditor = dynamic(
    () => import('@uiw/react-md-editor').then((mod) => mod.default),
    { ssr: false }
);

interface BlogEditorProps {
    initialData?: Partial<BlogPost>;
    categories?: Category[];
    tags?: Tag[];
    onSave: (data: BlogFormData) => Promise<void>;
    onCancel: () => void;
}

export interface BlogFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    categoryId?: string;
    tagIds: string[];
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
}

export default function BlogEditor({
    initialData,
    categories = [],
    tags = [],
    onSave,
    onCancel,
}: BlogEditorProps) {
    // Initialize form data with proper defaults
    const [formData, setFormData] = useState<BlogFormData>({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        coverImage: initialData?.coverImage || '',
        categoryId: initialData?.category?.id || '',
        tagIds: initialData?.tags?.map(t => t.id) || [],
        status: initialData?.status || 'draft',
        featured: initialData?.featured || false,
    });

    const [showPreview, setShowPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>(
        initialData?.tags?.map(t => t.id) || []
    );

    // Sync selectedTags with formData.tagIds on mount/update
    React.useEffect(() => {
        if (initialData?.tags) {
            const tagIds = initialData.tags.map(t => t.id);
            setSelectedTags(tagIds);
            setFormData(prev => ({ ...prev, tagIds }));
        }
    }, [initialData?.tags]);

    // Auto-generate slug from title
    const handleTitleChange = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
            slug: title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim(),
        }));
    };

    const toggleTag = (tagId: string) => {
        setSelectedTags(prev => {
            const newTags = prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId];
            setFormData(fd => ({ ...fd, tagIds: newTags }));
            return newTags;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.title.trim()) {
            alert('Title is required');
            return;
        }

        if (!formData.slug.trim()) {
            alert('Slug is required');
            return;
        }

        if (!formData.content.trim()) {
            alert('Content is required');
            return;
        }

        setIsSaving(true);
        try {
            await onSave(formData);
        } catch (error) {
            console.error('Save error:', error);
            // Error handling is done in parent component
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                    {initialData?.id ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        {showPreview ? 'Edit' : 'Preview'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="Enter blog post title..."
                            required
                            className="text-lg"
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            placeholder="blog-post-slug"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            URL: /blog/{formData.slug || 'your-slug'}
                        </p>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="Brief description of your blog post..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Content Editor or Preview */}
                    <div className="space-y-2">
                        <Label htmlFor="content">Content *</Label>
                        {showPreview ? (
                            <div className="prose max-w-none p-6 border rounded-lg bg-white">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                >
                                    {formData.content}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div data-color-mode="light">
                                <MDEditor
                                    value={formData.content}
                                    onChange={(value) => setFormData(prev => ({ ...prev, content: value || '' }))}
                                    height={500}
                                    preview="edit"
                                    hideToolbar={false}
                                    enableScroll={true}
                                    visibleDragbar={true}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="p-4 border rounded-lg bg-white space-y-3">
                        <h3 className="font-semibold text-gray-900">Publication</h3>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    status: e.target.value as 'draft' | 'published' | 'archived'
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor="featured" className="cursor-pointer">
                                Featured Post
                            </Label>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="p-4 border rounded-lg bg-white space-y-3">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Cover Image
                        </h3>
                        <Input
                            id="coverImage"
                            type="url"
                            value={formData.coverImage}
                            onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                        />
                        {formData.coverImage && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={formData.coverImage}
                                alt="Cover preview"
                                className="w-full rounded-md border"
                                onError={(e) => {
                                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                                }}
                            />
                        )}
                    </div>

                    {/* Category */}
                    {categories.length > 0 && (
                        <div className="p-4 border rounded-lg bg-white space-y-3">
                            <h3 className="font-semibold text-gray-900">Category</h3>
                            <select
                                id="category"
                                value={formData.categoryId}
                                onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">No Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="p-4 border rounded-lg bg-white space-y-3">
                            <h3 className="font-semibold text-gray-900">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <Badge
                                        key={tag.id}
                                        variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
                                        className="cursor-pointer"
                                        onClick={() => toggleTag(tag.id)}
                                    >
                                        {tag.name}
                                        {selectedTags.includes(tag.id) && (
                                            <X className="w-3 h-3 ml-1" />
                                        )}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metadata Info */}
                    {initialData?.id && (
                        <div className="p-4 border rounded-lg bg-gray-50 space-y-2 text-sm">
                            <h3 className="font-semibold text-gray-900">Metadata</h3>
                            {initialData.publishedAt && (
                                <p className="text-gray-600">
                                    Published: {new Date(initialData.publishedAt).toLocaleDateString()}
                                </p>
                            )}
                            {initialData.updatedAt && (
                                <p className="text-gray-600">
                                    Updated: {new Date(initialData.updatedAt).toLocaleDateString()}
                                </p>
                            )}
                            {initialData.views !== undefined && (
                                <p className="text-gray-600">
                                    Views: {initialData.views.toLocaleString()}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
