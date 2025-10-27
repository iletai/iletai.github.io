# Backend API Integration Status

## 📋 Backend API Analysis

Backend đã implement API endpoints tại `/Users/lequangtrongtai/technical-backend/src/interfaces/http/`

### ✅ Available Endpoints (Backend Ready)

#### Blog Posts

- **GET /v1/posts** - Lấy danh sách blog posts
  - Query params: `status`, `category`, `tag`, `featured`, `search`, `page`, `limit`
  - Response: `{ data: { posts: [], totalCount, hasMore, page, limit } }`

- **GET /v1/posts/{slug}** - Lấy blog post theo slug
  - Response: `{ data: BlogPost }`

- **GET /v1/posts/featured** - Lấy featured posts
  - Query params: `limit` (default: 5, max: 20)
  - Response: `{ data: BlogPost[] }`

#### Categories & Tags

- **GET /v1/categories** - Lấy tất cả categories
  - Response: `{ data: Category[] }`

- **GET /v1/tags** - Lấy tất cả tags
  - Response: `{ data: Tag[] }`

### ❌ Missing Endpoints (Need Backend Implementation)

#### CMS Operations (Admin Only)

- **POST /v1/posts** - Tạo blog post mới ❌
- **PUT /v1/posts/{id}** - Update blog post ❌
- **DELETE /v1/posts/{id}** - Xóa blog post ❌
- **PATCH /v1/posts/{id}/publish** - Publish draft ❌
- **PATCH /v1/posts/{id}/unpublish** - Unpublish post ❌
- **PATCH /v1/posts/{id}/archive** - Archive post ❌

### ⚠️ API Differences

1. **Response Structure:**

   ```typescript
   // Backend actual response
   {
     data: {
       posts: BlogPost[],
       totalCount: number,
       hasMore: boolean,
       page: number,
       limit: number
     }
   }

   // Frontend currently expects (NEEDS UPDATE)
   {
     posts: BlogPost[],
     totalCount: number,
     // ...
   }
   ```

2. **Lookup Method:**
   - Backend: Uses **SLUG** (`/v1/posts/{slug}`)
   - Frontend CMS: Expects **ID** (`/api/posts/{id}`)
   - **Solution:** Store slug in CMS list, use slug for detail pages

3. **Base URL:**
   - Backend: `/v1/*` (modern RESTful style)
   - Frontend config: `/api/*` (compatibility layer)
   - **Router supports both:** `/v1/posts` AND `/api/posts`

## 🔧 Required Frontend Updates

### 1. Update API Client Response Handling

File: `src/lib/api/blog.ts`

```typescript
// Fix getBlogPosts to handle nested data structure
async getBlogPosts(params?: BlogPostsParams): Promise<BlogPostsResponse> {
    const response = await apiClient.get<{ data: BlogPostsResponse }>(endpoint);
    // Backend returns: { data: { posts, totalCount, ... } }
    // Extract the nested data
    return response.data;
}
```

### 2. Update BlogPost List Component

File: `src/app/admin/blog/page.tsx`

```typescript
// Change from using ID to using SLUG
const handleEdit = (slug: string) => {
    router.push(`/admin/blog/edit/${slug}`);
};

// Update table to show slug
<TableCell className="font-mono text-sm">{post.slug}</TableCell>
```

### 3. Update Edit Page Route

Rename: `src/app/admin/blog/edit/[id]/page.tsx` → `src/app/admin/blog/edit/[slug]/page.tsx`

```typescript
// Use slug instead of id
const params = useParams();
const slug = params.slug as string;

// Load post by slug
const post = await blogService.getBlogPostBySlug(slug);
```

### 4. Mock vs Real Data Strategy

```typescript
// For CMS functions that don't have backend yet
async createBlogPost(data: CreateBlogPostRequest) {
    // Option 1: Mock success response for development
    console.warn('CREATE endpoint not implemented - using mock');
    return {
        data: {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
        }
    };

    // Option 2: Show user-friendly error
    throw new Error('Create post feature coming soon - backend not ready');
}
```

## 📝 Backend Implementation TODO

Backend developer cần implement các endpoints sau trong `BlogHandler`:

