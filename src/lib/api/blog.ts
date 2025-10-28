import { apiClient } from './client';
import { API_ENDPOINTS } from './config';
import {
    ApiResponse,
    BlogPost,
    BlogPostsParams,
    BlogPostsResponse,
    Category,
    Tag,
} from './types';

export interface CreateBlogPostRequest {
    title: string;
    slug: string;
    excerpt: string; // REQUIRED by backend
    content: string;
    coverImage?: string;
    categoryId?: string;
    tags?: string[]; // Backend expects 'tags', not 'tagIds'
    status: 'draft' | 'published' | 'archived';
    featured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

export interface UpdateBlogPostRequest extends Partial<CreateBlogPostRequest> {
    id: string;
}

export interface CreateCategoryRequest {
    name: string;
    slug: string;
    description?: string;
}

export interface CreateTagRequest {
    name: string;
    slug: string;
}

export class BlogService {
    // Get blog posts with pagination and filters
    async getBlogPosts(params?: BlogPostsParams): Promise<BlogPostsResponse['data']> {
        const queryParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value));
                }
            });
        }

        const endpoint = queryParams.toString()
            ? `${API_ENDPOINTS.BLOG_POSTS}?${queryParams.toString()}`
            : API_ENDPOINTS.BLOG_POSTS;

        const response = await apiClient.get<BlogPostsResponse>(endpoint);
        // Backend returns { data: { posts, totalCount, hasMore, page, limit } }
        // Extract the nested data object
        return response.data;
    }

    // Get featured blog posts
    async getFeaturedBlogPosts(limit?: number): Promise<ApiResponse<BlogPost[]>> {
        const endpoint = limit
            ? `${API_ENDPOINTS.BLOG_POSTS_FEATURED}?limit=${limit}`
            : API_ENDPOINTS.BLOG_POSTS_FEATURED;

        return apiClient.get<ApiResponse<BlogPost[]>>(endpoint);
    }

    // Get blog post by slug
    async getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
        return apiClient.get<ApiResponse<BlogPost>>(API_ENDPOINTS.BLOG_POST_BY_SLUG(slug));
    }

    // Get blog categories
    async getBlogCategories(): Promise<ApiResponse<Category[]>> {
        return apiClient.get<ApiResponse<Category[]>>(API_ENDPOINTS.BLOG_CATEGORIES);
    }

    // Get blog tags
    async getBlogTags(): Promise<ApiResponse<Tag[]>> {
        return apiClient.get<ApiResponse<Tag[]>>(API_ENDPOINTS.BLOG_TAGS);
    }

    // Search blog posts
    async searchBlogPosts(searchTerm: string, params?: Omit<BlogPostsParams, 'search'>): Promise<BlogPostsResponse['data']> {
        return this.getBlogPosts({ ...params, search: searchTerm });
    }

    // Get blog posts by category
    async getBlogPostsByCategory(categorySlug: string, params?: Omit<BlogPostsParams, 'category'>): Promise<BlogPostsResponse['data']> {
        return this.getBlogPosts({ ...params, category: categorySlug });
    }

    // Get blog posts by tag
    async getBlogPostsByTag(tagSlug: string, params?: Omit<BlogPostsParams, 'tag'>): Promise<BlogPostsResponse['data']> {
        return this.getBlogPosts({ ...params, tag: tagSlug });
    }

    // Get published blog posts only
    async getPublishedBlogPosts(params?: Omit<BlogPostsParams, 'status'>): Promise<BlogPostsResponse['data']> {
        return this.getBlogPosts({ ...params, status: 'published' });
    }

    // Get blog post by ID (uses UUID format)
    async getBlogPostById(id: string): Promise<ApiResponse<BlogPost>> {
        return apiClient.get<ApiResponse<BlogPost>>(API_ENDPOINTS.BLOG_POST_BY_ID(id));
    }

    // ✅ CRUD operations - Fully implemented in backend

    // Create blog post
    async createBlogPost(data: CreateBlogPostRequest): Promise<ApiResponse<BlogPost>> {
        return apiClient.post<ApiResponse<BlogPost>>(API_ENDPOINTS.BLOG_POSTS, data);
    }

    // Update blog post
    async updateBlogPost(id: string, data: Partial<CreateBlogPostRequest>): Promise<ApiResponse<BlogPost>> {
        return apiClient.put<ApiResponse<BlogPost>>(`${API_ENDPOINTS.BLOG_POSTS}/${id}`, data);
    }

    // Delete blog post
    async deleteBlogPost(id: string): Promise<ApiResponse<void>> {
        return apiClient.delete<ApiResponse<void>>(`${API_ENDPOINTS.BLOG_POSTS}/${id}`);
    }

    // Publish blog post (change status to published)
    async publishBlogPost(id: string): Promise<ApiResponse<BlogPost>> {
        return this.updateBlogPost(id, { status: 'published' });
    }

    // Unpublish blog post (change status to draft)
    async unpublishBlogPost(id: string): Promise<ApiResponse<BlogPost>> {
        return this.updateBlogPost(id, { status: 'draft' });
    }

    // Archive blog post
    async archiveBlogPost(id: string): Promise<ApiResponse<BlogPost>> {
        return this.updateBlogPost(id, { status: 'archived' });
    }

    // ✅ Category Management - Fully implemented in backend

    // Create category
    async createCategory(data: CreateCategoryRequest): Promise<ApiResponse<Category>> {
        return apiClient.post<ApiResponse<Category>>(API_ENDPOINTS.BLOG_CATEGORIES, data);
    }

    // Delete category
    async deleteCategory(id: string): Promise<ApiResponse<void>> {
        return apiClient.delete<ApiResponse<void>>(`${API_ENDPOINTS.BLOG_CATEGORIES}/${id}`);
    }

    // ✅ Tag Management - Fully implemented in backend

    // Create tag
    async createTag(data: CreateTagRequest): Promise<ApiResponse<Tag>> {
        return apiClient.post<ApiResponse<Tag>>(API_ENDPOINTS.BLOG_TAGS, data);
    }

    // Delete tag
    async deleteTag(id: string): Promise<ApiResponse<void>> {
        return apiClient.delete<ApiResponse<void>>(`${API_ENDPOINTS.BLOG_TAGS}/${id}`);
    }
}

export const blogService = new BlogService();
