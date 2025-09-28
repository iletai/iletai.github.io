import { apiClient } from './client';
import { API_ENDPOINTS } from './config';
import {
    AnalyticsSummary,
    ApiResponse,
    PageView,
    PageViewRequest,
    PageViewsParams,
} from './types';

export class AnalyticsService {
    // Track page view
    async trackPageView(data: PageViewRequest): Promise<ApiResponse<{ id: string; message: string }>> {
        try {
            return await apiClient.post<ApiResponse<{ id: string; message: string }>>(
                API_ENDPOINTS.ANALYTICS_TRACK,
                data
            );
        } catch (error) {
            // Analytics tracking should fail silently in production
            console.warn('Analytics tracking failed:', error);
            // Return a mock response to prevent errors in the UI
            return {
                data: {
                    id: 'mock-id',
                    message: 'Analytics tracking failed silently'
                }
            };
        }
    }

    // Track page view with automatic data collection
    async trackCurrentPage(additionalData?: Partial<PageViewRequest>): Promise<void> {
        if (typeof window === 'undefined') return;

        const pageViewData: PageViewRequest = {
            path: window.location.pathname,
            userAgent: navigator.userAgent,
            sessionId: this.getOrCreateSessionId(),
            ...additionalData
        };

        await this.trackPageView(pageViewData);
    }

    // Get page views (Admin only)
    async getPageViews(params?: PageViewsParams): Promise<ApiResponse<PageView[]>> {
        const queryParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value));
                }
            });
        }

        const endpoint = queryParams.toString()
            ? `${API_ENDPOINTS.ANALYTICS_PAGEVIEWS}?${queryParams.toString()}`
            : API_ENDPOINTS.ANALYTICS_PAGEVIEWS;

        return apiClient.get<ApiResponse<PageView[]>>(endpoint);
    }

    // Get analytics summary (Admin only)
    async getAnalyticsSummary(startDate?: string, endDate?: string): Promise<AnalyticsSummary> {
        const queryParams = new URLSearchParams();

        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);

        const endpoint = queryParams.toString()
            ? `${API_ENDPOINTS.ANALYTICS_SUMMARY}?${queryParams.toString()}`
            : API_ENDPOINTS.ANALYTICS_SUMMARY;

        return apiClient.get<AnalyticsSummary>(endpoint);
    }

    // Get popular pages (Admin only)
    async getPopularPages(limit?: number): Promise<ApiResponse<Array<{ path: string; viewCount: number }>>> {
        const endpoint = limit
            ? `${API_ENDPOINTS.ANALYTICS_POPULAR}?limit=${limit}`
            : API_ENDPOINTS.ANALYTICS_POPULAR;

        return apiClient.get<ApiResponse<Array<{ path: string; viewCount: number }>>>(endpoint);
    }

    // Get page views for a specific path (Admin only)
    async getPageViewsForPath(
        path: string,
        params?: Omit<PageViewsParams, 'path'>
    ): Promise<ApiResponse<PageView[]>> {
        return this.getPageViews({ ...params, path });
    }

    // Get page views for date range (Admin only)
    async getPageViewsForDateRange(
        startDate: string,
        endDate: string,
        params?: Omit<PageViewsParams, 'startDate' | 'endDate'>
    ): Promise<ApiResponse<PageView[]>> {
        return this.getPageViews({ ...params, startDate, endDate });
    }

    // Helper: Get or create session ID
    private getOrCreateSessionId(): string {
        if (typeof window === 'undefined') return 'ssr-session';

        const sessionKey = 'analytics_session_id';
        let sessionId = sessionStorage.getItem(sessionKey);

        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            sessionStorage.setItem(sessionKey, sessionId);
        }

        return sessionId;
    }

    // Helper: Clear session
    clearSession(): void {
        if (typeof window === 'undefined') return;
        sessionStorage.removeItem('analytics_session_id');
    }

    // Helper: Check if analytics is enabled (for GDPR compliance)
    isAnalyticsEnabled(): boolean {
        if (typeof window === 'undefined') return false;

        // Check for consent cookie or localStorage setting
        const consent = localStorage.getItem('analytics_consent');
        return consent === 'true';
    }

    // Helper: Enable analytics (for GDPR compliance)
    enableAnalytics(): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem('analytics_consent', 'true');
    }

    // Helper: Disable analytics (for GDPR compliance)
    disableAnalytics(): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem('analytics_consent', 'false');
        this.clearSession();
    }
}

export const analyticsService = new AnalyticsService();
