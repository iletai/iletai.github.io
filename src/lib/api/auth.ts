import { apiClient } from './client';
import { API_ENDPOINTS } from './config';
import {
    ApiResponse,
    AuthSuccessResponse,
    LoginRequest,
    SignupRequest,
    User,
} from './types';

export class AuthService {
    // User signup
    async signup(userData: SignupRequest): Promise<AuthSuccessResponse> {
        return apiClient.post<AuthSuccessResponse>(API_ENDPOINTS.SIGNUP, userData);
    }

    // User login
    async login(credentials: LoginRequest): Promise<AuthSuccessResponse> {
        return apiClient.post<AuthSuccessResponse>(API_ENDPOINTS.LOGIN, credentials);
    }

    // Get current user
    async getCurrentUser(): Promise<ApiResponse<User>> {
        return apiClient.get<ApiResponse<User>>(API_ENDPOINTS.USER);
    }

    // Logout (clear token)
    logout(): void {
        apiClient.setAuthToken(null);
        // Clear from localStorage/sessionStorage if needed
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            sessionStorage.removeItem('auth_token');
        }
    }

    // Set authentication token
    setAuthToken(token: string): void {
        apiClient.setAuthToken(token);
        // Store in localStorage for persistence
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
        }
    }

    // Get stored token
    getStoredToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    }

    // Initialize auth (restore token from storage)
    initializeAuth(): void {
        const token = this.getStoredToken();
        if (token) {
            this.setAuthToken(token);
        }
    }
}

export const authService = new AuthService();
