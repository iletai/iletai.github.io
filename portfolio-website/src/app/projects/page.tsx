import Link from "next/link";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

// Temporary static data - will be replaced with API calls
const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution với React, Node.js và MongoDB. Hỗ trợ thanh toán Stripe, quản lý inventory và user authentication.",
    longDescription: "Một nền tảng thương mại điện tử hoàn chỉnh được xây dựng với React cho frontend và Node.js cho backend. Ứng dụng hỗ trợ đầy đủ các tính năng từ quản lý sản phẩm, giỏ hàng, thanh toán đến quản lý đơn hàng.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT"],
    image: "/images/projects/ecommerce.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    category: "fullstack",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Ứng dụng quản lý công việc với real-time collaboration sử dụng WebSocket và Prisma ORM.",
    longDescription: "Ứng dụng quản lý tác vụ hiện đại với khả năng cộng tác theo thời gian thực. Người dùng có thể tạo project, assign tasks, track progress và communicate với team members.",
    technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket", "PostgreSQL"],
    image: "/images/projects/taskapp.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    category: "fullstack",
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "Dashboard hiển thị thông tin thời tiết với charts và forecasting sử dụng OpenWeather API.",
    longDescription: "Dashboard thời tiết với giao diện đẹp mắt, hiển thị thông tin thời tiết hiện tại và dự báo 7 ngày. Tích hợp charts để visualize temperature trends và precipitation data.",
    technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
    image: "/images/projects/weather.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false,
    category: "frontend",
  },
  {
    id: "4",
    title: "Blog API",
    description: "RESTful API cho blog platform với authentication, CRUD operations và file upload.",
    longDescription: "RESTful API được xây dựng với Node.js và Express, cung cấp đầy đủ endpoints cho blog platform. Hỗ trợ user authentication, CRUD operations cho posts và comments, file upload cho images.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Multer"],
    image: "/images/projects/blogapi.jpg",
    githubUrl: "https://github.com/example",
    featured: false,
    category: "backend",
  },
];

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "fullstack", label: "Full-stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Về trang chủ
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dự án của tôi</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Tổng hợp các dự án mà tôi đã thực hiện, từ ứng dụng web full-stack đến
            các API backend và frontend components. Mỗi dự án đều được build với
            công nghệ hiện đại và best practices.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Project Image</span>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Featured Badge */}
                {project.featured && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                    Featured
                  </span>
                )}

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium"
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
                      className="text-gray-600 hover:text-gray-800 inline-flex items-center text-sm font-medium"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quan tâm đến dự án của tôi?
          </h2>
          <p className="text-gray-600 mb-6">
            Hãy liên hệ để thảo luận về dự án tiếp theo của bạn
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Liên hệ ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
