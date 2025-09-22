# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, React 19, TypeScript 5
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Performance Optimized**: Server Components, Image optimization, Fast loading
- **SEO Ready**: Complete metadata, Open Graph, structured data
- **Type Safe**: Full TypeScript implementation with strict mode
- **Cloudflare Workers Integration**: Ready to connect with existing backend
- **Contact Form**: Interactive form with validation and error handling
- **Blog System**: Dynamic routing for blog posts with markdown support
- **Projects Showcase**: Portfolio projects with filtering and categorization
- **Error Handling**: Custom 404 and error pages
- **Loading States**: Elegant loading animations

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── loading.tsx        # Loading page
│   ├── error.tsx          # Error page
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utilities and types
│   ├── api/             # API client
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
└── styles/              # Global styles
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5.3**: React framework with App Router
- **React 19.1.0**: Latest React with Server Components
- **TypeScript 5.9.2**: Static type checking
- **Tailwind CSS v4**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library

### Backend Integration
- **Cloudflare Workers**: Serverless backend (pre-deployed)
- **API Client**: Type-safe API integration
- **Contact Form**: Form submission with validation

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 22.19.0)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update the variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://your-worker.your-domain.workers.dev
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Configuration

### API Integration

The website is configured to work with Cloudflare Workers backend. Update the API URLs in:

- `src/lib/api/client.ts` - API client configuration
- Environment variables for production deployment

### Content Management

#### Static Data
Current implementation uses static data for demonstration. Replace with API calls:

- `src/app/page.tsx` - Homepage featured content
- `src/app/projects/page.tsx` - Projects data
- `src/app/blog/page.tsx` - Blog posts data

#### Dynamic Content
The API client is ready for dynamic content integration:

```typescript
// Get blog posts from API
const posts = await apiClient.getBlogPosts();

// Get projects from API
const projects = await apiClient.getProjects();

// Submit contact form
await apiClient.sendContactForm(formData);
```

### SEO Configuration

Update SEO settings in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Full Stack Developer",
  description: "Your description here",
  // ... other metadata
};
```

## 🎨 Customization

### Styling
- **Colors**: Update Tailwind config for brand colors
- **Typography**: Modify font settings in `layout.tsx`
- **Components**: Customize component styles in respective files

### Content
- **Personal Info**: Update contact information in contact page
- **Social Links**: Modify social media links in footer
- **Projects**: Add your projects in projects page
- **Blog**: Configure blog content and metadata

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## 📦 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Configure environment variables**
   - Add production environment variables in Vercel dashboard
   - Update API URLs for production

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Integration with Cloudflare Workers

The portfolio is designed to work with your existing Cloudflare Workers backend:

### API Endpoints Expected
- `GET /api/posts` - Blog posts list
- `GET /api/posts/:slug` - Individual blog post
- `GET /api/projects` - Projects list
- `POST /api/contact` - Contact form submission
- `POST /api/analytics/pageview` - Page view tracking

### CORS Configuration
Ensure your Cloudflare Workers allow requests from your domain:

```javascript
// In your worker
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://your-domain.com',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance

- **Core Web Vitals**: Optimized for excellent scores
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Server Components**: Reduced client-side JavaScript

## 🔒 Security

- **Environment Variables**: Sensitive data in environment variables
- **Input Validation**: Form validation and sanitization
- **Type Safety**: TypeScript for compile-time error prevention

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the [TypeScript documentation](https://www.typescriptlang.org/docs/)
3. Check [Tailwind CSS documentation](https://tailwindcss.com/docs)
4. Open an issue in this repository

## 🎯 Next Steps

1. **Content Migration**: Replace static data with your actual content
2. **API Integration**: Connect to your Cloudflare Workers backend
3. **SEO Optimization**: Update metadata and add structured data
4. **Analytics**: Integrate Google Analytics or similar
5. **Testing**: Add unit and integration tests
6. **CI/CD**: Set up automated deployment pipeline

---

Built with ❤️ using modern web technologies following the Technology Stack Blueprint.
