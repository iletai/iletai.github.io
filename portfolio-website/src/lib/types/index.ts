export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    updatedAt?: string;
    slug: string;
    author: {
        name: string;
        avatar?: string;
        bio?: string;
    };
    tags: string[];
    category: string;
    featured?: boolean;
    readingTime: number;
    coverImage?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
    category: string;
    status: 'completed' | 'in-progress' | 'planning';
    startDate: string;
    endDate?: string;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    agreement: boolean;
}

export interface SEOData {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
}
