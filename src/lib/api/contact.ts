import { apiClient } from './client';
import { API_ENDPOINTS } from './config';
import {
    ApiResponse,
    ContactRequest,
    ContactSubmission,
    ContactSubmissionsParams,
} from './types';

export class ContactService {
    // Submit contact form
    async submitContactForm(data: ContactRequest): Promise<ApiResponse<{ submissionId: string; message: string }>> {
        return apiClient.post<ApiResponse<{ submissionId: string; message: string }>>(
            API_ENDPOINTS.CONTACT,
            data
        );
    }

    // Get contact submissions (Admin only)
    async getContactSubmissions(params?: ContactSubmissionsParams): Promise<ApiResponse<ContactSubmission[]>> {
        const queryParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value));
                }
            });
        }

        const endpoint = queryParams.toString()
            ? `${API_ENDPOINTS.CONTACT_SUBMISSIONS}?${queryParams.toString()}`
            : API_ENDPOINTS.CONTACT_SUBMISSIONS;

        return apiClient.get<ApiResponse<ContactSubmission[]>>(endpoint);
    }

    // Get contact submission by ID (Admin only)
    async getContactSubmissionById(id: string): Promise<ApiResponse<ContactSubmission>> {
        return apiClient.get<ApiResponse<ContactSubmission>>(API_ENDPOINTS.CONTACT_SUBMISSION_BY_ID(id));
    }

    // Get submissions by status (Admin only)
    async getSubmissionsByStatus(
        status: 'new' | 'read' | 'replied' | 'archived',
        params?: Omit<ContactSubmissionsParams, 'status'>
    ): Promise<ApiResponse<ContactSubmission[]>> {
        return this.getContactSubmissions({ ...params, status });
    }

    // Get new submissions (Admin only)
    async getNewSubmissions(params?: Omit<ContactSubmissionsParams, 'status'>): Promise<ApiResponse<ContactSubmission[]>> {
        return this.getSubmissionsByStatus('new', params);
    }

    // Get read submissions (Admin only)
    async getReadSubmissions(params?: Omit<ContactSubmissionsParams, 'status'>): Promise<ApiResponse<ContactSubmission[]>> {
        return this.getSubmissionsByStatus('read', params);
    }

    // Get submissions with pagination (Admin only)
    async getSubmissionsPage(
        page: number,
        limit: number = 10,
        params?: Omit<ContactSubmissionsParams, 'page' | 'limit'>
    ): Promise<ApiResponse<ContactSubmission[]>> {
        return this.getContactSubmissions({ ...params, page, limit });
    }

    // Update submission status (would need additional API endpoint)
    async updateSubmissionStatus(id: string, status: 'new' | 'read' | 'replied' | 'archived'): Promise<ApiResponse<ContactSubmission>> {
        // This would require a PATCH endpoint in the backend
        return apiClient.patch<ApiResponse<ContactSubmission>>(
            API_ENDPOINTS.CONTACT_SUBMISSION_BY_ID(id),
            { status }
        );
    }

    // Mark submission as read (would need additional API endpoint)
    async markAsRead(id: string): Promise<ApiResponse<ContactSubmission>> {
        return this.updateSubmissionStatus(id, 'read');
    }

    // Archive submission (would need additional API endpoint)
    async archiveSubmission(id: string): Promise<ApiResponse<ContactSubmission>> {
        return this.updateSubmissionStatus(id, 'archived');
    }
}

export const contactService = new ContactService();
