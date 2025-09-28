// Export all API services
export * from './client';
export * from './config';
export * from './types';

// Service instances
export { analyticsService } from './analytics';
export { authService } from './auth';
export { blogService } from './blog';
export { contactService } from './contact';
export { projectsService } from './projects';

// Service classes
export { AnalyticsService } from './analytics';
export { AuthService } from './auth';
export { BlogService } from './blog';
export { ContactService } from './contact';
export { ProjectsService } from './projects';

// Import services for main API object
import { analyticsService } from './analytics';
import { authService } from './auth';
import { blogService } from './blog';
import { contactService } from './contact';
import { projectsService } from './projects';

// Main API object with all services
export const api = {
    auth: authService,
    blog: blogService,
    projects: projectsService,
    contact: contactService,
    analytics: analyticsService,
};

// Initialize authentication on import (restore token from storage)
if (typeof window !== 'undefined') {
    authService.initializeAuth();
}
