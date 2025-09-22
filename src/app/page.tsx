import Link from "next/link";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

// Temporary static data - will be replaced with API calls
const featuredProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution với React, Node.js và MongoDB",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/images/projects/ecommerce.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Ứng dụng quản lý công việc với real-time collaboration",
    technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    image: "/images/projects/taskapp.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
];

const recentPosts = [
  {
    slug: "getting-started-nextjs-15",
    title: "Getting Started with Next.js 15",
    excerpt: "Hướng dẫn chi tiết về những tính năng mới trong Next.js 15",
    publishedAt: "2024-01-15",
    readingTime: 5,
  },
  {
    slug: "react-server-components",
    title: "Understanding React Server Components",
    excerpt: "Deep dive vào React Server Components và cách sử dụng hiệu quả",
    publishedAt: "2024-01-10",
    readingTime: 8,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Xin chào, tôi là{" "}
              <span className="text-blue-600">Developer</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Chuyên phát triển ứng dụng web hiện đại với React, Next.js và TypeScript.
              Đam mê tạo ra những sản phẩm có giá trị và trải nghiệm người dùng tuyệt vời.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                Xem dự án
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dự án nổi bật</h2>
            <p className="text-lg text-gray-600">
              Một số dự án gần đây mà tôi đã thực hiện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 inline-flex items-center"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
            >
              Xem tất cả dự án
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog gần đây</h2>
            <p className="text-lg text-gray-600">
              Chia sẻ kiến thức và kinh nghiệm lập trình
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                  </time>
                  <span>{post.readingTime} phút đọc</span>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
            >
              Xem tất cả bài viết
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
