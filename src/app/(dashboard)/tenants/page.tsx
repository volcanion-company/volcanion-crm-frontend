'use client';

import { useState, useEffect } from 'react';
import { useTenants, useDeleteTenant } from '@/hooks/useTenants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { Loading } from '@/components/ui/Loading';
import {
  TenantStatusBadge,
  TenantPlanBadge,
  StorageUsageBar,
} from '@/components/tenants';
import { Plus, Search, Eye, Edit, Trash2, Users, HardDrive } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { TenantStatus, TenantPlan } from '@/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function TenantsPage() {
  const t = useTranslations('tenants');
  const tCommon = useTranslations('common');

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TenantStatus | ''>('');
  const [planFilter, setPlanFilter] = useState<TenantPlan | ''>('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<string | null>(null);

  // Debounce search with 500ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error } = useTenants({
    pageNumber: currentPage,
    pageSize: 10,
    searchTerm: debouncedSearch || undefined,
    status: statusFilter === '' ? undefined : statusFilter,
    plan: planFilter === '' ? undefined : planFilter,
  });

  const deleteTenant = useDeleteTenant();

  const handleDeleteClick = (id: string) => {
    setTenantToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (tenantToDelete) {
      deleteTenant.mutate(tenantToDelete);
      setDeleteDialogOpen(false);
      setTenantToDelete(null);
    }
  };

  const formatUsersDisplay = (current?: number, max?: number) => {
    if (max === 0) return `${current || 0} / ${t('usage.unlimited')}`;
    return `${current || 0} / ${max || 0}`;
  };

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            {tCommon('error')}: {error.message}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('list.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{t('list.subtitle')}</p>
      </div>

      {/* Filters and Actions */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={tCommon('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value === '' ? '' : Number(e.target.value) as TenantStatus);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{tCommon('all')} {t('fields.status')}</option>
            <option value={TenantStatus.Trial}>{t('status.trial')}</option>
            <option value={TenantStatus.Active}>{t('status.active')}</option>
            <option value={TenantStatus.Suspended}>{t('status.suspended')}</option>
            <option value={TenantStatus.Inactive}>{t('status.inactive')}</option>
          </select>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value === '' ? '' : Number(e.target.value) as TenantPlan);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{tCommon('all')} {t('fields.plan')}</option>
            <option value={TenantPlan.Trial}>{t('plan.trial')}</option>
            <option value={TenantPlan.Free}>{t('plan.free')}</option>
            <option value={TenantPlan.Professional}>{t('plan.professional')}</option>
            <option value={TenantPlan.Enterprise}>{t('plan.enterprise')}</option>
          </select>

          {/* Create Button */}
          <Link href="/tenants/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t('create.button')}
            </Button>
          </Link>
        </div>
      </Card>

      {/* Table */}
      <Card>
        {isLoading ? (
          <div className="p-12">
            <Loading />
          </div>
        ) : data && data.items && data.items.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('fields.name')}</TableHead>
                    <TableHead>{t('fields.subdomain')}</TableHead>
                    <TableHead>{t('fields.status')}</TableHead>
                    <TableHead>{t('fields.plan')}</TableHead>
                    <TableHead>{t('usage.users')}</TableHead>
                    <TableHead>{t('usage.storage')}</TableHead>
                    <TableHead>{t('fields.createdAt')}</TableHead>
                    <TableHead className="text-right">{tCommon('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {tenant.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {tenant.subdomain}
                        </div>
                      </TableCell>
                      <TableCell>
                        <TenantStatusBadge status={tenant.status} />
                      </TableCell>
                      <TableCell>
                        <TenantPlanBadge plan={tenant.plan} showIcon={false} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">
                            {formatUsersDisplay(tenant.currentUsers, tenant.maxUsers)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[150px]">
                          <StorageUsageBar
                            used={tenant.storageUsed || 0}
                            max={tenant.maxStorageBytes}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(tenant.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/tenants/${tenant.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/tenants/${tenant.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(tenant.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Pagination
                  page={currentPage}
                  pageSize={data.pageSize}
                  totalCount={data.totalCount}
                  totalPages={data.totalPages}
                  hasNextPage={data.hasNextPage}
                  hasPreviousPage={data.hasPreviousPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">{t('empty.description')}</p>
            <Link href="/tenants/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t('empty.button')}
              </Button>
            </Link>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
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
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setTenantToDelete(null);
                }}
              >
                {tCommon('cancel')}
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteConfirm}
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
