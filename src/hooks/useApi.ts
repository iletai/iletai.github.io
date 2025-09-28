import {
    analyticsService,
    ApiError,
    authService,
    blogService,
    contactService,
    projectsService
} from '@/lib/api';
import {
    BlogPostsParams,
    ContactRequest,
    ContactSubmissionsParams,
    DashboardStats,
    PageViewRequest,
    ProjectsParams,
    ProjectsResponse,
    User
} from '@/lib/api/types';
import { useCallback, useEffect, useState } from 'react';

// Generic hook for API calls
export function useApiCall<T>(
    apiCall: () => Promise<T>,
    dependencies: unknown[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await apiCall();

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    const refetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiCall();
            setData(result);
        } catch (err) {
            const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [apiCall]);

    return { data, loading, error, refetch };
}

// Blog hooks
export function useBlogPosts(params?: BlogPostsParams) {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await blogService.getBlogPosts(params);

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [params]); // OK since params is passed from component props

    return { data, loading, error };
}

export function useFeaturedBlogPosts(limit?: number) {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await blogService.getFeaturedBlogPosts(limit);

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [limit]);

    return { data, loading, error };
}

export function useBlogPost(slug: string) {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await blogService.getBlogPostBySlug(slug);

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [slug]);

    return { data, loading, error };
}

export function useBlogCategories() {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await blogService.getBlogCategories();

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchCategories();

        return () => {
            isCancelled = true;
        };
    }, []); // Empty deps - only run once

    return { data, loading, error };
}

export function useBlogTags() {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchTags = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await blogService.getBlogTags();

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchTags();

        return () => {
            isCancelled = true;
        };
    }, []); // Empty deps - only run once

    return { data, loading, error };
}



// Project hooks
export function useProjects(params?: ProjectsParams) {
    const [data, setData] = useState<ProjectsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await projectsService.getProjects(params);

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'Error loading projects';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchProjects();

        return () => {
            isCancelled = true;
        };
    }, [params]);

    const refetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await projectsService.getProjects(params);
            setData(result);
        } catch (err) {
            const errorMessage = err instanceof ApiError ? err.message : 'Error loading projects';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [params]);

    return { data, loading, error, refetch };
}

export function useFeaturedProjects(limit?: number) {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await projectsService.getFeaturedProjects(limit);

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [limit]);

    return { data, loading, error };
}

export function useProject(id: string) {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await projectsService.getProjectById(id);

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [id]);

    return { data, loading, error };
}

// Contact hook for form submission
export function useContactForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const submitForm = useCallback(async (data: ContactRequest) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            await contactService.submitContactForm(data);
            setSuccess(true);
        } catch (err) {
            const errorMessage = err instanceof ApiError ? err.message : 'Form submission failed';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setError(null);
        setSuccess(false);
        setLoading(false);
    }, []);

    return { submitForm, loading, error, success, reset };
}

// Analytics hooks
export function usePageTracking() {
    const trackPage = useCallback(async (data?: Partial<PageViewRequest>) => {
        try {
            await analyticsService.trackCurrentPage(data);
        } catch (error) {
            console.warn('Page tracking failed:', error);
        }
    }, []);

    return { trackPage };
}

// Auto-track page views
export function useAutoPageTracking() {
    const { trackPage } = usePageTracking();

    useEffect(() => {
        // Track initial page load
        trackPage();

        // Track page visibility changes (user returning to tab)
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                trackPage();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [trackPage]);
}

// Admin hooks
export function useContactSubmissions(params?: ContactSubmissionsParams) {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await contactService.getContactSubmissions(params);

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [params]);

    return { data, loading, error };
}

export function useAnalyticsSummary(startDate?: string, endDate?: string) {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await analyticsService.getAnalyticsSummary(startDate, endDate);

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    const errorMessage = err instanceof ApiError ? err.message : 'An error occurred';
                    setError(errorMessage);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [startDate, endDate]);

    return { data, loading, error };
}

// Dashboard hook for admin panel
export function useDashboardStats(): {
    data: DashboardStats | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
} {
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch all dashboard data in parallel
            const [
                projectsResponse,
                postsResponse,
                contactsResponse,
                analyticsResponse
            ] = await Promise.allSettled([
                projectsService.getFeaturedProjects(5),
                blogService.getFeaturedBlogPosts(5),
                contactService.getNewSubmissions({ limit: 5 }),
                analyticsService.getAnalyticsSummary()
            ]);

            // Extract data from successful responses
            const projects = projectsResponse.status === 'fulfilled' ? projectsResponse.value.data : [];
            const posts = postsResponse.status === 'fulfilled' ? postsResponse.value.data : [];
            const contacts = contactsResponse.status === 'fulfilled' ? contactsResponse.value.data : [];
            const analytics = analyticsResponse.status === 'fulfilled' ? analyticsResponse.value.data : null;

            const dashboardStats: DashboardStats = {
                totalProjects: projects.length || 0,
                totalBlogPosts: posts.length || 0,
                totalContacts: contacts.length || 0,
                monthlyViews: analytics?.totalViews || 0,
                recentProjects: projects.slice(0, 3),
                recentPosts: posts.slice(0, 3),
                recentContacts: contacts.slice(0, 3),
            };

            setData(dashboardStats);
        } catch (err) {
            const errorMessage = err instanceof ApiError ? err.message : 'Error loading dashboard data';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return { data, loading, error, refetch: fetchDashboardData };
}

// Authentication hooks
export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authService.login({ email, password });
            setUser(response.data.user);
            authService.setAuthToken(response.data.token);
        } catch (err) {
            const errorMessage = err instanceof ApiError ? err.message : 'Login failed';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
    }, []);

    const checkAuth = useCallback(async () => {
        try {
            setLoading(true);
            const response = await authService.getCurrentUser();
            setUser(response.data);
        } catch {
            setUser(null);
            authService.logout();
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = authService.getStoredToken();
        if (token) {
            checkAuth();
        } else {
            setLoading(false);
        }
    }, [checkAuth]);

    return { user, loading, error, login, logout, checkAuth };
}
