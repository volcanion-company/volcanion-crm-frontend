'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant, useDeleteTenant } from '@/hooks/useTenants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
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
          {/* Users */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Users className="w-4 h-4" />
                {t('usage.users')}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatUsersDisplay(tenant.currentUsers, tenant.maxUsers)}
              </span>
            </div>
          </div>

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
