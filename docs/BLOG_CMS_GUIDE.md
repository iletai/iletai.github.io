# Blog CMS - Hướng Dẫn Sử Dụng

## 🎯 Tổng Quan

Hệ thống CMS (Content Management System) cho phép bạn quản lý các bài viết blog một cách dễ dàng với giao diện trực quan và markdown editor mạnh mẽ.

## 📦 Các Tính Năng Đã Được Thêm

### 1. **Blog Editor Component** (`/src/components/admin/BlogEditor.tsx`)

- ✅ Markdown editor với preview real-time (sử dụng @uiw/react-md-editor)
- ✅ Auto-generate slug từ title
- ✅ Upload cover image
- ✅ Chọn category và tags
- ✅ Quản lý status (Draft/Published/Archived)
- ✅ Featured post toggle
- ✅ Preview mode để xem bài viết trước khi publish

### 2. **Blog Management Pages**

#### `/admin/blog` - Danh Sách Bài Viết

- ✅ Hiển thị tất cả bài viết với thông tin chi tiết
- ✅ Filter theo status (All/Published/Draft/Archived)
- ✅ Search bài viết theo title và excerpt
- ✅ Stats cards hiển thị tổng quan (Total, Published, Drafts, Views)
- ✅ Actions: View, Edit, Delete
- ✅ Responsive table design

#### `/admin/blog/new` - Tạo Bài Viết Mới

- ✅ Form đầy đủ với validation
- ✅ Markdown editor với toolbar
- ✅ Sidebar với metadata fields
- ✅ Preview mode
- ✅ Auto-save draft functionality (TODO)

#### `/admin/blog/edit/[id]` - Chỉnh Sửa Bài Viết

- ✅ Load bài viết hiện tại
- ✅ Update thông tin
- ✅ Preview changes
- ✅ Track changes history (TODO)

### 3. **API Service Extensions** (`/src/lib/api/blog.ts`)

Đã thêm các methods mới:

- `getBlogPostById(id)` - Lấy bài viết theo ID
- `createBlogPost(data)` - Tạo bài viết mới
- `updateBlogPost(id, data)` - Cập nhật bài viết
- `deleteBlogPost(id)` - Xóa bài viết
- `publishBlogPost(id)` - Publish bài viết
- `unpublishBlogPost(id)` - Unpublish bài viết
- `archiveBlogPost(id)` - Archive bài viết

## 🚀 Cách Sử Dụng

### Bước 1: Truy Cập Admin Panel

1. Đăng nhập vào `/admin/login`
2. Vào Dashboard tại `/admin/dashboard`
3. Click vào "Blog Posts" trong sidebar hoặc "New Article" button

### Bước 2: Tạo Bài Viết Mới

1. Click "New Post" button
2. Điền thông tin:
   - **Title**: Tiêu đề bài viết (tự động tạo slug)
   - **Slug**: URL-friendly slug (có thể chỉnh sửa)
   - **Excerpt**: Mô tả ngắn gọn
   - **Content**: Nội dung markdown
   - **Cover Image**: URL hình ảnh cover
   - **Category**: Chọn danh mục
   - **Tags**: Chọn tags
   - **Status**: Draft/Published/Archived
   - **Featured**: Đánh dấu bài viết nổi bật

3. Click "Preview" để xem trước
4. Click "Save" để lưu

### Bước 3: Quản Lý Bài Viết

- **View**: Click icon mắt để xem bài viết trên frontend
- **Edit**: Click icon edit để chỉnh sửa
- **Delete**: Click icon trash để xóa (có confirm)
- **Filter**: Lọc theo status hoặc search

## 📝 Markdown Editor Features

### Toolbar Commands

- **Headers**: H1-H6
- **Bold**, *Italic*, ~~Strikethrough~~
- Lists (ordered/unordered)
- Links và Images
- Code blocks
- Blockquotes
- Tables
- Task lists
- Horizontal rules

### Keyboard Shortcuts

- `Ctrl/Cmd + B`: Bold
- `Ctrl/Cmd + I`: Italic
- `Ctrl/Cmd + K`: Link
- `Ctrl/Cmd + Shift + C`: Code block
- Tab: Indent

### Preview Mode

- Click "Preview" button để switch giữa Edit và Preview
- Preview sử dụng react-markdown với GitHub Flavored Markdown (GFM)
- Support HTML trong markdown (với rehype-raw)

