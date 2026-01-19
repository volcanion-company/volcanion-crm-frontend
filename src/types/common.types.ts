// ============================================
// Common Types - API Response & Pagination
// ============================================

// Backend API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// Pagination Types
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// Error Types
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: {
      field: string;
      message: string;
    }[];
  };
  timestamp: string;
  path: string;
  traceId?: string;
}
