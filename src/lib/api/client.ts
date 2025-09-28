import {
    API_CONFIG,
    DEFAULT_HEADERS,
    ERROR_MESSAGES,
    HTTP_STATUS
} from './config';

// API Client Error Class
export class ApiError extends Error {
    public status: number;
    public details?: Record<string, unknown>;

    constructor(message: string, status: number, details?: Record<string, unknown>) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }
}

// Request Options Interface
interface RequestOptions {
    headers?: Record<string, string>;
    timeout?: number;
    retries?: number;
}

// API Client Implementation
class ApiClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;
    private authToken: string | null = null;

    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.defaultHeaders = { ...DEFAULT_HEADERS };
    }

    // Set authentication token
    setAuthToken(token: string | null) {
        this.authToken = token;
    }

    // Get authentication headers
    private getAuthHeaders(): Record<string, string> {
        const headers = { ...this.defaultHeaders };
        if (this.authToken) {
            headers.Authorization = `Bearer ${this.authToken}`;
        }
        return headers;
    }

    // Build full URL
    private buildUrl(endpoint: string): string {
        return `${this.baseURL}${endpoint}`;
    }

    // Handle API responses
    private async handleResponse<T>(response: Response): Promise<T> {
        const contentType = response.headers.get('Content-Type');
        const isJson = contentType?.includes('application/json');

        let responseData: unknown;

        try {
            responseData = isJson ? await response.json() : await response.text();
        } catch {
            throw new ApiError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        if (!response.ok) {
            const errorData = responseData as { error?: string; details?: Record<string, unknown> };
            const errorMessage = errorData?.error || this.getErrorMessage(response.status);
            const errorDetails = errorData?.details;
            throw new ApiError(errorMessage, response.status, errorDetails);
        }

        return responseData as T;
    }

    // Get error message based on status code
    private getErrorMessage(status: number): string {
        switch (status) {
            case HTTP_STATUS.BAD_REQUEST:
                return ERROR_MESSAGES.VALIDATION_ERROR;
            case HTTP_STATUS.UNAUTHORIZED:
                return ERROR_MESSAGES.UNAUTHORIZED;
            case HTTP_STATUS.NOT_FOUND:
                return ERROR_MESSAGES.NOT_FOUND;
            case HTTP_STATUS.INTERNAL_SERVER_ERROR:
                return ERROR_MESSAGES.SERVER_ERROR;
            case HTTP_STATUS.SERVICE_UNAVAILABLE:
                return ERROR_MESSAGES.SERVER_ERROR;
            default:
                return ERROR_MESSAGES.UNKNOWN_ERROR;
        }
    }

    // Retry mechanism
    private async withRetry<T>(
        operation: () => Promise<T>,
        retries: number = API_CONFIG.RETRY_ATTEMPTS
    ): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            if (retries > 0 && this.shouldRetry(error)) {
                await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
                return this.withRetry(operation, retries - 1);
            }
            throw error;
        }
    }

    // Check if request should be retried
    private shouldRetry(error: unknown): boolean {
        if (error instanceof ApiError) {
            // Don't retry client errors (4xx)
            return error.status >= 500;
        }
        // Retry network errors
        return true;
    }

    // Make HTTP request
    private async request<T>(
        method: string,
        endpoint: string,
        data?: unknown,
        options?: RequestOptions
    ): Promise<T> {
        const url = this.buildUrl(endpoint);
        const headers = {
            ...this.getAuthHeaders(),
            ...options?.headers,
        };

        const config: RequestInit = {
            method,
            headers,
            signal: AbortSignal.timeout(options?.timeout || API_CONFIG.TIMEOUT),
        };

        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            config.body = JSON.stringify(data);
        }

        const operation = async () => {
            try {
                const response = await fetch(url, config);
                return this.handleResponse<T>(response);
            } catch (error) {
                if (error instanceof TypeError || (error as Error)?.name === 'AbortError') {
                    throw new ApiError(ERROR_MESSAGES.NETWORK_ERROR, 0);
                }
                throw error;
            }
        };

        return this.withRetry(operation, options?.retries);
    }

    // HTTP Methods
    async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
        return this.request<T>('GET', endpoint, undefined, options);
    }

    async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
        return this.request<T>('POST', endpoint, data, options);
    }

    async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
        return this.request<T>('PUT', endpoint, data, options);
    }

    async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
        return this.request<T>('PATCH', endpoint, data, options);
    }

    async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
        return this.request<T>('DELETE', endpoint, undefined, options);
    }

    // Health check
    async healthCheck(): Promise<{ status: string; timestamp: string }> {
        return this.get('/health');
    }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export helper functions for common patterns
export const withAuth = (token: string) => {
    apiClient.setAuthToken(token);
    return apiClient;
};

export const clearAuth = () => {
    apiClient.setAuthToken(null);
};
