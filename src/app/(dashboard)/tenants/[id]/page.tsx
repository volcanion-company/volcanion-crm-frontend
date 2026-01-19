'use client';

import { use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant, useDeleteTenant } from '@/hooks/useTenants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { Pagination } from '@/components/ui/Pagination';
import {
  TenantStatusBadge,
  TenantPlanBadge,
  StorageUsageBar,
} from '@/components/tenants';
import { ArrowLeft, Edit, Trash2, Users, HardDrive, Calendar, Globe, Palette } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

export default function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const t = useTranslations('tenants');
  const tCommon = useTranslations('common');
  const router = useRouter();

  const { data: tenant, isLoading, error } = useTenant(resolvedParams.id);
  const deleteTenant = useDeleteTenant();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Pagination for users
  const paginatedUsers = useMemo(() => {
    if (!tenant?.users) return { 
      items: [], 
      totalPages: 0, 
      totalCount: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = tenant.users.slice(startIndex, endIndex);
    const totalCount = tenant.users.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    
    return {
      items,
      totalPages,
      totalCount,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [tenant?.users, currentPage, pageSize]);

  const handleDelete = async () => {
    try {
      await deleteTenant.mutateAsync(resolvedParams.id);
      router.push('/tenants');
    } catch (error) {
      // Error handled by hook
    }
    setDeleteDialogOpen(false);
  };

  const formatUsersDisplay = (current?: number, max?: number) => {
    if (max === 0) return `${current || 0} / ${t('usage.unlimited')}`;
    return `${current || 0} / ${max || 0}`;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <Card className="p-12">
          <Loading />
        </Card>
      </div>
    );
  }

  if (error || !tenant) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            {tCommon('error')}: {error?.message || 'Tenant not found'}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/tenants">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tenant.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {tenant.subdomain}.yourcrm.com
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/tenants/${tenant.id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              {t('actions.editTenant')}
            </Button>
          </Link>
          <Button variant="danger" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            {t('actions.deleteTenant')}
          </Button>
        </div>
      </div>

      {/* Status & Plan */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {t('fields.status')}
            </h3>
            <TenantStatusBadge status={tenant.status} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {t('fields.plan')}
            </h3>
            <TenantPlanBadge plan={tenant.plan} />
          </div>
        </div>
      </Card>

      {/* Resource Usage */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Sử dụng tài nguyên
        </h2>
        <div className="space-y-6">
          {/* Storage */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <HardDrive className="w-4 h-4" />
              {t('usage.storage')}
            </div>
            <StorageUsageBar
              used={tenant.storageUsed || 0}
              max={tenant.maxStorageBytes}
            />
          </div>
        </div>
      </Card>

      {/* Branding */}
      {(tenant.logoUrl || tenant.primaryColor) && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Branding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tenant.logoUrl && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {t('fields.logoUrl')}
                </h3>
                <div className="flex items-center gap-3">
                  <img
                    src={tenant.logoUrl}
                    alt={tenant.name}
                    className="w-12 h-12 object-contain rounded border border-gray-200 dark:border-gray-700"
                  />
                  <a
                    href={tenant.logoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate"
                  >
                    {tenant.logoUrl}
                  </a>
                </div>
              </div>
            )}
            {tenant.primaryColor && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  {t('fields.primaryColor')}
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded border border-gray-200 dark:border-gray-700"
                    style={{ backgroundColor: tenant.primaryColor }}
                  />
                  <span className="text-sm text-gray-900 dark:text-white font-mono">
                    {tenant.primaryColor}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Cài đặt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tenant.timeZone && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t('fields.timeZone')}
              </h3>
              <p className="text-gray-900 dark:text-white">{tenant.timeZone}</p>
            </div>
          )}
          {tenant.culture && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('fields.culture')}
              </h3>
              <p className="text-gray-900 dark:text-white">{tenant.culture}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Dates */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Thông tin thời gian
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t('fields.createdAt')}
            </h3>
            <p className="text-gray-900 dark:text-white">{formatDate(tenant.createdAt)}</p>
          </div>
          {tenant.updatedAt && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('fields.updatedAt')}
              </h3>
              <p className="text-gray-900 dark:text-white">{formatDate(tenant.updatedAt)}</p>
            </div>
          )}
          {tenant.trialEndsAt && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('fields.trialEndsAt')}
              </h3>
              <p className="text-gray-900 dark:text-white">{formatDate(tenant.trialEndsAt)}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Users List - Moved to bottom with pagination */}
      {tenant.users && tenant.users.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Người dùng ({tenant.users.length} / {tenant.maxUsers})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tên
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Vai trò
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Trạng thái
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Đăng nhập cuối
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.items.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim()}
                      </div>
                      {user.phone && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user.phone}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {user.lastLoginAt ? formatDate(user.lastLoginAt) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Pagination
              page={currentPage}
              pageSize={pageSize}
              totalCount={paginatedUsers.totalCount}
              totalPages={paginatedUsers.totalPages}
              hasNextPage={paginatedUsers.hasNextPage}
              hasPreviousPage={paginatedUsers.hasPreviousPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </Card>
      )}

      {/* Delete Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('deleteDialog.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('deleteDialog.message')}
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                {tCommon('cancel')}
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleteTenant.isPending}
              >
                {deleteTenant.isPending ? tCommon('deleting') : tCommon('delete')}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
