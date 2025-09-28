// API Response Types based on OpenAPI specification

// Common Response Wrapper
export interface ApiResponse<T> {
    data: T;
}

export interface PaginatedResponse<T> {
    data: T[];
    totalCount?: number;
    total?: number;
    hasMore?: boolean;
    page: number;
    limit: number;
}

// Authentication Types
export interface SignupRequest {
    email: string;
    password: string;
    fullName?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthSuccessResponse {
    data: {
        user: User;
        accessToken: string;
        token: string;
        requiresEmailConfirmation?: boolean;
    };
}

export interface User {
    id: string;
    email: string;
    fullName?: string;
    createdAt: string;
}

// Blog Types
export interface Author {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    publishedAt: string;
    updatedAt: string;
    featured: boolean;
    readingTime: number;
    coverImage?: string;
    status: 'draft' | 'published' | 'archived';
    author: Author;
    category?: Category;
    tags: Tag[];
    views?: number;
}

export interface BlogPostsResponse {
    data: {
        posts: BlogPost[];
        totalCount: number;
        hasMore: boolean;
        page: number;
        limit: number;
    };
}

// Project Types
export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    category: string;
    status: 'completed' | 'in-progress' | 'planning';
    startDate?: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
    views?: number;
}

export interface ProjectsResponse {
    data: {
        data: Project[];
        total: number;
        page: number;
        limit: number;
    };
}

// Contact Types
export interface ContactRequest {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    agreement: boolean;
}

export interface ContactSubmission {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    priority?: 'low' | 'normal' | 'high';
    createdAt: string;
    updatedAt: string;
    readAt?: string;
}

// Analytics Types
export interface PageViewRequest {
    path: string;
    userAgent?: string;
    sessionId?: string;
}

export interface PageView {
    id: string;
    path: string;
    userAgent?: string;
    sessionId?: string;
    ipAddress?: string;
    createdAt: string;
}

export interface AnalyticsSummary {
    data: {
        totalViews: number;
        uniquePages: number;
        topPages: Array<{
            path: string;
            viewCount: number;
        }>;
        recentViews: PageView[];
    };
}

// Dashboard Types
export interface DashboardStats {
    totalProjects: number;
    totalBlogPosts: number;
    totalContacts: number;
    monthlyViews: number;
    recentProjects: Project[];
    recentPosts: BlogPost[];
    recentContacts: ContactSubmission[];
}

// Error Types
export interface ErrorResponse {
    error: string;
    details?: Record<string, unknown>;
}

// API Query Parameters
export interface BlogPostsParams {
    status?: 'draft' | 'published' | 'archived';
    category?: string;
    tag?: string;
    featured?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}

export interface ProjectsParams {
    featured?: boolean;
    status?: 'completed' | 'in-progress' | 'planning';
    technology?: string;
    category?: string;
    page?: number;
    limit?: number;
}

export interface ContactSubmissionsParams {
    status?: 'new' | 'read' | 'replied' | 'archived';
    page?: number;
    limit?: number;
}

export interface PageViewsParams {
    path?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
}