```typescript
// File: backend/src/interfaces/http/handlers/blog.handler.ts

// 1. Create post
async createPost(request: Request): Promise<Response> {
    const validation = await ValidationMiddleware.validateBody(
        request,
        CreateBlogPostSchema
    );

    if (!validation.success) {
        return ValidationMiddleware.createBodyErrorResponse(validation);
    }

    const post = await this.container.createBlogPost.execute(validation.data);
    return this.json({ data: toApiBlogPost(post) }, 201);
}

// 2. Update post
async updatePost(params: { id: string }, request: Request): Promise<Response> {
    const validation = await ValidationMiddleware.validateBody(
        request,
        UpdateBlogPostSchema
    );

    if (!validation.success) {
        return ValidationMiddleware.createBodyErrorResponse(validation);
    }

    const post = await this.container.updateBlogPost.execute(
        params.id,
        validation.data
    );

    return this.json({ data: toApiBlogPost(post) });
}

// 3. Delete post
async deletePost(params: { id: string }): Promise<Response> {
    await this.container.deleteBlogPost.execute(params.id);
    return this.json({ message: 'Post deleted successfully' }, 200);
}

// 4. Publish/Unpublish/Archive
async publishPost(params: { id: string }): Promise<Response> {
    const post = await this.container.publishBlogPost.execute(params.id);
    return this.json({ data: toApiBlogPost(post) });
}
```

### Add Routes to ModularRouter

```typescript
// File: backend/src/interfaces/http/modular-router.ts

// Add to routeRequest method:

// Create post
if (path === '/v1/posts' && method === 'POST') {
    return this.blogHandler.createPost(request);
}

// Update post
if (path.match(/^\/v1\/posts\/[^/]+$/) && method === 'PUT') {
    const id = path.replace('/v1/posts/', '');
    return this.blogHandler.updatePost({ id }, request);
}

// Delete post
if (path.match(/^\/v1\/posts\/[^/]+$/) && method === 'DELETE') {
    const id = path.replace('/v1/posts/', '');
    return this.blogHandler.deletePost({ id });
}

// Publish
if (path.match(/^\/v1\/posts\/[^/]+\/publish$/) && method === 'PATCH') {
    const id = path.replace(/^\/v1\/posts\/([^/]+)\/publish$/, '$1');
    return this.blogHandler.publishPost({ id });
}
```

## 🚀 Implementation Priority

### Phase 1: Fix Frontend to Match Current Backend (NOW)

1. ✅ Update response handling for nested `data` structure
2. ✅ Change from ID to SLUG in edit routes
3. ✅ Update API client to extract `response.data.data`
4. ✅ Add error handling for missing endpoints

### Phase 2: Backend CRUD Implementation (NEXT)

1. Backend: Implement POST /v1/posts (create)
2. Backend: Implement PUT /v1/posts/{id} (update)
3. Backend: Implement DELETE /v1/posts/{id} (delete)
4. Backend: Add authentication middleware for admin routes

### Phase 3: Advanced Features (FUTURE)

1. Image upload endpoint
2. Auto-save drafts
3. Version history
4. Bulk operations

## 🧪 Testing Plan

### Current Backend Testing

```bash
# Test existing endpoints
curl https://api.iletai.qzz.io/v1/posts
curl https://api.iletai.qzz.io/v1/posts/your-post-slug
curl https://api.iletai.qzz.io/v1/categories
curl https://api.iletai.qzz.io/v1/tags
```

### After CRUD Implementation

```bash
# Create post
curl -X POST https://api.iletai.qzz.io/v1/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"..."}'

# Update post
curl -X PUT https://api.iletai.qzz.io/v1/posts/123 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated"}'

# Delete post
curl -X DELETE https://api.iletai.qzz.io/v1/posts/123
```

## 📚 Reference

- Backend OpenAPI Spec: `backend-link/docs/openapi.yaml`
- Backend Router: `backend-link/src/interfaces/http/modular-router.ts`
- Backend Handler: `backend-link/src/interfaces/http/handlers/blog.handler.ts`
- Frontend API Client: `src/lib/api/blog.ts`
