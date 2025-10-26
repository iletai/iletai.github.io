# Technology Stack Blueprint: Professional Portfolio Website with Blog

## 🔄 Updated for Existing Cloudflare Workers Backend

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Technology Stack Analysis](#technology-stack-analysis)
4. [Implementation Plan](#implementation-plan)
5. [Folder Structure](#folder-structure)
6. [Frontend Integration Examples](#frontend-integration-examples)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Domain & Backend Integration](#domain--backend-integration)
9. [Risks & Mitigation Strategies](#risks--mitigation-strategies)
10. [Deployment Guide](#deployment-guide)

---

## Executive Summary

This blueprint outlines a professional portfolio website with blog functionality using Next.js frontend that integrates with your **existing Cloudflare Workers serverless backend**.

**Key Technologies:**

- **Frontend**: Next.js 14+ (React, TypeScript, Tailwind CSS)
- **Backend**: Your existing Cloudflare Workers API (already deployed)
- **Deployment**: Vercel (frontend only)
- **CI/CD**: GitHub Actions (frontend deployment)
- **Domain Management**: Cloudflare DNS
- **Integration**: Direct API calls to your existing serverless backend

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                        Internet Traffic                         │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                  Cloudflare DNS                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐   │
│  │    mydomain.com         │  │    api.mydomain.com         │   │
│  │         ▼               │  │            ▼                │   │
│  │    ┌─────────┐          │  │    ┌──────────────────────┐  │   │
│  │    │ Vercel  │          │  │    │ Your Existing        │  │   │
│  │    │ Next.js │ ────────────────▶│ Cloudflare Workers   │  │   │
│  │    │Frontend │          │  │    │ API Backend          │  │   │
│  │    └─────────┘          │  │    │ (Already Deployed)   │  │   │
│  │                         │  │    └──────────────────────┘  │   │
└─────────────────────────────┘  └─────────────────────────────────┘
                                                │
                                                ▼
                                    ┌─────────────────────┐
                                    │   Database/         │
                                    │   External Services │
                                    │   (Your existing    │
                                    │    integrations)    │
                                    └─────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     Simplified CI/CD Pipeline                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │   GitHub    │───▶│   GitHub    │───▶│     Frontend        │  │
│  │     Push    │    │   Actions   │    │   Deployment        │  │
│  │  (Frontend) │    │ (Frontend   │    │   to Vercel         │  │
│  │             │    │   Only)     │    │                     │  │
│  └─────────────┘    └─────────────┘    └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**📝 Key Changes from Original Design:**

- ✅ **No API Gateway needed**: Direct integration with your existing Cloudflare Workers
- ✅ **Simplified CI/CD**: Only frontend deployment (backend already deployed)
- ✅ **Direct API calls**: Frontend calls your existing API endpoints directly
- ✅ **Reduced complexity**: Focus on frontend development and integration

---

## Technology Stack Analysis

### Frontend Stack (Next.js)

#### Core Framework

- **Next.js 14.2+**: App Router, Server Components, Static Generation
- **React 18+**: Hooks, Suspense, Server Components
- **TypeScript 5+**: Strict type checking, enhanced developer experience

#### Styling & UI

- **Tailwind CSS 3+**: Utility-first CSS framework
- **Headless UI**: Accessible UI components
- **Lucide React**: Modern icon library
- **next/font**: Optimized font loading

#### Content Management

- **Gray-matter**: YAML front matter parser
- **Remark/Rehype**: Markdown processing pipeline
- **Prism.js**: Syntax highlighting for code blocks
- **Reading-time**: Blog post reading time estimation

#### SEO & Performance

- **next/image**: Optimized image loading
- **next/head**: Meta tags and SEO optimization
- **Sitemap generation**: Automated XML sitemap
- **RSS feed**: Blog RSS generation

### Backend Integration (Your Existing Cloudflare Workers)

#### Integration Approach

- **Direct API calls**: Frontend directly calls your existing Cloudflare Workers endpoints
- **Environment-based URLs**: Configurable API endpoints for different environments
- **TypeScript API client**: Type-safe API integration with your existing backend
- **Error handling**: Robust error handling for API integration

#### API Client Features

- **Authentication**: Integration with your existing auth system
- **Request/Response interceptors**: Global handling of API requests
- **Retry logic**: Automatic retries for failed requests
- **Caching strategy**: Client-side caching for performance

### Development Tools

#### Code Quality

- **ESLint**: Code linting with Next.js configuration
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Staged files linting

#### Testing

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing

---

## Implementation Plan

### Phase 1: Project Setup & Frontend Infrastructure (Days 1-2)

#### Step 1.1: Domain Configuration

1. **Verify Cloudflare DNS setup**

   ```bash
   # Verify your existing API domain is working
   curl https://api.yourdomain.com/health
   # Test a sample endpoint from your existing backend
   curl https://api.yourdomain.com/your-existing-endpoint
   ```

2. **Configure frontend domain**
   - Add frontend domain (mydomain.com) to Cloudflare
   - Prepare for Vercel integration

#### Step 1.2: Repository Setup

1. **Initialize Next.js project**

   ```bash
   npx create-next-app@latest portfolio-website --typescript --tailwind --eslint --app
   cd portfolio-website
   ```

2. **Install additional dependencies**

   ```bash
   npm install gray-matter remark remark-html rehype-prism-plus reading-time
   npm install @headlessui/react lucide-react clsx tailwind-merge axios
   npm install -D @types/node husky lint-staged prettier
   ```

#### Step 1.3: API Integration Setup

1. **Create API client for your existing backend**

   ```bash
   # Create API configuration
   touch src/lib/api-client.ts
   touch src/types/api.ts
   ```

2. **Configure environment variables**

   ```bash
   # .env.local
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

### Phase 2: Frontend Development with API Integration (Days 3-7)

#### Step 2.1: Project Structure Setup

- Create folder structure (detailed below)
- Configure TypeScript and ESLint
- Setup Tailwind CSS with custom configuration
- Create API client for your existing Cloudflare Workers backend

#### Step 2.2: Core Components Development

- Navigation components (desktop + mobile)
- Layout components (header, footer, main)
- Blog components (post list, post detail, pagination)
- API integration components (loading states, error handling)

#### Step 2.3: Page Implementation

- Homepage with portfolio showcase
- About page with personal information
- Projects page with project listings (data from your API)
- Blog functionality with categories and tags (content from your API)
- Contact page with form (submits to your API)

#### Step 2.4: Content Management System

- Markdown processing pipeline for static content
- API integration for dynamic content from your backend
- Category and tag system (from your API)
- Search functionality (using your existing search endpoints)

### Phase 3: API Integration & Testing (Days 8-9)

#### Step 3.1: Backend Integration

- Complete API client implementation
- Error handling and retry logic
- Authentication integration (if needed)
- Response caching strategies

#### Step 3.2: Testing & Validation

- Test all API endpoints integration
- Error scenarios handling
- Performance optimization for API calls

### Phase 4: CI/CD Pipeline (Day 10)

#### Step 4.1: GitHub Actions Setup

- Frontend-only workflow (since backend is already deployed)
- Lint, test, and build pipeline
- Environment variable management

#### Step 4.2: Deployment Configuration

- Vercel project setup
- Domain integration testing
- API connectivity verification

### Phase 5: Testing & Optimization (Days 11-12)

#### Step 5.1: Testing Implementation

- Unit tests for components
- Integration tests for API client
- E2E tests for critical user flows

#### Step 5.2: Performance Optimization

- Image optimization
- Bundle size analysis
- Core Web Vitals optimization
- API response caching

### Phase 4: CI/CD Pipeline (Day 10)

#### Step 4.1: GitHub Actions Setup

- Lint and test workflow
- Build and deployment automation
- Environment variable management

#### Step 4.2: Deployment Configuration

- Vercel project setup
- Cloudflare Worker deployment
- Domain integration testing

### Phase 5: Testing & Optimization (Days 11-12)

#### Step 5.1: Testing Implementation

- Unit tests for components
- Integration tests for API endpoints
- E2E tests for critical user flows

#### Step 5.2: Performance Optimization

- Image optimization
- Bundle size analysis
- Core Web Vitals optimization

---

## Folder Structure

```
portfolio-website/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── .next/
├── .vscode/
│   └── settings.json
├── public/
│   ├── images/
│   │   ├── projects/
│   │   └── blog/
│   ├── icons/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── category/
│   │   │   │   └── [category]/
│   │   │   │       └── page.tsx
│   │   │   └── tag/
│   │   │       └── [tag]/
│   │   │           └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   └── search/
│   │   │       └── route.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Footer.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogList.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   ├── BlogPagination.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   └── TagCloud.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectGrid.tsx
│   │   └── common/
│   │       ├── SEO.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorBoundary.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── markdown.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useScrollPosition.ts
│   ├── types/
│   │   ├── blog.ts
│   │   ├── project.ts
│   │   └── api.ts
│   └── styles/
│       └── prism-themes.css
├── content/
│   ├── blog/
│   │   ├── 2024-01-01-welcome-post.md
│   │   └── 2024-01-15-next-js-tips.md
│   └── projects/
│       ├── project-1.md
│       └── project-2.md
├── tests/
│   ├── __mocks__/
│   ├── components/
│   ├── pages/
│   └── utils/
├── api-gateway/
│   ├── src/
│   │   ├── index.ts
│   │   ├── handlers/
│   │   │   ├── proxy.ts
│   │   │   └── cors.ts
│   │   ├── middleware/
│   │   │   ├── rateLimit.ts
│   │   │   └── validation.ts
│   │   └── utils/
│   │       └── response.ts
│   ├── wrangler.toml
│   └── package.json
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

---

## Code Examples

### 1. Navigation Component with Hamburger Menu

```typescript
// src/components/layout/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">Your Name</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
```

### 2. Blog Post Rendering with Syntax Highlighting

```typescript
// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBlogPost, getAllBlogPosts } from '@/lib/markdown';
import BlogPost from '@/components/blog/BlogPost';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Your Name'],
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
```

```typescript
// src/components/blog/BlogPost.tsx
import { format } from 'date-fns';
import { Clock, Calendar, Tag } from 'lucide-react';
import { BlogPostType } from '@/types/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </time>
          </div>

          {post.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Tag className="w-4 h-4 text-gray-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-8">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-blue prose-pre:bg-gray-900 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Last updated: {format(new Date(post.date), 'MMMM dd, yyyy')}
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Share:</span>
            {/* Add social share buttons here */}
          </div>
        </div>
      </footer>
    </article>
  );
}
```

### 3. Markdown Processing Library

```typescript
// src/lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism';
import readingTime from 'reading-time';
import { BlogPostType } from '@/types/blog';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export async function getAllBlogPosts(): Promise<BlogPostType[]> {
  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const post = await getBlogPost(slug);
        return post!;
      })
  );

  return allPostsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPostType | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    // Process markdown content
    const processedContent = await remark()
      .use(remarkPrism, {
        plugins: ['line-numbers', 'show-language'],
      })
      .use(remarkHtml, { sanitize: false })
      .process(content);

    const contentHtml = processedContent.toString();
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: contentHtml,
      date: data.date || new Date().toISOString(),
      coverImage: data.coverImage || null,
      tags: data.tags || [],
      category: data.category || '',
      readingTime: stats.text,
      published: data.published !== false,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPostType[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.category === category);
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPostType[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  return categories.filter(Boolean);
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));
  return tags;
}
```

### 4. Cloudflare Worker API Gateway

```typescript
// api-gateway/src/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { rateLimiter } from './middleware/rateLimit';
import { validateHeaders } from './middleware/validation';
import { proxyToBackend } from './handlers/proxy';

type Bindings = {
  BACKEND_URL: string;
  BACKEND_API_KEY: string;
  RATE_LIMIT_PER_MINUTE: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Global middleware
app.use('*', logger());
app.use('*', cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true,
}));

// Rate limiting middleware
app.use('*', rateLimiter);

// Header validation middleware
app.use('*', validateHeaders);

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Proxy all other requests to backend
app.all('*', proxyToBackend);

export default app;
```

```typescript
// api-gateway/src/handlers/proxy.ts
import { Context } from 'hono';

export async function proxyToBackend(c: Context) {
  const backendUrl = c.env.BACKEND_URL;
  const apiKey = c.env.BACKEND_API_KEY;

  if (!backendUrl || !apiKey) {
    return c.json({ error: 'Backend configuration missing' }, 500);
  }

  try {
    // Build target URL
    const url = new URL(c.req.url);
    const targetUrl = `${backendUrl}${url.pathname}${url.search}`;

    // Prepare headers
    const headers = new Headers();

    // Copy relevant headers from original request
    const relevantHeaders = ['content-type', 'authorization', 'x-api-key'];
    relevantHeaders.forEach(headerName => {
      const value = c.req.header(headerName);
      if (value) {
        headers.set(headerName, value);
      }
    });

    // Add backend API key
    headers.set('X-Backend-Key', apiKey);
    headers.set('X-Forwarded-For', c.req.header('CF-Connecting-IP') || '');
    headers.set('X-Real-IP', c.req.header('CF-Connecting-IP') || '');

    // Make request to backend
    const response = await fetch(targetUrl, {
      method: c.req.method,
      headers,
      body: c.req.method !== 'GET' && c.req.method !== 'HEAD'
        ? await c.req.arrayBuffer()
        : undefined,
    });

    // Create response with proper headers
    const responseHeaders = new Headers();

    // Copy response headers (excluding certain ones)
    const excludeHeaders = ['transfer-encoding', 'connection', 'keep-alive'];
    response.headers.forEach((value, key) => {
      if (!excludeHeaders.includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    // Add security headers
    responseHeaders.set('X-Content-Type-Options', 'nosniff');
    responseHeaders.set('X-Frame-Options', 'DENY');
    responseHeaders.set('X-XSS-Protection', '1; mode=block');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return c.json({
      error: 'Backend service unavailable',
      message: 'Please try again later'
    }, 502);
  }
}
```

```typescript
// api-gateway/src/middleware/rateLimit.ts
import { Context, Next } from 'hono';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (use KV or Durable Objects for production)
const store: RateLimitStore = {};

export async function rateLimiter(c: Context, next: Next) {
  const limit = parseInt(c.env.RATE_LIMIT_PER_MINUTE || '60');
  const windowMs = 60 * 1000; // 1 minute

  // Get client IP
  const clientIP = c.req.header('CF-Connecting-IP') ||
                   c.req.header('X-Forwarded-For') ||
                   'unknown';

  const now = Date.now();
  const windowStart = now - windowMs;

  // Clean old entries
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < windowStart) {
      delete store[key];
    }
  });

  // Check current client
  if (!store[clientIP]) {
    store[clientIP] = {
      count: 1,
      resetTime: now + windowMs,
    };
  } else if (store[clientIP].resetTime < now) {
    // Reset window
    store[clientIP] = {
      count: 1,
      resetTime: now + windowMs,
    };
  } else {
    store[clientIP].count++;
  }

  // Check limit
  if (store[clientIP].count > limit) {
    return c.json({
      error: 'Rate limit exceeded',
      retryAfter: Math.ceil((store[clientIP].resetTime - now) / 1000),
    }, 429);
  }

  // Add rate limit headers
  c.header('X-RateLimit-Limit', limit.toString());
  c.header('X-RateLimit-Remaining', (limit - store[clientIP].count).toString());
  c.header('X-RateLimit-Reset', new Date(store[clientIP].resetTime).toISOString());

  await next();
}
```

### 5. TypeScript Type Definitions

```typescript
// src/types/blog.ts
export interface BlogPostType {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage?: string;
  tags: string[];
  category: string;
  readingTime: string;
  published: boolean;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage?: string;
  tags: string[];
  category: string;
  readingTime: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18.17.0'

jobs:
  lint-and-test:
    name: Lint and Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run Prettier check
        run: npm run format:check

      - name: Run type check
        run: npm run type-check

      - name: Run unit tests
        run: npm run test

      - name: Run build test
        run: npm run build

  deploy-frontend:
    name: Deploy Frontend to Vercel
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

  deploy-worker:
    name: Deploy Cloudflare Worker
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies (Worker)
        run: |
          cd api-gateway
          npm ci

      - name: Deploy Worker
        run: |
          cd api-gateway
          npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}

  e2e-tests:
    name: E2E Tests
    needs: [deploy-frontend, deploy-worker]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          BASE_URL: https://yourdomain.com

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "prepare": "husky install",
    "analyze": "cross-env ANALYZE=true next build"
  }
}
```

---

## Domain & API Gateway Configuration

### Cloudflare DNS Configuration

```bash
# DNS Records Configuration in Cloudflare Dashboard

# Main domain (A record or CNAME to Vercel)
Type: CNAME
Name: yourdomain.com
Target: cname.vercel-dns.com
Proxy: Yes (Orange cloud)

# WWW subdomain
Type: CNAME
Name: www
Target: yourdomain.com
Proxy: Yes (Orange cloud)

# API subdomain for Cloudflare Worker
Type: CNAME
Name: api
Target: yourdomain.com
Proxy: Yes (Orange cloud)

# Worker Route Configuration
Route: api.yourdomain.com/*
Worker: api-gateway-worker
```

### Vercel Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.yourdomain.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

### Cloudflare Worker Configuration

```toml
# api-gateway/wrangler.toml
name = "api-gateway"
compatibility_date = "2023-10-30"
main = "src/index.ts"

[env.production]
name = "api-gateway-prod"
route = "api.yourdomain.com/*"

[env.production.vars]
BACKEND_URL = "https://your-backend.example.com"
RATE_LIMIT_PER_MINUTE = "60"

[[env.production.secrets]]
BACKEND_API_KEY = "your-backend-api-key"

[build]
command = "npm run build"
```

---

## Risks & Mitigation Strategies

### 1. SEO-Related Risks

**Risk**: Poor search engine indexing due to client-side rendering

- **Mitigation**:
  - Use Next.js App Router with Server Components
  - Implement proper meta tags and Open Graph data
  - Generate XML sitemap automatically
  - Use structured data (JSON-LD) for blog posts
  - Ensure proper canonical URLs

**Risk**: Slow loading affecting SEO rankings

- **Mitigation**:
  - Optimize images with Next.js Image component
  - Implement proper caching strategies
  - Use static generation for blog posts
  - Monitor Core Web Vitals regularly

### 2. API Gateway Risks

**Risk**: API latency affecting user experience

- **Mitigation**:
  - Use Cloudflare Workers for edge computing (low latency)
  - Implement request/response caching
  - Set appropriate timeout values
  - Add retry logic with exponential backoff

**Risk**: CORS errors preventing API access

- **Mitigation**:
  - Configure proper CORS headers in Worker
  - Test CORS configuration thoroughly
  - Implement preflight request handling
  - Use specific origins instead of wildcards

**Risk**: API abuse and DDoS attacks

- **Mitigation**:
  - Implement rate limiting per IP address
  - Use Cloudflare's DDoS protection
  - Add request validation and sanitization
  - Monitor unusual traffic patterns

### 3. Performance Risks

**Risk**: Large bundle sizes affecting load times

- **Mitigation**:
  - Use dynamic imports for code splitting
  - Implement tree shaking for unused code
  - Regular bundle analysis with webpack-bundle-analyzer
  - Optimize dependencies and remove unused packages

**Risk**: Memory leaks in React components

- **Mitigation**:
  - Properly clean up event listeners and timers
  - Use useEffect cleanup functions
  - Implement proper component unmounting
  - Regular memory profiling in development

### 4. Security Risks

**Risk**: XSS attacks through blog content

- **Mitigation**:
  - Sanitize all user-generated content
  - Use proper HTML escaping in templates
  - Implement Content Security Policy (CSP)
  - Validate and sanitize markdown input

**Risk**: Data exposure through API endpoints

- **Mitigation**:
  - Implement proper authentication and authorization
  - Use HTTPS everywhere
  - Validate all API inputs
  - Regular security audits and dependency updates

### 5. Deployment Risks

**Risk**: Build failures causing deployment issues

- **Mitigation**:
  - Comprehensive CI/CD pipeline with multiple checks
  - Automated testing before deployment
  - Rollback strategies for failed deployments
  - Monitoring and alerting for build status

**Risk**: DNS and domain configuration issues

- **Mitigation**:
  - Test DNS propagation thoroughly
  - Use monitoring tools for domain health
  - Implement health checks for all services
  - Document all DNS configurations

---

## Deployment Guide

### Step 1: Domain Setup

1. **Add domain to Cloudflare**

   ```bash
   # Login to Cloudflare dashboard
   # Add your domain
   # Update nameservers at your domain registrar
   ```

2. **Configure SSL/TLS**

   ```bash
   # In Cloudflare dashboard:
   # SSL/TLS → Overview → Full (strict)
   # Edge Certificates → Always Use HTTPS: On
   # Edge Certificates → Automatic HTTPS Rewrites: On
   ```

### Step 2: Vercel Setup

1. **Connect GitHub repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and connect project
   vercel login
   vercel --prod
   ```

2. **Configure custom domain**

   ```bash
   # In Vercel dashboard:
   # Project Settings → Domains
   # Add: yourdomain.com
   # Add: www.yourdomain.com
   ```

### Step 3: Cloudflare Worker Deployment

1. **Install Wrangler CLI**

   ```bash
   npm install -g @cloudflare/wrangler
   wrangler login
   ```

2. **Deploy Worker**

   ```bash
   cd api-gateway
   wrangler deploy --env production
   ```

### Step 4: Environment Variables

**Vercel Environment Variables:**

```bash
# In Vercel dashboard → Project Settings → Environment Variables
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
CONTACT_EMAIL=your-email@example.com
```

**Cloudflare Worker Secrets:**

```bash
# Set secrets using Wrangler CLI
wrangler secret put BACKEND_API_KEY --env production
wrangler secret put BACKEND_URL --env production
```

### Step 5: GitHub Actions Setup

**Required Secrets:**

```bash
# In GitHub → Repository Settings → Secrets and Variables → Actions

# Vercel
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id

# Cloudflare
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
```

### Step 6: Testing and Validation

1. **DNS Propagation Check**

   ```bash
   # Test DNS resolution
   nslookup yourdomain.com
   nslookup api.yourdomain.com
   ```

2. **SSL Certificate Validation**

   ```bash
   # Check SSL certificate
   curl -I https://yourdomain.com
   curl -I https://api.yourdomain.com
   ```

3. **API Gateway Testing**

   ```bash
   # Test health endpoint
   curl https://api.yourdomain.com/health

   # Test proxy functionality
   curl -X POST https://api.yourdomain.com/test-endpoint \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

4. **Performance Testing**

   ```bash
   # Run Lighthouse audit
   npx lighthouse https://yourdomain.com --output=html --output-path=./lighthouse-report.html

   # Check Core Web Vitals
   npx @web/test-runner --playwright --browsers chromium
   ```

---

## Timeline Summary

**Total Development Time: 12 days**

- **Phase 1 (Setup)**: 2 days
- **Phase 2 (Frontend Development)**: 5 days
- **Phase 3 (API Integration & Testing)**: 2 days
- **Phase 4 (CI/CD Pipeline)**: 1 day
- **Phase 5 (Testing & Optimization)**: 2 days

**Prerequisites**: Cloudflare Workers backend already deployed and functional

## Resource Requirements

**Technical Skills Needed**:

- Next.js 14+ with App Router
- TypeScript and React 18+
- Tailwind CSS styling
- API integration patterns
- GitHub Actions CI/CD configuration

**Infrastructure Requirements**:

- Domain name with Cloudflare DNS management
- Vercel account for frontend deployment
- GitHub repository for version control
- **Existing Cloudflare Workers API** (already available)

---

## Conclusion

This comprehensive blueprint provides a production-ready architecture for a professional portfolio website with blog functionality. The technology stack leverages modern tools and best practices to ensure optimal performance, security, and developer experience.

**Key Benefits:**

- **SEO-Optimized**: Server-side rendering with Next.js App Router
- **API Integration**: Seamless integration with existing Cloudflare Workers backend
- **High Performance**: Edge computing and optimized frontend delivery
- **Secure**: Leveraging existing security layers from Cloudflare Workers
- **Maintainable**: Clean frontend architecture with TypeScript
- **Automated**: Streamlined CI/CD pipeline for frontend deployment

Follow the implementation plan step by step, and you'll have a robust frontend that perfectly integrates with your existing backend infrastructure, providing an excellent user experience.
