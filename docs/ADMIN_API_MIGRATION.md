# Admin API Migration - Direct Backend Integration

## 🎯 Tổng quan

Đã migration flow admin từ việc sử dụng Next.js API Routes (middleware) sang **gọi trực tiếp Backend API**.

## ✅ Các thay đổi đã thực hiện

### 1. **AuthContext Integration** ✨

**Trước:**

```typescript
// Gọi Next.js API route làm middleware
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});
```

**Sau:**

```typescript
// Gọi trực tiếp backend thông qua authService
const response = await authService.login({
  email: credentials.email,
  password: credentials.password,
});
```

### 2. **File Changes**

#### Đã sửa

- ✅ `/src/contexts/AuthContext.tsx` - Dùng `authService` thay vì fetch API routes
  - `login()`: Gọi `authService.login()` thay vì `/api/auth/login`
  - `logout()`: Gọi `authService.logout()`
  - `verifyAndSetSession()`: Gọi `authService.getCurrentUser()`
  - `refreshSession()`: Verify token qua backend

#### Đã xóa

- 🗑️ `/src/app/api/auth/login/route.ts` - Không cần middleware nữa
- 🗑️ `/src/app/api/auth/verify/route.ts` - Không cần middleware nữa
- 🗑️ `/src/app/api/` - Xóa toàn bộ Next.js API routes

### 3. **API Services Already Correct** ✅

Các service sau đã gọi đúng backend từ đầu:

- ✅ `blogService` - `/src/lib/api/blog.ts`
- ✅ `authService` - `/src/lib/api/auth.ts`
- ✅ `apiClient` - `/src/lib/api/client.ts`

### 4. **Admin Pages Already Using Services** ✅

Các trang admin đã dùng đúng services:

- ✅ `/admin/blog/page.tsx` - Dùng `blogService.getBlogPosts()`
- ✅ `/admin/blog/new/page.tsx` - Dùng `blogService.createBlogPost()`
- ✅ `/admin/blog/edit/[id]/page.tsx` - Dùng `blogService.updateBlogPost()`

## 🔧 Configuration

### Backend API URL

Đã cấu hình trong `.env`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.iletai.qzz.io
```

### API Config

File `/src/lib/api/config.ts`:

```typescript
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.iletai.qzz.io',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
}
```

## 📋 Backend Endpoints Được Sử Dụng

### Authentication

- ✅ `POST /v1/auth/login` (alias: `/api/login`)
- ✅ `POST /v1/auth/signup` (alias: `/api/signup`)
- ✅ `GET /v1/auth/user` (alias: `/api/user`)

### Blog Management

- ✅ `GET /v1/posts` (alias: `/api/posts`)
- ✅ `POST /v1/posts` (alias: `/api/posts`)
- ✅ `PUT /v1/posts/{id}` (alias: `/api/posts/{id}`)
- ✅ `DELETE /v1/posts/{id}` (alias: `/api/posts/{id}`)
- ✅ `GET /v1/posts/featured` (alias: `/api/posts/featured`)
- ✅ `GET /v1/posts/{slug}` (alias: `/api/posts/{slug}`)

### Categories & Tags

- ✅ `GET /v1/categories` (alias: `/api/blog/categories`)
- ✅ `POST /v1/categories` (alias: `/api/blog/categories`)
- ✅ `DELETE /v1/categories/{id}`
- ✅ `GET /v1/tags` (alias: `/api/blog/tags`)
- ✅ `POST /v1/tags` (alias: `/api/blog/tags`)
- ✅ `DELETE /v1/tags/{id}`

## 🎨 Type Mapping

### User Type Conversion

Backend `User` type được map sang Frontend `AuthSession['user']`:

```typescript
function mapApiUserToLocal(apiUser: ApiUser): AuthSession['user'] {
    return {
        id: apiUser.id,
        email: apiUser.email,
        name: apiUser.fullName || apiUser.email.split('@')[0],
        role: 'admin', // Default role
        createdAt: apiUser.createdAt,
        lastLoginAt: new Date().toISOString(),
    };
}
```

## 🔐 Authentication Flow

1. **Login:**
   - User nhập credentials → `AuthContext.login()`
   - Call `authService.login()` → Backend `/v1/auth/login`
   - Nhận `{ user, accessToken }` từ backend
   - Map user type và tạo `AuthSession`
   - Lưu token vào localStorage và set vào `apiClient`

2. **Session Verification:**
   - Khi app khởi động, đọc token từ localStorage
   - Call `authService.getCurrentUser()` → Backend `/v1/auth/user`
   - Verify token còn hợp lệ và restore session

3. **Logout:**
   - Clear local state
   - Call `authService.logout()` để clear token khỏi `apiClient`
   - Remove token khỏi localStorage

## 📊 Request Flow Comparison

### Trước (với Next.js API Routes)

```
Frontend → Next.js API Route → Backend API
   ↓           ↓                    ↓
 Login    /api/auth/login    /v1/auth/login
```

### Sau (Direct Backend)

```
Frontend → Backend API
   ↓            ↓
 Login    /v1/auth/login
```

**Lợi ích:**

- ⚡ Giảm latency (bỏ 1 hop trung gian)
- 🎯 Code đơn giản hơn (không cần maintain API routes)
- 🔒 Centralized auth logic trong `authService`
- 🚀 Dễ debug và trace requests

## ✅ Testing Checklist

- [ ] Login flow hoạt động
- [ ] Session persistence sau refresh
- [ ] Logout clear session
- [ ] Blog CRUD operations
- [ ] Category/Tag management
- [ ] Error handling hiển thị đúng
- [ ] Token expiry handling

## 🚀 Next Steps

1. Test login flow với backend thật
2. Verify token expiry và refresh logic
3. Test tất cả blog CRUD operations
4. Kiểm tra error handling cho các edge cases
5. Update documentation nếu cần

## 📝 Notes

- Backend phải enable CORS cho frontend domain
- Backend token format phải match với frontend expectations
- Backend response format phải match với TypeScript types định nghĩa
- Cần implement proper error handling cho network failures
