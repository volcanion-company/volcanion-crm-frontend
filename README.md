# Volcanion CRM Frontend

Hệ thống CRM SaaS đa thuê bao (Multi-Tenant) cấp doanh nghiệp, được xây dựng với Next.js 15, React 19 và TypeScript.

## 🌟 Tính năng chính

### 🔐 Xác thực & Phân quyền
- Đăng nhập/Đăng ký với JWT Token
- Tự động refresh token
- Phân quyền theo vai trò (RBAC)
- Cách ly dữ liệu theo tenant

### 📊 Quản lý Bán hàng
- **Leads**: Quản lý khách hàng tiềm năng, chấm điểm, chuyển đổi
- **Contacts**: Quản lý thông tin liên hệ, lịch sử tương tác
- **Companies**: Quản lý công ty khách hàng
- **Opportunities**: Theo dõi cơ hội bán hàng qua pipeline
- **Deals**: Quản lý giao dịch theo giai đoạn
- **Quotations**: Tạo và quản lý báo giá
- **Orders**: Quản lý đơn hàng
- **Contracts**: Quản lý hợp đồng

### 👥 Quản lý Khách hàng
- **Customers**: Hồ sơ khách hàng đầy đủ
- **Activities**: Theo dõi hoạt động (cuộc gọi, email, họp, công việc)
- **Tickets**: Hỗ trợ khách hàng với SLA tracking

### 📈 Marketing & Báo cáo
- **Campaigns**: Quản lý chiến dịch marketing (Email, SMS)
- **Reports**: Báo cáo & phân tích kinh doanh
- **Workflows**: Tự động hóa quy trình

### ⚙️ Quản trị Hệ thống
- **Users**: Quản lý người dùng
- **Roles**: Quản lý vai trò và quyền hạn
- **Settings**: Cấu hình hệ thống

### 🌐 Đa ngôn ngữ & Giao diện
- Hỗ trợ tiếng Việt và tiếng Anh
- Dark/Light mode
- Responsive design (Desktop & Mobile)

## 🛠️ Tech Stack

