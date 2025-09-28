import { apiClient } from './client';
import { API_ENDPOINTS } from './config';
import {
    ApiResponse,
    Project,
    ProjectsParams,
    ProjectsResponse,
} from './types';

export class ProjectsService {
    // Get projects with pagination and filters
    async getProjects(params?: ProjectsParams): Promise<ProjectsResponse> {
        const queryParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value));
                }
            });
        }

        const endpoint = queryParams.toString()
            ? `${API_ENDPOINTS.PROJECTS}?${queryParams.toString()}`
            : API_ENDPOINTS.PROJECTS;

        return apiClient.get<ProjectsResponse>(endpoint);
    }

    // Get featured projects
    async getFeaturedProjects(limit?: number): Promise<ApiResponse<Project[]>> {
        const endpoint = limit
            ? `${API_ENDPOINTS.PROJECTS_FEATURED}?limit=${limit}`
            : API_ENDPOINTS.PROJECTS_FEATURED;

        return apiClient.get<ApiResponse<Project[]>>(endpoint);
    }

    // Get project by ID
    async getProjectById(id: string): Promise<ApiResponse<Project>> {
        return apiClient.get<ApiResponse<Project>>(API_ENDPOINTS.PROJECT_BY_ID(id));
    }

    // Get projects by status
    async getProjectsByStatus(status: 'completed' | 'in-progress' | 'planning', params?: Omit<ProjectsParams, 'status'>): Promise<ProjectsResponse> {
        return this.getProjects({ ...params, status });
    }

    // Get projects by technology
    async getProjectsByTechnology(technology: string, params?: Omit<ProjectsParams, 'technology'>): Promise<ProjectsResponse> {
        return this.getProjects({ ...params, technology });
    }

    // Get projects by category
    async getProjectsByCategory(category: string, params?: Omit<ProjectsParams, 'category'>): Promise<ProjectsResponse> {
        return this.getProjects({ ...params, category });
    }

    // Get completed projects only
    async getCompletedProjects(params?: Omit<ProjectsParams, 'status'>): Promise<ProjectsResponse> {
        return this.getProjects({ ...params, status: 'completed' });
    }

    // Get projects with pagination
    async getProjectsPage(page: number, limit: number = 10, params?: Omit<ProjectsParams, 'page' | 'limit'>): Promise<ProjectsResponse> {
        return this.getProjects({ ...params, page, limit });
    }
}

export const projectsService = new ProjectsService();
