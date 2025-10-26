# Hướng dẫn Deploy Next.js Portfolio lên Vercel

## Bước 1: Tạo tài khoản Vercel

1. Truy cập <https://vercel.com>
2. Đăng ký bằng GitHub account
3. Authorize Vercel truy cập repositories

## Bước 2: Import Project

1. Click "New Project" trên Vercel dashboard
2. Import repository `iletai.github.io`
3. Vercel tự động detect Next.js và configure

## Bước 3: Configure Settings (Optional)

- **Build Command**: `npm run build` (mặc định)
- **Output Directory**: `.next` (mặc định)
- **Install Command**: `npm install` (mặc định)
- **Root Directory**: `.` (hoặc để trống)

## Bước 4: Deploy

1. Click "Deploy"
2. Chờ build process hoàn thành (~2-3 phút)
3. Nhận URL: `https://your-project.vercel.app`

## Bước 5: Custom Domain (Optional)

1. Mua domain hoặc sử dụng subdomain
2. Vào Project Settings > Domains
3. Add domain và configure DNS

## Tính năng tự động

- ✅ Auto-deploy khi push code lên GitHub
- ✅ Preview deployments cho pull requests
- ✅ Environment variables management
- ✅ Analytics và performance monitoring
- ✅ Edge Functions support

## So sánh với GitHub Pages

| Feature | GitHub Pages | Vercel |
|---------|-------------|--------|
| Next.js App Router | ❌ (cần static export) | ✅ Full support |
| API Routes | ❌ | ✅ Serverless functions |
| Image Optimization | ❌ | ✅ Automatic |
| Edge Functions | ❌ | ✅ Global edge network |
| Custom Domains | ✅ | ✅ + Auto SSL |
| Build Time | ~5-10 min | ~2-3 min |
| Deploy Frequency | Unlimited | Unlimited (Hobby plan) |

## Environment Variables (nếu cần)

```bash
# Vercel Dashboard > Project > Settings > Environment Variables
DATABASE_URL=your_database_url
API_KEY=your_api_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Vercel CLI (Alternative method)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy từ terminal
cd /Users/lequangtrongtai/iletai.github.io
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your username)
# - Link to existing project? N
# - Project name? (default: iletai-github-io)
# - Directory? ./
```

## Monitoring và Analytics

- Real-time deployment logs
- Performance metrics
- Error tracking
- Visitor analytics (Pro plan)

## Cost

- **Hobby Plan**: FREE
  - Unlimited personal projects
  - 100GB bandwidth/month
  - Vercel subdomain
- **Pro Plan**: $20/month
  - Custom domains
  - Analytics
  - Password protection
  - Priority support
