import { ApiResponse, BlogPost, ContactForm, Project } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-worker.your-domain.workers.dev";

class ApiClient {
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${API_BASE_URL}${endpoint}`;

        const config: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("API request failed:", error);
            throw error;
        }
    }

    // Blog Posts API
    async getBlogPosts(page: number = 1, limit: number = 10): Promise<ApiResponse<BlogPost[]>> {
        return this.request<BlogPost[]>(`/api/posts?page=${page}&limit=${limit}`);
    }

    async getBlogPost(slug: string): Promise<ApiResponse<BlogPost>> {
        return this.request<BlogPost>(`/api/posts/${slug}`);
    }

    async getFeaturedPosts(): Promise<ApiResponse<BlogPost[]>> {
        return this.request<BlogPost[]>("/api/posts/featured");
    }

    // Projects API
    async getProjects(): Promise<ApiResponse<Project[]>> {
        return this.request<Project[]>("/api/projects");
    }

    async getProject(id: string): Promise<ApiResponse<Project>> {
        return this.request<Project>(`/api/projects/${id}`);
    }

    async getFeaturedProjects(): Promise<ApiResponse<Project[]>> {
        return this.request<Project[]>("/api/projects/featured");
    }

    // Contact API
    async sendContactForm(data: ContactForm): Promise<ApiResponse<{ message: string }>> {
        return this.request<{ message: string }>("/api/contact", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    // Analytics API
    async trackPageView(path: string): Promise<void> {
        try {
            await this.request("/api/analytics/pageview", {
                method: "POST",
                body: JSON.stringify({ path, timestamp: new Date().toISOString() }),
            });
        } catch (error) {
            // Analytics tracking should fail silently
            console.warn("Analytics tracking failed:", error);
        }
    }
}

export const apiClient = new ApiClient();