### Core Framework
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [Next.js](https://nextjs.org/) | 15.1.4 | React Framework với App Router, SSR, Standalone output |
| [React](https://react.dev/) | 19.0.0 | UI Library (mới nhất với Concurrent Features) |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.2 | Static Type Checking |

### State Management
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0.2 | Client State Management (Auth, UI state) |
| [TanStack React Query](https://tanstack.com/query) | 5.62.8 | Server State, Caching, Data Fetching |
| [React Query Devtools](https://tanstack.com/query) | 5.62.8 | Debug tools cho React Query |

### Styling & UI
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | Utility-first CSS Framework |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.4.0 | Merge Tailwind classes thông minh |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Conditional className utility |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6 | Dark/Light mode switching |
| [Lucide React](https://lucide.dev/) | 0.469.0 | Icon library (SVG icons) |

### Forms & Validation
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [React Hook Form](https://react-hook-form.com/) | 7.54.2 | Performant form handling |
| [Zod](https://zod.dev/) | 3.24.1 | Schema validation |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | 3.9.1 | Zod resolver cho React Hook Form |

### HTTP & API
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [Axios](https://axios-http.com/) | 1.7.9 | HTTP Client với Interceptors |

### Internationalization (i18n)
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [next-intl](https://next-intl-docs.vercel.app/) | 4.7.0 | Đa ngôn ngữ cho Next.js (vi, en) |

### Date & Time
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [date-fns](https://date-fns.org/) | 4.1.0 | Date utility functions |
| [react-day-picker](https://react-day-picker.js.org/) | 9.4.3 | Date picker component |

### Charts & Visualization
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [Recharts](https://recharts.org/) | 2.15.0 | React charting library |

### UI Components
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [cmdk](https://cmdk.paco.me/) | 1.0.4 | Command palette component |
| [Sonner](https://sonner.emilkowal.ski/) | 2.0.7 | Toast notifications |

### Development Tools
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| [ESLint](https://eslint.org/) | 9.18.0 | Code linting |
| [eslint-config-next](https://nextjs.org/docs/basic-features/eslint) | 15.1.4 | Next.js ESLint rules |
| [PostCSS](https://postcss.org/) | 8.4.49 | CSS processing |
| [Autoprefixer](https://autoprefixer.github.io/) | 10.4.20 | CSS vendor prefixes |

### Build & Deploy
| Công nghệ | Mục đích |
|-----------|----------|
| Docker | Containerization với multi-stage build |
| Node.js 18+ Alpine | Production runtime |
| Standalone output | Optimized production build |

## 📁 Cấu trúc Project

```
src/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Các trang đã xác thực
│   │   ├── dashboard/            # Trang tổng quan
│   │   ├── leads/                # Quản lý Lead
│   │   ├── contacts/             # Quản lý Liên hệ
│   │   ├── companies/            # Quản lý Công ty
│   │   ├── customers/            # Quản lý Khách hàng
│   │   ├── deals/                # Quản lý Giao dịch
│   │   ├── quotations/           # Báo giá
│   │   ├── orders/               # Đơn hàng
│   │   ├── contracts/            # Hợp đồng
│   │   ├── tickets/              # Hỗ trợ khách hàng
│   │   ├── activities/           # Hoạt động
│   │   ├── campaigns/            # Chiến dịch Marketing
│   │   ├── workflows/            # Tự động hóa
│   │   ├── reports/              # Báo cáo
│   │   ├── users/                # Quản lý Users
│   │   ├── roles/                # Quản lý Roles
│   │   ├── settings/             # Cài đặt
│   │   └── profile/              # Hồ sơ cá nhân
│   └── auth/                     # Trang xác thực
│       ├── login/                # Đăng nhập
│       └── register/             # Đăng ký Tenant
├── components/
│   ├── ui/                       # UI Components (Button, Input, Table, ...)
│   ├── layout/                   # Layout Components (Sidebar, Header)
│   ├── auth/                     # Auth Components
│   └── providers/                # Context Providers
├── hooks/                        # Custom React Hooks
│   ├── useAuth.ts                # Authentication hooks
│   ├── useLeads.ts               # Lead management hooks
│   ├── useContacts.ts            # Contact hooks
│   └── ...                       # Các hooks khác
├── services/                     # API Service Layer
│   ├── auth.service.ts           # Auth API
│   ├── lead.service.ts           # Lead API
│   └── ...                       # Các service khác
├── stores/                       # Zustand Stores
│   ├── auth.store.ts             # Auth state
│   └── ui.store.ts               # UI state
├── types/                        # TypeScript Types
├── lib/                          # Utilities
│   ├── http-client.ts            # Axios instance với interceptors
│   ├── utils.ts                  # Helper functions
│   └── toast.ts                  # Toast utilities
├── i18n/                         # Internationalization
│   ├── index.ts                  # i18n config
│   └── locales/
│       ├── vi.json               # Tiếng Việt
│       └── en.json               # English
└── config/
    └── constants.ts              # App constants
```

## 🚀 Cài đặt & Chạy

### Yêu cầu

- Node.js >= 18.0.0
- npm hoặc yarn
- Backend API đang chạy (mặc định: http://localhost:5000)

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd volcanion-crm-frontend

# Cài đặt dependencies
npm install

# Tạo file environment
cp .env.local.example .env.local

# Cấu hình API URL trong .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Chạy Development

```bash
npm run dev
```

Truy cập: http://localhost:3000

### Build Production

```bash
# Build
npm run build

# Chạy production
npm start
```

## 🐳 Docker

### Build & Run

```bash
# Build image
docker build -t volcanion-crm-frontend .

# Run container
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://your-api-url volcanion-crm-frontend
```

### Docker Compose

```bash
docker-compose up -d
```

## 📚 Tài liệu API

Chi tiết tích hợp API được mô tả trong thư mục `docs/`:

| File | Mô tả |
|------|-------|
| `BUSINESS_FLOW.md` | Luồng nghiệp vụ chi tiết |
| `api_integration/` | Tài liệu API cho từng module |
| `integration_guide/` | Hướng dẫn tích hợp |
| `CRM_SaaS_API.postman_collection.json` | Postman Collection |

## 📜 Scripts

```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm start            # Chạy production server
npm run lint         # Chạy ESLint
npm run type-check   # Kiểm tra TypeScript
```

## 🔧 Environment Variables

| Biến | Mô tả | Mặc định |
|------|-------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:5000 |

## 📱 Luồng Nghiệp vụ CRM

```
Campaign → Lead → Opportunity → Quotation → Order → Contract → Customer → Ticket
    │         │          │                                          │
    └─────────┴──────────┴── Activities (Calls, Emails, Meetings) ──┘
```

1. **Marketing** tạo Campaign thu hút khách hàng
2. **Sales** nhận Lead từ nhiều nguồn (website, email, social, ...)
3. **Sales** qualify Lead thành Opportunity
4. **Sales** tạo Quotation cho Opportunity
5. **Sales** chốt Order khi khách đồng ý
6. **Sales** ký Contract chính thức
7. **Lead** chuyển đổi thành Customer
8. **Support** tạo Ticket hỗ trợ sau bán hàng

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## � Tài liệu

| Tài liệu | Mô tả |
|----------|-------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Kiến trúc hệ thống chi tiết |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Hướng dẫn đóng góp |
| [docs/BUSINESS_FLOW.md](./docs/BUSINESS_FLOW.md) | Luồng nghiệp vụ CRM |
| [docs/api_integration/](./docs/api_integration/) | Tài liệu API theo module |
| [docs/integration_guide/](./docs/integration_guide/) | Hướng dẫn tích hợp |

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file [LICENSE](./LICENSE) để biết thêm chi tiết.