## 🔧 Cấu Hình

### Environment Variables

Đảm bảo API backend URL được cấu hình trong `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.iletai.qzz.io
```

### Dependencies Đã Cài Đặt

```json
{
  "@uiw/react-md-editor": "^4.0.0",
  "react-markdown": "^9.0.0",
  "remark-gfm": "^4.0.0",
  "rehype-raw": "^7.0.0"
}
```

## 🔌 API Integration

### Backend Requirements

Backend API cần implement các endpoints sau:

#### GET `/api/posts`

Lấy danh sách bài viết với pagination và filters

```json
{
  "data": {
    "posts": [...],
    "totalCount": 100,
    "page": 1,
    "limit": 20,
    "hasMore": true
  }
}
```

#### GET `/api/posts/:id`

Lấy bài viết theo ID

```json
{
  "data": {
    "id": "1",
    "title": "...",
    "slug": "...",
    "content": "...",
    ...
  }
}
```

#### POST `/api/posts`

Tạo bài viết mới

```json
{
  "title": "My Post",
  "slug": "my-post",
  "content": "...",
  "status": "draft",
  ...
}
```

#### PUT `/api/posts/:id`

Cập nhật bài viết

```json
{
  "title": "Updated Title",
  "content": "...",
  ...
}
```

#### DELETE `/api/posts/:id`

Xóa bài viết

### Categories & Tags

- `GET /api/blog/categories` - Lấy danh sách categories
- `GET /api/blog/tags` - Lấy danh sách tags

## 📊 Navigation Updates

### Dashboard

- Updated "New Article" button to link to `/admin/blog/new`
- Updated "Articles" card to link to `/admin/blog`

### Admin Sidebar

- Changed "Articles" link from `/admin/posts` to `/admin/blog`
- Updated navigation for consistency

## 🎨 UI/UX Features

### Responsive Design

- Mobile-friendly table layout
- Collapsible sidebar
- Touch-friendly controls

### Loading States

- Skeleton loading for lists
- Spinner for async operations
- Progress indicators

### Error Handling

- Form validation
- API error messages
- Graceful fallbacks

## 🚧 TODO / Future Enhancements

### Short Term

- [ ] Auto-save draft functionality
- [ ] Image upload to CDN
- [ ] Bulk actions (delete, publish multiple posts)
- [ ] Version history / Revisions
- [ ] SEO metadata fields

### Medium Term

- [ ] Rich text editor option (WYSIWYG)
- [ ] Collaborative editing
- [ ] Comments moderation
- [ ] Analytics integration (per post)
- [ ] Scheduled publishing

### Long Term

- [ ] Multi-language support
- [ ] Custom fields / ACF
- [ ] Media library
- [ ] Content templates
- [ ] AI writing assistant

## 🐛 Known Issues

1. **Image Upload**: Hiện tại chỉ support URL, chưa có upload file
2. **Real-time Preview**: Preview mode reload toàn bộ content
3. **Autosave**: Chưa implement auto-save draft
4. **History**: Chưa có version history

## 📚 References

### Libraries Used

- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor) - Markdown editor
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown renderer
- [remark-gfm](https://github.com/remarkjs/remark-gfm) - GitHub Flavored Markdown
- [rehype-raw](https://github.com/rehypejs/rehype-raw) - HTML support

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)

## 💡 Tips & Best Practices

1. **SEO-Friendly Slugs**: Luôn dùng slug có ý nghĩa, không dùng số hay ký tự đặc biệt
2. **Featured Images**: Dùng high-quality images (recommended: 1200x630px)
3. **Excerpts**: Giữ excerpt dưới 160 ký tự cho SEO tốt
4. **Tags**: Dùng 3-5 tags mỗi bài để tối ưu classification
5. **Draft First**: Lưu draft trước khi publish để review
6. **Preview**: Luôn preview trước khi publish

## 🤝 Contributing

Nếu muốn thêm features hoặc fix bugs:

1. Fork repository
2. Tạo branch mới (`feature/amazing-feature`)
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📞 Support

Nếu gặp vấn đề, vui lòng:

1. Check documentation này trước
2. Review console errors
3. Check API responses
4. Contact admin nếu cần thiết

---

**Version**: 1.0.0
**Last Updated**: October 26, 2025
**Maintainer**: Le Quang Trong Tai
