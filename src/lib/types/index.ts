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

// Admin Authentication Types
export interface User {
	id: string;
	email: string;
	name: string;
	role: 'admin' | 'editor';
	avatar?: string;
	createdAt: string;
	lastLoginAt?: string;
}

export interface AuthSession {
	user: User;
	token: string;
	expiresAt: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
	rememberMe?: boolean;
}

// Admin Dashboard Types
export interface DashboardStats {
	totalProjects: number;
	totalBlogPosts: number;
	totalContacts: number;
	monthlyViews: number;
	recentProjects: AdminProject[];
	recentPosts: AdminBlogPost[];
	recentContacts: ContactMessage[];
}

export interface AdminProject extends Omit<Project, 'status'> {
	status: 'draft' | 'published' | 'archived';
	projectStatus: 'completed' | 'in-progress' | 'planning';
	createdAt: string;
	updatedAt: string;
	authorId: string;
	views?: number;
}

export interface AdminBlogPost extends BlogPost {
	status: 'draft' | 'published' | 'archived';
	createdAt: string;
	updatedAt: string;
	authorId: string;
	views?: number;
	seoData?: SEOData;
}

export interface ContactMessage {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	subject: string;
	message: string;
	status: 'new' | 'read' | 'replied' | 'archived';
	createdAt: string;
	readAt?: string;
	repliedAt?: string;
	priority: 'low' | 'normal' | 'high';
}
