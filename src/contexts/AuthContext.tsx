'use client';

import { authService } from '@/lib/api/auth';
import type { User as ApiUser } from '@/lib/api/types';
import type { AuthSession, LoginCredentials } from '@/lib/types';
import { getTokenFromStorage, isTokenExpired, removeTokenFromStorage, setTokenInStorage } from '@/lib/utils';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Map API User to local User type with default values
function mapApiUserToLocal(apiUser: ApiUser): AuthSession['user'] {
    return {
        id: apiUser.id,
        email: apiUser.email,
        name: apiUser.fullName || apiUser.email.split('@')[0], // Fallback to email username
        role: 'admin', // Default role since backend doesn't provide it yet
        createdAt: apiUser.createdAt,
        lastLoginAt: new Date().toISOString(),
    };
}

interface AuthContextType {
    user: AuthSession['user'] | null;
    session: AuthSession | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthSession['user'] | null>(null);
    const [session, setSession] = useState<AuthSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user && !!session;

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = getTokenFromStorage();
                if (token && !isTokenExpired(token)) {
                    await verifyAndSetSession(token);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                setUser(null);
                setSession(null);
                removeTokenFromStorage();
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []); // Safe to ignore logout dependency as it doesn't change

    const verifyAndSetSession = async (token: string) => {
        try {
            // Set token to API client
            authService.setAuthToken(token);

            // Get current user from backend
            const response = await authService.getCurrentUser();

            // Map API user to local user type
            const localUser = mapApiUserToLocal(response.data);

            // Create session
            const authSession: AuthSession = {
                user: localUser,
                token,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
            };

            setUser(localUser);
            setSession(authSession);
        } catch (error) {
            console.error('Token verification failed:', error);
            removeTokenFromStorage();
            authService.logout();
            setUser(null);
            setSession(null);
            throw error;
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);

            // Call backend API through authService
            const response = await authService.login({
                email: credentials.email,
                password: credentials.password,
            });

            // Map API user to local user type
            const localUser = mapApiUserToLocal(response.data.user);

            // Use accessToken or token from response
            const token = response.data.accessToken || response.data.token;

            // Create auth session
            const authSession: AuthSession = {
                user: localUser,
                token,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
            };

            setUser(localUser);
            setSession(authSession);
            setTokenInStorage(token);
            authService.setAuthToken(token);

            // Set up token refresh if needed
            if (credentials.rememberMe) {
                scheduleTokenRefresh(authSession.expiresAt);
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error instanceof Error ? error : new Error('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setSession(null);
        removeTokenFromStorage();
        authService.logout();
    };

    const refreshSession = async () => {
        try {
            const currentToken = getTokenFromStorage();
            if (!currentToken) {
                throw new Error('No token available');
            }

            // Verify token is still valid
            await verifyAndSetSession(currentToken);
        } catch (error) {
            console.error('Session refresh failed:', error);
            logout();
        }
    };

    const scheduleTokenRefresh = (expiresAt: string) => {
        const expiresIn = new Date(expiresAt).getTime() - Date.now();
        const refreshIn = expiresIn - 5 * 60 * 1000; // Refresh 5 minutes before expiry

        if (refreshIn > 0) {
            setTimeout(refreshSession, refreshIn);
        }
    };

    const value = {
        user,
        session,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshSession,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
