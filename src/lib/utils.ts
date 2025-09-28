import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatDateTime(date: string | Date, locale: string = 'vi-VN'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens
}

export function excerpt(content: string, length: number = 150): string {
    if (content.length <= length) return content;
    return content.substr(0, length).trim() + '...';
}

// Auth utilities
export function getTokenFromStorage(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token');
}

export function setTokenInStorage(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('admin_token', token);
}

export function removeTokenFromStorage(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('admin_token');
}

export function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}

// Validation utilities
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isStrongPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Status utilities
export function getStatusColor(status: string): string {
    const statusColors = {
        // Contact status
        new: 'bg-blue-100 text-blue-800',
        read: 'bg-gray-100 text-gray-800',
        replied: 'bg-green-100 text-green-800',
        archived: 'bg-gray-100 text-gray-600',

        // Content status
        draft: 'bg-yellow-100 text-yellow-800',
        published: 'bg-green-100 text-green-800',

        // Project status
        completed: 'bg-green-100 text-green-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        planning: 'bg-purple-100 text-purple-800',

        // Priority
        low: 'bg-gray-100 text-gray-800',
        normal: 'bg-blue-100 text-blue-800',
        high: 'bg-red-100 text-red-800',
    };

    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
}
