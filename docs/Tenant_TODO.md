# Tenant Module Integration - TODO List

## Tổng quan

Module Tenant quản lý các tổ chức (organizations) trong hệ thống CRM SaaS multi-tenant. Mỗi tenant có subdomain riêng, plan riêng, và dữ liệu được cách ly hoàn toàn.

**Base URL:** `/api/v1/tenants`

---

## 📋 Danh sách công việc

### 1. Types & Interfaces ✅

- [x] **1.1** Tạo file `src/types/tenant.types.ts`
  - [x] Interface `Tenant` (id, name, subdomain, status, plan, maxUsers, currentUsers, maxStorageBytes, storageUsed, logoUrl, primaryColor, timeZone, culture, createdAt, trialEndsAt)
  - [x] Enum `TenantStatus` (Trial=0, Active=1, Suspended=2, Inactive=3, Deleted=4)
  - [x] Enum `TenantPlan` (Trial=0, Free=1, Professional=2, Enterprise=3)
  - [x] Interface `TenantListParams` (pagination, filters)
  - [x] Interface `CreateTenantRequest` (name, subdomain, plan, maxUsers, maxStorageBytes, primaryColor, logoUrl)
  - [x] Interface `UpdateTenantRequest` (partial của CreateTenantRequest + status)
  - [x] Interface `TenantRegistrationRequest` (companyName, subdomain, adminEmail, adminFirstName, adminLastName, password, confirmPassword, phoneNumber, industry)
  - [x] Interface `TenantRegistrationResponse` (tenantId, subdomain, url, adminUserId, trialEndsAt)

### 2. API Service ✅

- [x] **2.1** Tạo file `src/services/tenant.service.ts`
  - [x] `getTenants(params)` - GET /api/v1/tenants - Lấy danh sách tenants (Super Admin)
  - [x] `getTenantById(id)` - GET /api/v1/tenants/{id} - Lấy chi tiết tenant
  - [x] `registerTenant(data)` - POST /api/v1/tenants/register - Đăng ký tenant mới (Public, AllowAnonymous)
  - [x] `createTenant(data)` - POST /api/v1/tenants - Tạo tenant (Super Admin)
  - [x] `updateTenant(id, data)` - PUT /api/v1/tenants/{id} - Cập nhật tenant
  - [x] `deleteTenant(id)` - DELETE /api/v1/tenants/{id} - Xóa tenant (soft delete)

### 3. React Hooks ✅

- [x] **3.1** Tạo file `src/hooks/useTenants.ts`
  - [x] `useTenants(params)` - Hook lấy danh sách tenants với React Query
  - [x] `useTenant(id)` - Hook lấy chi tiết tenant
  - [x] `useCreateTenant()` - Mutation hook tạo tenant
  - [x] `useUpdateTenant()` - Mutation hook cập nhật tenant
  - [x] `useDeleteTenant()` - Mutation hook xóa tenant
  - [x] `useRegisterTenant()` - Mutation hook đăng ký tenant (public)

### 4. UI Components ✅

#### 4.1 Trang danh sách Tenants (Super Admin) ✅
- [x] **4.1.1** Tạo `src/app/(dashboard)/tenants/page.tsx`
  - [x] Bảng danh sách tenants với columns: Name, Subdomain, Status, Plan, Users, Storage, Created
  - [x] Badge màu cho Status (Active=green, Trial=blue, Suspended=yellow, Inactive=gray, Deleted=red)
  - [x] Badge màu cho Plan (Trial=blue, Free=gray, Professional=purple, Enterprise=gold)
  - [x] Hiển thị usage: "8/10 users", "6.2 GB / 10 GB"
  - [x] Progress bar cho storage usage
  - [x] Search by name, subdomain
  - [x] Filter by status, plan
  - [x] Pagination

#### 4.2 Trang chi tiết Tenant ✅
- [x] **4.2.1** Tạo `src/app/(dashboard)/tenants/[id]/page.tsx`
  - [x] Thông tin cơ bản: Name, Subdomain, Status, Plan
  - [x] Resource usage: Users (current/max), Storage (used/max)
  - [x] Branding: Logo, Primary Color
  - [x] Settings: TimeZone, Culture
  - [x] Dates: Created, Trial Ends
  - [x] Quick actions: Edit, Suspend, Delete

#### 4.3 Trang tạo Tenant (Super Admin) ✅
- [x] **4.3.1** Tạo `src/app/(dashboard)/tenants/create/page.tsx`
  - [x] Form fields: Name, Subdomain (với validation real-time), Plan, MaxUsers, MaxStorage
  - [x] Optional: Logo URL, Primary Color (color picker)
  - [x] Subdomain validation: lowercase, alphanumeric + hyphens, 3-63 chars, không trùng
  - [x] Preview subdomain URL: "https://{subdomain}.yourcrm.com"

#### 4.4 Trang chỉnh sửa Tenant ✅
- [x] **4.4.1** Tạo `src/app/(dashboard)/tenants/[id]/edit/page.tsx`
  - [x] Pre-fill form với dữ liệu hiện tại
  - [x] Không cho phép thay đổi subdomain (readonly)
  - [x] Cho phép thay đổi: Name, Plan, MaxUsers, MaxStorage, Status, Branding

