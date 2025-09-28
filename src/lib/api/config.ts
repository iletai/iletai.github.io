// API Configuration
export const API_CONFIG = {
    BASE_URL:
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        'https://api.iletai.qzz.io',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
    // Health & System
    HEALTH: '/health',

    // Authentication
    SIGNUP: '/api/signup',
    LOGIN: '/api/login',
    USER: '/api/user',

    // Blog Posts
    BLOG_POSTS: '/api/posts',
    BLOG_POSTS_FEATURED: '/api/posts/featured',
    BLOG_POST_BY_SLUG: (slug: string) => `/api/posts/${slug}`,
    BLOG_CATEGORIES: '/api/blog/categories',
    BLOG_TAGS: '/api/blog/tags',

    // Projects
    PROJECTS: '/api/projects',
    PROJECTS_FEATURED: '/api/projects/featured',
    PROJECT_BY_ID: (id: string) => `/api/projects/${id}`,

    // Contact
    CONTACT: '/api/contact',
    CONTACT_SUBMISSIONS: '/api/contact/submissions',
    CONTACT_SUBMISSION_BY_ID: (id: string) => `/api/contact/submissions/${id}`,

    // Analytics
    ANALYTICS_TRACK: '/api/analytics/track',
    ANALYTICS_PAGEVIEWS: '/api/analytics/pageviews',
    ANALYTICS_SUMMARY: '/api/analytics/summary',
    ANALYTICS_POPULAR: '/api/analytics/popular',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
} as const;

// Request Headers
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng thử lại.',
    SERVER_ERROR: 'Lỗi máy chủ. Vui lòng thử lại sau.',
    VALIDATION_ERROR: 'Dữ liệu không hợp lệ.',
    UNAUTHORIZED: 'Bạn không có quyền truy cập.',
    NOT_FOUND: 'Không tìm thấy dữ liệu.',
    UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định.',
} as const;
