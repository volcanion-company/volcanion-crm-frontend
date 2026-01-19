# Kiến trúc Hệ thống (Architecture)

Tài liệu này mô tả chi tiết kiến trúc của **Volcanion CRM Frontend**.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc Tổng thể](#kiến-trúc-tổng-thể)
- [Cấu trúc Thư mục](#cấu-trúc-thư-mục)
- [Các Layers](#các-layers)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Routing](#routing)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [Internationalization](#internationalization)
- [Theming](#theming)
- [Error Handling](#error-handling)
- [Performance](#performance)

---

## 🎯 Tổng quan

Volcanion CRM Frontend là một ứng dụng Single Page Application (SPA) được xây dựng với:

- **Next.js 15** (App Router) - React Framework
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Zustand** - Client State Management
- **TanStack React Query** - Server State Management

### Nguyên tắc Thiết kế

1. **Separation of Concerns** - Phân tách rõ ràng các layers
2. **Single Responsibility** - Mỗi module chỉ làm một việc
3. **DRY (Don't Repeat Yourself)** - Tái sử dụng code
4. **Type Safety** - TypeScript everywhere
5. **Composition over Inheritance** - React composition pattern

---

## 🏗️ Kiến trúc Tổng thể

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                         PRESENTATION LAYER                         │ │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │ │
│  │  │   Pages (App/)   │  │   Components     │  │   UI Components  │ │ │
│  │  │   - Dashboard    │  │   - Layout       │  │   - Button       │ │ │
│  │  │   - Leads        │  │   - Auth         │  │   - Input        │ │ │
│  │  │   - Contacts     │  │   - Providers    │  │   - Table        │ │ │
│  │  │   - ...          │  │                  │  │   - Card         │ │ │
│  │  └──────────────────┘  └──────────────────┘  └──────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                          HOOKS LAYER                               │ │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │ │
│  │  │   useAuth        │  │   useLeads       │  │   useContacts    │ │ │
│  │  │   useLogin       │  │   useCreateLead  │  │   useCustomers   │ │ │
│  │  │   useLogout      │  │   useUpdateLead  │  │   useDeals       │ │ │
│  │  └──────────────────┘  └──────────────────┘  └──────────────────┘ │ │
│  │                    (React Query Mutations/Queries)                 │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                         SERVICE LAYER                              │ │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │ │
│  │  │  auth.service    │  │  lead.service    │  │ contact.service  │ │ │
│  │  │  - login()       │  │  - getLeads()    │  │ - getContacts()  │ │ │
│  │  │  - register()    │  │  - createLead()  │  │ - createContact()│ │ │
│  │  │  - refresh()     │  │  - updateLead()  │  │ - updateContact()│ │ │
│  │  └──────────────────┘  └──────────────────┘  └──────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                       HTTP CLIENT LAYER                            │ │
│  │  ┌──────────────────────────────────────────────────────────────┐ │ │
│  │  │                      http-client.ts                          │ │ │
│  │  │  - Axios Instance                                            │ │ │
│  │  │  - Request Interceptor (attach token)                        │ │ │
│  │  │  - Response Interceptor (handle errors, refresh token)       │ │ │
│  │  │  - Error Handling                                            │ │ │
│  │  └──────────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
└────────────────────────────────────┼─────────────────────────────────────┘
                                     │
                                     ▼
                    ┌────────────────────────────────┐
                    │        BACKEND API             │
                    │    (http://localhost:5000)     │
                    └────────────────────────────────┘
```

---

## 📁 Cấu trúc Thư mục

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css               # Global styles với CSS variables
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (redirect)
│   ├── providers.tsx             # App providers wrapper
│   │
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── layout.tsx            # Dashboard layout (sidebar, header)
│   │   ├── dashboard/            # Dashboard home
│   │   ├── leads/                # Lead management
│   │   │   ├── page.tsx          # List leads
│   │   │   ├── new/page.tsx      # Create lead
│   │   │   └── [id]/             # Lead detail
│   │   │       ├── page.tsx      # View lead
│   │   │       └── edit/page.tsx # Edit lead
│   │   ├── contacts/             # Contact management
│   │   ├── companies/            # Company management
│   │   ├── customers/            # Customer management
│   │   ├── deals/                # Deal pipeline
│   │   ├── quotations/           # Quotation management
│   │   ├── orders/               # Order management
│   │   ├── contracts/            # Contract management
│   │   ├── tickets/              # Support tickets
│   │   ├── activities/           # Activity tracking
│   │   ├── campaigns/            # Marketing campaigns
│   │   ├── workflows/            # Workflow automation
│   │   ├── reports/              # Reports & analytics
│   │   ├── users/                # User management
│   │   ├── roles/                # Role management
│   │   ├── settings/             # System settings
│   │   └── profile/              # User profile
│   │
│   └── auth/                     # Auth route group
│       ├── login/page.tsx        # Login page
│       └── register/page.tsx     # Tenant registration
│
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   ├── Dialog.tsx
│   │   ├── Badge.tsx
│   │   ├── Pagination.tsx
│   │   ├── Loading.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── UserMenu.tsx
│   │
│   ├── layout/                   # Layout components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── DashboardLayout.tsx
│   │
│   ├── auth/                     # Auth components
│   │   └── AuthGuard.tsx
│   │
│   └── providers/                # Context providers
│       └── QueryProvider.tsx
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Auth hooks (useLogin, useLogout, ...)
│   ├── useLeads.ts               # Lead hooks
│   ├── useContacts.ts            # Contact hooks
│   ├── useCompanies.ts           # Company hooks
│   ├── useCustomers.ts           # Customer hooks
│   ├── useDeals.ts               # Deal hooks
│   ├── useQuotations.ts          # Quotation hooks
│   ├── useOrders.ts              # Order hooks
│   ├── useContracts.ts           # Contract hooks
│   ├── useTickets.ts             # Ticket hooks
│   ├── useActivities.ts          # Activity hooks
│   ├── useCampaigns.ts           # Campaign hooks
│   ├── useOpportunities.ts       # Opportunity hooks
│   ├── useUsers.ts               # User hooks
│   ├── useRoles.ts               # Role hooks
│   ├── useReports.ts             # Report hooks
│   └── useTranslation.ts         # i18n hooks
│
├── services/                     # API service layer
│   ├── auth.service.ts
│   ├── lead.service.ts
│   ├── contact.service.ts
│   ├── company.service.ts
│   ├── customer.service.ts
│   ├── deal.service.ts
│   ├── quotation.service.ts
│   ├── order.service.ts
│   ├── contract.service.ts
│   ├── ticket.service.ts
│   ├── activity.service.ts
│   ├── campaign.service.ts
│   ├── opportunity.service.ts
│   ├── user.service.ts
│   ├── role.service.ts
│   ├── report.service.ts
│   ├── workflow.service.ts
│   └── webhook.service.ts
│
├── stores/                       # Zustand stores
│   ├── auth.store.ts             # Auth state (user, token, tenant)
│   └── ui.store.ts               # UI state (sidebar, theme)
│
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Re-export all types
│   ├── auth.types.ts
│   ├── lead.types.ts
│   ├── contact.types.ts
│   ├── customer.types.ts
│   ├── deal.types.ts
│   ├── ticket.types.ts
│   ├── activity.types.ts
│   ├── campaign.types.ts
│   └── ...
│
├── lib/                          # Utilities
│   ├── http-client.ts            # Axios instance với interceptors
│   ├── utils.ts                  # Helper functions (cn, formatDate, ...)
│   └── toast.ts                  # Toast utilities
│
├── i18n/                         # Internationalization
│   ├── index.ts                  # i18n configuration
│   └── locales/
│       ├── vi.json               # Vietnamese translations
│       └── en.json               # English translations
│
└── config/
    └── constants.ts              # App constants (API_URL, AUTH keys)
```

---

## 🔄 Các Layers

### 1. Presentation Layer (UI)

**Trách nhiệm:**
- Render UI
- Handle user interactions
- Form validation (client-side)
- Navigation

**Components:**
```
app/                    # Pages (routes)
components/ui/          # Reusable UI components
components/layout/      # Layout components
```

### 2. Hooks Layer (Business Logic)

**Trách nhiệm:**
- Kết nối UI với Services
- Quản lý loading/error states
- Caching với React Query
- Mutations (create/update/delete)

**Pattern:**
```typescript
// hooks/useLeads.ts
export const useLeads = (params?: LeadParams) => {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => leadApi.getLeads(params),
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateLeadRequest) => leadApi.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
};
```

### 3. Service Layer (API Abstraction)

**Trách nhiệm:**
- Define API endpoints
- Transform request/response data
- Type-safe API calls

**Pattern:**
```typescript
// services/lead.service.ts
export const leadApi = {
  getLeads: async (params?: LeadParams): Promise<PaginatedResponse<Lead>> => {
    const response = await httpClient.get<ApiResponse<PaginatedResponse<Lead>>>(
      '/api/v1/leads',
      params
    );
    return response.data;
  },

  createLead: async (data: CreateLeadRequest): Promise<Lead> => {
    const response = await httpClient.post<ApiResponse<Lead>>(
      '/api/v1/leads',
      data
    );
    return response.data;
  },
};
```

### 4. HTTP Client Layer

**Trách nhiệm:**
- Axios instance configuration
- Request interceptor (attach JWT token)
- Response interceptor (handle errors, refresh token)
- Error transformation

**Features:**
```typescript
// lib/http-client.ts
class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
    });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request: Attach token
    this.client.interceptors.request.use(async (config) => {
      const token = this.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response: Handle errors, refresh token
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Try refresh token
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }
}
```

---

## 🔀 Data Flow

### Read Flow (Query)

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│   Page   │────►│   Hook   │────►│  Service │────►│  HTTP    │────►│ Backend  │
│          │     │(useQuery)│     │          │     │  Client  │     │   API    │
└──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
     ▲                │                                                   │
     │                │ (cached data)                                     │
     │                ▼                                                   │
     │           ┌──────────┐                                             │
     └───────────│  React   │◄────────────────────────────────────────────┘
                 │  Query   │          (response data)
                 │  Cache   │
                 └──────────┘
```

### Write Flow (Mutation)

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│   Page   │────►│   Hook   │────►│  Service │────►│  HTTP    │────►│ Backend  │
│ (submit) │     │(useMuta- │     │          │     │  Client  │     │   API    │
└──────────┘     │   tion)  │     └──────────┘     └──────────┘     └──────────┘
                 └──────────┘                                             │
                      │                                                   │
                      │ onSuccess                                         │
                      ▼                                                   │
                 ┌──────────┐                                             │
                 │Invalidate│◄────────────────────────────────────────────┘
                 │  Cache   │          (success response)
                 └──────────┘
                      │
                      ▼
                 ┌──────────┐
                 │ Refetch  │
                 │  Queries │
                 └──────────┘
```

---

## 🗃️ State Management

### Client State (Zustand)

Sử dụng cho state không liên quan đến server:

```typescript
// stores/auth.store.ts
interface AuthState {
  user: User | null;
  tenantId: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setTenantId: (tenantId: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tenantId: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTenantId: (tenantId) => set({ tenantId }),
      logout: () => set({ user: null, tenantId: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
```

### Server State (React Query)

Sử dụng cho data từ server:

```typescript
// hooks/useLeads.ts
export const useLeads = (params?: LeadParams) => {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => leadApi.getLeads(params),
    staleTime: 5 * 60 * 1000,      // Data fresh trong 5 phút
    gcTime: 30 * 60 * 1000,        // Cache 30 phút
  });
};
```

### State Organization

```
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION STATE                     │
├─────────────────────────┬───────────────────────────────┤
│      Client State       │        Server State           │
│       (Zustand)         │       (React Query)           │
├─────────────────────────┼───────────────────────────────┤
│ • User session          │ • Leads list                  │
│ • Tenant context        │ • Contacts list               │
│ • UI preferences        │ • Deals data                  │
│ • Sidebar state         │ • Reports data                │
│ • Theme (dark/light)    │ • Any data from API           │
│ • Language              │                               │
└─────────────────────────┴───────────────────────────────┘
```

---

## 🛣️ Routing

### App Router Structure

```
app/
├── layout.tsx                    # Root layout (providers)
├── page.tsx                      # / (redirect to /dashboard)
│
├── auth/
│   ├── login/page.tsx            # /auth/login
│   └── register/page.tsx         # /auth/register
│
└── (dashboard)/
    ├── layout.tsx                # Dashboard layout (auth required)
    ├── dashboard/page.tsx        # /dashboard
    ├── leads/
    │   ├── page.tsx              # /leads
    │   ├── new/page.tsx          # /leads/new
    │   └── [id]/
    │       ├── page.tsx          # /leads/:id
    │       └── edit/page.tsx     # /leads/:id/edit
    └── ...
```

### Route Groups

- `(dashboard)` - Nhóm các routes cần authentication
- `auth` - Nhóm các routes không cần authentication

### Protected Routes

```typescript
// components/auth/AuthGuard.tsx
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <Loading />;
  }

  return <>{children}</>;
}
```

---

## 🔐 Authentication

### Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Login     │────►│   Backend   │────►│   JWT       │
│   Form      │     │   /login    │     │   Tokens    │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                    ┌─────────────────────────────────────┐
                    │         localStorage                 │
                    │  • accessToken                       │
                    │  • refreshToken                      │
                    │  • expiresAt                         │
                    └─────────────────────────────────────┘
                                              │
                                              ▼
                    ┌─────────────────────────────────────┐
                    │         HTTP Client                  │
                    │  • Attach token to requests          │
                    │  • Auto refresh when expired         │
                    │  • Redirect to login on 401          │
                    └─────────────────────────────────────┘
```

### Token Storage

```typescript
// config/constants.ts
export const AUTH_CONFIG = {
  TOKEN_KEY: 'crm_access_token',
  REFRESH_TOKEN_KEY: 'crm_refresh_token',
  USER_KEY: 'crm_user',
  TENANT_KEY: 'crm_tenant_id',
  EXPIRES_AT_KEY: 'crm_expires_at',
};
```

---

## 🌐 Internationalization

### Configuration

```typescript
// i18n/index.ts
export const locales = ['vi', 'en'] as const;
export const defaultLocale = 'vi';
```

### Usage

```typescript
// Trong component
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('common');
  
  return <h1>{t('welcome')}</h1>;
}
```

### Translation Files

```json
// i18n/locales/vi.json
{
  "common": {
    "welcome": "Chào mừng",
    "save": "Lưu",
    "cancel": "Hủy"
  },
  "leads": {
    "title": "Quản lý Lead",
    "create": "Tạo Lead mới"
  }
}
```

---

## 🎨 Theming

### CSS Variables

```css
/* app/globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... */
}
```

### Theme Toggle

```typescript
// Sử dụng next-themes
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

---

## ⚠️ Error Handling

### Layers

1. **HTTP Client** - Transform API errors
2. **React Query** - Handle query/mutation errors
3. **Component** - Display error UI

### Error Flow

```typescript
// 1. HTTP Client transforms error
private handleError(error: AxiosError<ApiError>): Error {
  if (error.response?.status === 401) {
    return new Error('Invalid credentials');
  }
  // ...
}

// 2. Hook catches error
const { error, isError } = useLeads();

// 3. Component displays error
if (isError) {
  return <ErrorDisplay message={error.message} />;
}
```

### Toast Notifications

```typescript
import { toast } from 'sonner';

// Success
toast.success('Lead created successfully');

// Error
toast.error('Failed to create lead');

// Loading
toast.loading('Saving...');
```

---

## ⚡ Performance

### Optimizations

1. **Code Splitting** - Next.js automatic code splitting
2. **React Query Caching** - Reduce API calls
3. **Lazy Loading** - Dynamic imports
4. **Memoization** - useMemo, useCallback
5. **Standalone Output** - Optimized production build

### React Query Config

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // 5 minutes
      gcTime: 30 * 60 * 1000,       // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
# Check .next/analyze/
```

---

## 📚 Tài liệu Liên quan

- [README.md](./README.md) - Hướng dẫn cài đặt
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Hướng dẫn đóng góp
- [docs/BUSINESS_FLOW.md](./docs/BUSINESS_FLOW.md) - Luồng nghiệp vụ
- [docs/api_integration/](./docs/api_integration/) - Tài liệu API
