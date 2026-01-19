# Hướng dẫn Đóng góp (Contributing Guide)

Cảm ơn bạn đã quan tâm đến việc đóng góp cho **Volcanion CRM Frontend**! Tài liệu này hướng dẫn cách tham gia phát triển dự án.

## 📋 Mục lục

- [Code of Conduct](#code-of-conduct)
- [Bắt đầu](#bắt-đầu)
- [Quy trình Phát triển](#quy-trình-phát-triển)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request](#pull-request)
- [Báo cáo Lỗi](#báo-cáo-lỗi)
- [Đề xuất Tính năng](#đề-xuất-tính-năng)

---

## Code of Conduct

Dự án này tuân thủ các nguyên tắc:
- Tôn trọng lẫn nhau
- Xây dựng môi trường làm việc tích cực
- Chấp nhận phản hồi mang tính xây dựng
- Tập trung vào lợi ích chung của cộng đồng

---

## 🚀 Bắt đầu

### Yêu cầu

- Node.js >= 18.0.0
- npm hoặc yarn
- Git
- VS Code (khuyến nghị)

### Thiết lập môi trường

```bash
# 1. Fork repository trên GitHub

# 2. Clone fork của bạn
git clone https://github.com/YOUR_USERNAME/volcanion-crm-frontend.git
cd volcanion-crm-frontend

# 3. Thêm upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/volcanion-crm-frontend.git

# 4. Cài đặt dependencies
npm install

# 5. Tạo file environment
cp .env.local.example .env.local

# 6. Chạy development server
npm run dev
```

### VS Code Extensions (Khuyến nghị)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- GitLens

---

## 🔄 Quy trình Phát triển

### 1. Tạo Branch

```bash
# Cập nhật main branch
git checkout main
git pull upstream main

# Tạo feature branch
git checkout -b feature/ten-tinh-nang

# Hoặc bugfix branch
git checkout -b fix/ten-bug
```

### Quy ước đặt tên Branch

| Loại | Format | Ví dụ |
|------|--------|-------|
| Feature mới | `feature/ten-tinh-nang` | `feature/lead-scoring` |
| Sửa lỗi | `fix/ten-bug` | `fix/login-error` |
| Cải thiện | `improve/ten-module` | `improve/table-performance` |
| Refactor | `refactor/ten-module` | `refactor/auth-service` |
| Docs | `docs/ten-tai-lieu` | `docs/api-integration` |

### 2. Phát triển

```bash
# Chạy development server
npm run dev

# Kiểm tra lỗi TypeScript
npm run type-check

# Kiểm tra lỗi ESLint
npm run lint
```

### 3. Test trước khi commit

```bash
# Chạy tất cả checks
npm run type-check && npm run lint && npm run build
```

---

## 📏 Coding Standards

### TypeScript

```typescript
// ✅ Tốt: Sử dụng interface cho object types
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Tốt: Sử dụng type cho unions/intersections
type Status = 'active' | 'inactive' | 'pending';

// ✅ Tốt: Explicit return types cho functions
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Tránh: any type
const data: any = fetchData(); // Không nên

// ✅ Tốt: Sử dụng unknown và type guard
const data: unknown = fetchData();
if (isUser(data)) {
  console.log(data.name);
}
```

### React Components

```tsx
// ✅ Tốt: Functional components với TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-4 py-2 rounded-md',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-secondary text-foreground'
      )}
    >
      {label}
    </button>
  );
}
```

### File & Folder Naming

```
src/
├── components/
│   └── ui/
│       └── Button.tsx          # PascalCase cho components
├── hooks/
│   └── useAuth.ts              # camelCase với prefix "use"
├── services/
│   └── auth.service.ts         # kebab-case với suffix
├── types/
│   └── auth.types.ts           # kebab-case với suffix
└── lib/
    └── http-client.ts          # kebab-case
```

### Imports Order

```typescript
// 1. React/Next.js imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { authApi } from '@/services/auth.service';
import { User } from '@/types';

// 4. Relative imports
import { LocalComponent } from './LocalComponent';

// 5. Styles (nếu có)
import styles from './styles.module.css';
```

---

## 💬 Commit Messages

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type | Mô tả |
|------|-------|
| `feat` | Tính năng mới |
| `fix` | Sửa lỗi |
| `docs` | Thay đổi documentation |
| `style` | Format code (không ảnh hưởng logic) |
| `refactor` | Refactor code |
| `perf` | Cải thiện performance |
| `test` | Thêm/sửa tests |
| `chore` | Thay đổi build process, dependencies |

### Ví dụ

```bash
# Feature mới
git commit -m "feat(leads): add lead scoring calculation"

# Sửa lỗi
git commit -m "fix(auth): handle token refresh error properly"

# Refactor
git commit -m "refactor(services): extract common API logic to base service"

# Docs
git commit -m "docs(readme): update installation instructions"
```

---

## 🔀 Pull Request

### Checklist trước khi tạo PR

- [ ] Code đã pass tất cả checks (`type-check`, `lint`, `build`)
- [ ] Đã test trên local
- [ ] Đã cập nhật documentation (nếu cần)
- [ ] Commit messages theo đúng format
- [ ] Branch đã được rebase với main mới nhất

### Tạo Pull Request

1. Push branch lên fork của bạn:
   ```bash
   git push origin feature/ten-tinh-nang
   ```

2. Tạo Pull Request trên GitHub

3. Điền template PR:
   ```markdown
   ## Mô tả
   Mô tả ngắn gọn về thay đổi

   ## Loại thay đổi
   - [ ] Feature mới
   - [ ] Bug fix
   - [ ] Refactor
   - [ ] Documentation

   ## Checklist
   - [ ] Đã test trên local
   - [ ] Đã cập nhật docs
   - [ ] Không có breaking changes

   ## Screenshots (nếu có UI changes)
   ```

### Review Process

1. Ít nhất 1 approval từ maintainer
2. Tất cả CI checks phải pass
3. Không có conflicts với main branch
4. Squash commits khi merge

---

## 🐛 Báo cáo Lỗi

### Trước khi báo cáo

1. Kiểm tra [Issues](https://github.com/OWNER/volcanion-crm-frontend/issues) xem lỗi đã được báo cáo chưa
2. Đảm bảo đang sử dụng phiên bản mới nhất
3. Thử reproduce lỗi trên môi trường clean

### Template báo cáo lỗi

```markdown
## Mô tả lỗi
Mô tả rõ ràng về lỗi

## Các bước tái hiện
1. Vào trang '...'
2. Click vào '...'
3. Scroll xuống '...'
4. Thấy lỗi

## Kết quả mong đợi
Mô tả kết quả đúng

## Screenshots
Nếu có thể, thêm screenshots

## Môi trường
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Node version: [e.g. 18.19.0]
```

---

## 💡 Đề xuất Tính năng

### Template đề xuất

```markdown
## Tính năng đề xuất
Mô tả ngắn gọn về tính năng

## Vấn đề cần giải quyết
Tính năng này giải quyết vấn đề gì?

## Giải pháp đề xuất
Mô tả cách bạn muốn tính năng hoạt động

## Alternatives đã cân nhắc
Các giải pháp thay thế đã xem xét

## Context bổ sung
Thông tin thêm, mockups, etc.
```

---

## 📞 Liên hệ

- **Issues**: Sử dụng GitHub Issues
- **Discussions**: Sử dụng GitHub Discussions
- **Email**: dev-team@volcanion.io

---

Cảm ơn bạn đã đóng góp! 🎉
