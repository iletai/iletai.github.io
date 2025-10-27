# 🎬 Quick Start Guide - Blog CMS

## 🚀 Khởi Động Nhanh (5 phút)

### Bước 1: Mở Browser

Truy cập: **<http://localhost:3001>**

### Bước 2: Đăng Nhập Admin

- URL: `/admin/login`
- Nhập credentials của bạn

### Bước 3: Vào Blog Management

Có 3 cách:

**Cách 1**: Từ Dashboard

1. Vào `/admin/dashboard`
2. Click "Blog Posts" trong sidebar (bên trái)

**Cách 2**: Direct Link

- Truy cập trực tiếp: `/admin/blog`

**Cách 3**: Quick Action

- Từ Dashboard, click "New Article" button

## 📝 Tạo Bài Viết Đầu Tiên

### 1. Click "New Post"

Từ `/admin/blog`, click nút **"New Post"** (màu xanh, góc trên bên phải)

### 2. Điền Thông Tin

#### Required Fields (*)

- **Title**: Ví dụ: "Hướng dẫn sử dụng Next.js 15"
- **Slug**: Auto-generate từ title → `huong-dan-su-dung-nextjs-15`
- **Content**: Viết bằng Markdown

#### Optional Fields

- **Excerpt**: Mô tả ngắn (SEO-friendly)
- **Cover Image**: URL hình ảnh
- **Category**: Chọn danh mục
- **Tags**: Chọn nhiều tags
- **Status**: Draft / Published / Archived
- **Featured**: Tick nếu muốn làm bài nổi bật

### 3. Viết Content (Markdown)

**Ví dụ đơn giản**:

```markdown
# Giới Thiệu

Next.js 15 mang đến nhiều tính năng mới...

## Cài Đặt

\`\`\`bash
npm install next@latest
\`\`\`

## Tính Năng Mới

- Turbopack stable
- Server Components
- Improved performance

## Kết Luận

Next.js 15 là một bước tiến lớn...
```

### 4. Preview

Click nút **"Preview"** để xem bài viết render như thế nào

### 5. Save

- **Draft**: Click "Save" với Status = Draft (lưu nháp)
- **Publish**: Đổi Status = Published, rồi click "Save"

## 🎨 Markdown Editor Shortcuts

### Formatting

- `Ctrl/Cmd + B` → **Bold**
- `Ctrl/Cmd + I` → *Italic*
- `Ctrl/Cmd + K` → [Link]()

### Structure

- `#` → H1
- `##` → H2
- `-` hoặc `*` → Bullet list
- `1.` → Numbered list

### Code

- `` ` `` → Inline code
- ```` ``` ```` → Code block

### Insert

- `![alt](url)` → Image
- `[text](url)` → Link
- `>` → Blockquote
- `---` → Horizontal rule

## 📊 Quản Lý Bài Viết

### View List

URL: `/admin/blog`

**Tính năng**:

- ✅ Search posts
- ✅ Filter by status
- ✅ View stats
- ✅ Quick actions

### Actions

#### View Post

- Click icon **mắt** (👁️) → Mở bài viết trong tab mới

#### Edit Post

- Click icon **bút** (✏️) → Mở form chỉnh sửa

#### Delete Post

- Click icon **thùng rác** (🗑️) → Xác nhận xóa

### Search & Filter

#### Search

- Gõ vào ô search
- Tìm theo title hoặc excerpt
- Real-time filtering

#### Filter by Status

- **All Status**: Hiển thị tất cả
- **Published**: Chỉ bài đã publish
- **Draft**: Chỉ bài draft
- **Archived**: Chỉ bài archived

## 🎯 Tips & Tricks

### 1. Auto-Generate Slug

- Gõ title → Slug tự động tạo
- Vietnamese có dấu → Chuyển thành không dấu
- Khoảng trắng → Dấu gạch ngang

### 2. Preview Before Publish

- Luôn preview trước khi publish
- Check formatting, images, links

### 3. Use Drafts

- Lưu draft khi chưa hoàn thành
- Có thể quay lại edit sau

### 4. Featured Posts

- Tick "Featured" cho bài quan trọng
- Hiển thị nổi bật trên homepage

### 5. SEO Optimization

- Slug ngắn gọn, có keyword
- Excerpt dưới 160 ký tự
- Cover image chất lượng cao

## 🔍 Troubleshooting

### Không thấy Editor?

- Check browser console (F12)
- Đảm bảo JavaScript enabled
- Thử refresh page (Ctrl/Cmd + R)

### Preview không hiển thị?

- Check markdown syntax
- Ensure content is not empty

### Không lưu được?

- Check required fields (Title, Slug, Content)
- Check browser console for errors
- Verify API connection

### Images không load?

- Check URL hợp lệ
- Ensure image accessible
- Try different image URL

## 📱 Mobile Usage

### Responsive Design

- Editor works on mobile
- Touch-friendly buttons
- Adaptive layout

### Best Practice

- Use desktop for better experience
- Mobile good for quick edits
- Preview on different devices

## ⌨️ Keyboard Shortcuts (Full List)

### Editor

- `Ctrl/Cmd + B` → Bold
- `Ctrl/Cmd + I` → Italic
- `Ctrl/Cmd + K` → Insert link
- `Ctrl/Cmd + Shift + C` → Code block
- `Tab` → Indent
- `Shift + Tab` → Outdent

### Navigation

- `Ctrl/Cmd + S` → Save (TODO)
- `Esc` → Close preview
- `Ctrl/Cmd + P` → Toggle preview (TODO)

## 🎓 Learning Resources

### Markdown

- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

### Next.js

- [Next.js Docs](https://nextjs.org/docs)

### CMS Usage

- `BLOG_CMS_GUIDE.md` - Full documentation
- `BLOG_CMS_IMPLEMENTATION.md` - Technical details

## ✅ Checklist: Tạo Bài Viết Chất Lượng

Trước khi publish, check:

- [ ] Title rõ ràng, hấp dẫn
- [ ] Slug SEO-friendly
- [ ] Excerpt dưới 160 ký tự
- [ ] Cover image chất lượng cao (1200x630px)
- [ ] Content đầy đủ, có structure
- [ ] Code blocks có syntax highlighting
- [ ] Images có alt text
- [ ] Links hoạt động
- [ ] Category phù hợp
- [ ] Tags relevant (3-5 tags)
- [ ] Preview kiểm tra
- [ ] Spelling & grammar check

## 🚀 Next Steps

Sau khi master basics:

1. Explore advanced markdown features
2. Try custom CSS in content
3. Experiment with code blocks
4. Add interactive elements
5. Optimize for SEO

---

**Happy Writing! ✍️**

Nếu cần help, check `BLOG_CMS_GUIDE.md` hoặc contact admin.
