import { calculateReadingTime, formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Temporary static data - will be replaced with API calls
const blogPosts = {
    "getting-started-nextjs-15": {
        slug: "getting-started-nextjs-15",
        title: "Getting Started with Next.js 15",
        excerpt: "Hướng dẫn chi tiết về những tính năng mới trong Next.js 15, bao gồm App Router, Server Components và các optimization mới.",
        content: `
# Getting Started with Next.js 15

Next.js 15 đã chính thức ra mắt với nhiều tính năng mới và cải tiến đáng kể. Trong bài viết này, chúng ta sẽ tìm hiểu về những tính năng nổi bật và cách bắt đầu với Next.js 15.

## Những tính năng mới trong Next.js 15

### 1. App Router (Stable)
App Router đã chính thức stable trong Next.js 15, mang đến cách tổ chức và định tuyến mới:

\`\`\`typescript
// app/page.tsx
export default function HomePage() {
  return <div>Welcome to Next.js 15!</div>
}
\`\`\`

### 2. Server Components
React Server Components cho phép render component trên server:

\`\`\`typescript
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
\`\`\`

### 3. Improved Image Optimization
Next.js 15 cải thiện đáng kể Image optimization:

\`\`\`typescript
import Image from 'next/image'

export default function MyComponent() {
  return (
    <Image
      src="/hero.jpg"
      width={800}
      height={600}
      alt="Hero image"
      priority
    />
  )
}
\`\`\`

## Cách bắt đầu

### Tạo project mới
\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

### Cấu trúc thư mục
\`\`\`
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── next.config.js
└── package.json
\`\`\`

## Kết luận

Next.js 15 mang đến nhiều cải tiến đáng kể cho developers. Với App Router stable và Server Components, việc xây dựng ứng dụng React trở nên mạnh mẽ và hiệu quả hơn bao giờ hết.
    `,
        publishedAt: "2024-01-15",
        tags: ["Next.js", "React", "Web Development"],
        author: "Developer",
    },
    "react-server-components": {
        slug: "react-server-components",
        title: "Understanding React Server Components",
        excerpt: "Deep dive vào React Server Components và cách sử dụng hiệu quả để tối ưu performance và user experience.",
        content: `
# Understanding React Server Components

React Server Components (RSC) là một trong những tính năng quan trọng nhất của React trong những năm gần đây. Hãy cùng tìm hiểu về RSC và cách sử dụng hiệu quả.

## Server Components là gì?

Server Components là components được render hoàn toàn trên server, không gửi JavaScript xuống client. Điều này mang lại nhiều lợi ích:

- **Giảm bundle size**: Không có JavaScript được gửi xuống client
- **Tăng performance**: Render trên server nhanh hơn
- **SEO friendly**: Content có sẵn khi page load

## Cách hoạt động

\`\`\`typescript
// server component (default trong app directory)
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
\`\`\`

## Server vs Client Components

### Server Components
- Render trên server
- Có thể fetch data trực tiếp
- Không thể sử dụng hooks
- Không có interactivity

### Client Components
- Render trên client
- Có thể sử dụng hooks
- Interactive
- Cần thêm "use client" directive

\`\`\`typescript
"use client"

import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
\`\`\`

## Best Practices

1. **Sử dụng Server Components mặc định**
2. **Chỉ dùng Client Components khi cần thiết**
3. **Fetch data ở level cao nhất có thể**
4. **Tránh prop drilling với large objects**

## Kết luận

React Server Components mở ra một paradigm mới trong việc xây dựng ứng dụng React. Hiểu và sử dụng đúng RSC sẽ giúp ứng dụng của bạn nhanh hơn và hiệu quả hơn.
    `,
        publishedAt: "2024-01-10",
        tags: ["React", "Server Components", "Performance"],
        author: "Developer",
    },
};

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = blogPosts[slug as keyof typeof blogPosts];

    if (!post) {
        notFound();
    }

    const readingTime = calculateReadingTime(post.content);

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Navigation */}
                <Link
                    href="/blog"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center mb-8"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Về trang blog
                </Link>

                {/* Article Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>

                    <p className="text-xl text-gray-600 mb-6">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 space-x-6">
                            <span>Bởi {post.author}</span>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <time dateTime={post.publishedAt}>
                                    {formatDate(post.publishedAt)}
                                </time>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {readingTime} phút đọc
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="text-gray-500 hover:text-red-500 transition-colors">
                                <Heart className="h-5 w-5" />
                            </button>
                            <button className="text-gray-500 hover:text-blue-500 transition-colors">
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <article className="prose prose-lg max-w-none">
                    <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{
                            __html: post.content.replace(/\n/g, '<br>').replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre><code class="language-$1">$2</code></pre>')
                        }}
                    />
                </article>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600">Tags:</span>
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${tag.toLowerCase()}`}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Chia sẻ bài viết
                            </button>
                        </div>
                    </div>
                </footer>

                {/* Related Posts */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Bài viết liên quan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.values(blogPosts)
                            .filter(p => p.slug !== slug)
                            .slice(0, 2)
                            .map((relatedPost) => (
                                <article key={relatedPost.slug} className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        <Link
                                            href={`/blog/${relatedPost.slug}`}
                                            className="hover:text-blue-600 transition-colors"
                                        >
                                            {relatedPost.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {relatedPost.excerpt}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        <time dateTime={relatedPost.publishedAt}>
                                            {formatDate(relatedPost.publishedAt)}
                                        </time>
                                    </div>
                                </article>
                            ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