#### 4.5 Trang đăng ký Tenant (Public)
- [ ] **4.5.1** Tạo `src/app/auth/register/page.tsx` hoặc `src/app/register/page.tsx`
  - [ ] Form đăng ký công khai (không cần auth)
  - [ ] Fields: Company Name, Subdomain, Admin Email, First Name, Last Name, Password, Confirm Password
  - [ ] Optional: Phone, Industry
  - [ ] Subdomain availability check (debounced API call)
  - [ ] Password strength indicator
  - [ ] Terms & Conditions checkbox
  - [ ] Redirect sau khi đăng ký thành công

### 5. Shared Components ✅

- [x] **5.1** Tạo `src/components/tenants/TenantStatusBadge.tsx`
  - [x] Badge component hiển thị status với màu tương ứng
  
- [x] **5.2** Tạo `src/components/tenants/TenantPlanBadge.tsx`
  - [x] Badge component hiển thị plan với màu và icon
  
- [x] **5.3** Tạo `src/components/tenants/StorageUsageBar.tsx`
  - [x] Progress bar hiển thị % storage đã dùng
  - [x] Đổi màu khi gần limit (>80% = yellow, >95% = red)
  
- [x] **5.4** Tạo `src/components/tenants/SubdomainInput.tsx`
  - [x] Input với validation và availability check
  - [x] Hiển thị preview URL

### 6. i18n Translations ✅

- [x] **6.1** Thêm translations vào `src/i18n/locales/vi.json`
- [x] **6.2** Thêm translations vào `src/i18n/locales/en.json`

### 7. Routing & Navigation ✅

- [x] **7.1** Thêm menu item "Tenants" vào sidebar (chỉ hiển thị cho Super Admin)
- [x] **7.2** Cấu hình routes:
  - [x] `/tenants` - Danh sách
  - [x] `/tenants/create` - Tạo mới
  - [x] `/tenants/[id]` - Chi tiết
  - [x] `/tenants/[id]/edit` - Chỉnh sửa
  - [ ] `/register` hoặc `/auth/register` - Đăng ký công khai

### 8. Permissions ✅

- [x] **8.1** Kiểm tra và bổ sung permissions trong `roles.permissions`:
  - [x] `tenant.view` - Xem tenant
  - [x] `tenant.create` - Tạo tenant
  - [x] `tenant.update` - Cập nhật tenant
  - [x] `tenant.delete` - Xóa tenant

- [ ] **8.2** Áp dụng permission checks trong UI:
  - [ ] Ẩn menu/button nếu không có quyền
  - [ ] Redirect nếu truy cập trực tiếp URL

### 9. Validation Rules ✅

- [x] **9.1** Subdomain validation:
  - [x] Độ dài: 3-63 ký tự
  - [x] Chỉ chứa: lowercase letters, numbers, hyphens
  - [x] Không bắt đầu/kết thúc bằng hyphen
  - [x] Không trùng reserved subdomains: www, api, admin, app, mail, ftp, etc.
  - [x] Check trùng với database

- [ ] **9.2** Password validation (khi register):
  - [ ] Tối thiểu 8 ký tự
  - [ ] Ít nhất 1 chữ hoa, 1 chữ thường, 1 số
  - [ ] Password và Confirm Password phải khớp

### 10. Testing

- [ ] **10.1** Test API service với mock data
- [ ] **10.2** Test hooks với React Query
- [ ] **10.3** Test form validations
- [ ] **10.4** Test permission checks
- [ ] **10.5** E2E test flow đăng ký tenant

---

## 📊 Thứ tự ưu tiên thực hiện

| # | Task | Priority | Dependency |
|---|------|----------|------------|
| 1 | Types & Interfaces | 🔴 High | - |
| 2 | API Service | 🔴 High | Types |
| 3 | React Hooks | 🔴 High | Service |
| 4 | i18n Translations | 🟡 Medium | - |
| 5 | Shared Components | 🟡 Medium | Types |
| 6 | List Page | 🟡 Medium | Hooks, i18n |
| 7 | Detail Page | 🟡 Medium | Hooks, i18n |
| 8 | Create Page | 🟡 Medium | Hooks, i18n |
| 9 | Edit Page | 🟡 Medium | Hooks, i18n |
| 10 | Register Page (Public) | 🟢 Low | Hooks, i18n |
| 11 | Navigation & Routing | 🟡 Medium | Pages |
| 12 | Permissions | 🟡 Medium | - |
| 13 | Testing | 🟢 Low | All |

---

## 📝 Notes

### API Endpoint đặc biệt

- **Register Tenant** (`POST /api/v1/tenants/register`) là endpoint **public** (AllowAnonymous), không cần authentication. Cần xử lý riêng trong http-client.

### Soft Delete

- Delete tenant chỉ đánh dấu `status = Deleted`, không xóa ngay
- Data được purge sau 30 ngày grace period
- Có thể restore trong grace period

### Tenant Context

- Hầu hết các API khác đều tự động filter theo TenantId từ JWT token
- Module Tenant này chủ yếu dành cho Super Admin quản lý cross-tenant

### Storage Formatting

- Backend trả về bytes (`maxStorageBytes`, `storageUsed`)
- Frontend cần format: bytes → KB → MB → GB → TB
- Utility function: `formatBytes(bytes)`

---

## 🔗 Reference

- API Documentation: `docs/api_integration/Tenants_API.md`
- Existing patterns: Xem các module đã implement (Customers, Leads, Users, Roles)
