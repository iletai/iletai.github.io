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

export class BlogService {
    // Get blog posts with pagination and filters
    async getBlogPosts(params?: BlogPostsParams): Promise<BlogPostsResponse> {
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

        return apiClient.get<BlogPostsResponse>(endpoint);
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
    async searchBlogPosts(searchTerm: string, params?: Omit<BlogPostsParams, 'search'>): Promise<BlogPostsResponse> {
        return this.getBlogPosts({ ...params, search: searchTerm });
    }

    // Get blog posts by category
    async getBlogPostsByCategory(categorySlug: string, params?: Omit<BlogPostsParams, 'category'>): Promise<BlogPostsResponse> {
        return this.getBlogPosts({ ...params, category: categorySlug });
    }

    // Get blog posts by tag
    async getBlogPostsByTag(tagSlug: string, params?: Omit<BlogPostsParams, 'tag'>): Promise<BlogPostsResponse> {
        return this.getBlogPosts({ ...params, tag: tagSlug });
    }

    // Get published blog posts only
    async getPublishedBlogPosts(params?: Omit<BlogPostsParams, 'status'>): Promise<BlogPostsResponse> {
        return this.getBlogPosts({ ...params, status: 'published' });
    }
}

export const blogService = new BlogService();
