'use client';

import { AuthSession, LoginCredentials, User } from '@/lib/types';
import { getTokenFromStorage, isTokenExpired, removeTokenFromStorage, setTokenInStorage } from '@/lib/utils';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: User | null;
    session: AuthSession | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
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
            const response = await fetch('/api/auth/verify', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Token verification failed');
            }

            const { data } = await response.json();
            setUser(data.user);
            setSession(data.session);
        } catch (error) {
            console.error('Token verification failed:', error);
            removeTokenFromStorage();
            setUser(null);
            setSession(null);
            throw error;
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Đăng nhập thất bại');
            }

            const { data } = await response.json();
            const { user, session } = data;

            setUser(user);
            setSession(session);
            setTokenInStorage(session.token);

            // Set up token refresh if needed
            if (credentials.rememberMe) {
                scheduleTokenRefresh(session.expiresAt);
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setSession(null);
        removeTokenFromStorage();

        // Optional: Call logout endpoint to invalidate token on server
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session?.token}`,
            },
        }).catch(console.error);
    };

    const refreshSession = async () => {
        try {
            const currentToken = getTokenFromStorage();
            if (!currentToken) {
                throw new Error('No token available');
            }

            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const { data } = await response.json();
            setSession(data.session);
            setTokenInStorage(data.session.token);

            scheduleTokenRefresh(data.session.expiresAt);
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
