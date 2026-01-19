'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant, useUpdateTenant } from '@/hooks/useTenants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { ArrowLeft, Save } from 'lucide-react';
import { TenantPlan, TenantStatus, UpdateTenantRequest } from '@/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function EditTenantPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const t = useTranslations('tenants');
  const tCommon = useTranslations('common');
  const router = useRouter();

  const { data: tenant, isLoading, error } = useTenant(resolvedParams.id);
  const updateTenant = useUpdateTenant();

  const [formData, setFormData] = useState<UpdateTenantRequest>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form when tenant data loads
  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name,
        plan: tenant.plan,
        maxUsers: tenant.maxUsers,
        maxStorageBytes: tenant.maxStorageBytes,
        status: tenant.status,
        primaryColor: tenant.primaryColor || '#0066CC',
        logoUrl: tenant.logoUrl || '',
        timeZone: tenant.timeZone || 'Asia/Ho_Chi_Minh',
        culture: tenant.culture || 'vi-VN',
      });
    }
  }, [tenant]);

  const handleChange = (field: keyof UpdateTenantRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleStorageChange = (gb: number) => {
    const bytes = gb * 1024 * 1024 * 1024;
    handleChange('maxStorageBytes', bytes);
  };

  const getStorageGB = () => {
    return formData.maxStorageBytes ? formData.maxStorageBytes / (1024 * 1024 * 1024) : 0;
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.name && !formData.name.trim()) {
      newErrors.name = t('validation.nameRequired');
    }

    if (formData.maxUsers !== undefined && formData.maxUsers < 0) {
      newErrors.maxUsers = t('validation.maxUsersMin');
    }

    if (formData.maxStorageBytes !== undefined && formData.maxStorageBytes <= 0) {
      newErrors.maxStorage = t('validation.maxStorageMin');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await updateTenant.mutateAsync({
        id: resolvedParams.id,
        data: formData,
      });
      router.push(`/tenants/${resolvedParams.id}`);
    } catch (error) {
      // Error already handled by hook
    }
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
      <div className="flex items-center gap-4">
        <Link href={`/tenants/${tenant.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('edit.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('edit.subtitle')}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Thông tin cơ bản
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fields.name')}
                </label>
                <Input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={errors.name}
                />
              </div>

              {/* Subdomain (readonly) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fields.subdomain')}
                </label>
                <Input
                  type="text"
                  value={tenant.subdomain}
                  disabled
                  className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Subdomain không thể thay đổi
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Trạng thái
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('fields.status')}
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', Number(e.target.value) as TenantStatus)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={TenantStatus.Trial}>{t('status.trial')}</option>
                <option value={TenantStatus.Active}>{t('status.active')}</option>
                <option value={TenantStatus.Suspended}>{t('status.suspended')}</option>
                <option value={TenantStatus.Inactive}>{t('status.inactive')}</option>
              </select>
            </div>
          </div>

          {/* Plan & Limits */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Gói dịch vụ & Giới hạn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Plan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fields.plan')}
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => handleChange('plan', Number(e.target.value) as TenantPlan)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={TenantPlan.Trial}>{t('plan.trial')}</option>
                  <option value={TenantPlan.Free}>{t('plan.free')}</option>
                  <option value={TenantPlan.Professional}>{t('plan.professional')}</option>
                  <option value={TenantPlan.Enterprise}>{t('plan.enterprise')}</option>
                </select>
              </div>

              {/* Max Users */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fields.maxUsers')}
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData.maxUsers || 0}
                  onChange={(e) => handleChange('maxUsers', parseInt(e.target.value) || 0)}
                  error={errors.maxUsers}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {t('fields.maxUsersHelper')}
                </p>
              </div>

              {/* Max Storage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fields.maxStorage')} (GB)
                </label>
                <Input
                  type="number"
                  min="1"
                  step="0.1"
                  value={getStorageGB()}
                  onChange={(e) => handleStorageChange(parseFloat(e.target.value) || 1)}
                  error={errors.maxStorage}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {t('fields.maxStorageHelper')}
                </p>
              </div>
            </div>
          </div>

          {/* Branding */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Branding
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Logo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fields.logoUrl')}
                </label>
                <Input
                  type="url"
                  value={formData.logoUrl || ''}
                  onChange={(e) => handleChange('logoUrl', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              {/* Primary Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fields.primaryColor')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.primaryColor || '#0066CC'}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={formData.primaryColor || '#0066CC'}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    placeholder="#0066CC"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Cài đặt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Time Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fields.timeZone')}
                </label>
                <select
                  value={formData.timeZone || 'Asia/Ho_Chi_Minh'}
                  onChange={(e) => handleChange('timeZone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (UTC+7)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                </select>
              </div>

              {/* Culture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('fields.culture')}
                </label>
                <select
                  value={formData.culture || 'vi-VN'}
                  onChange={(e) => handleChange('culture', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="vi-VN">Tiếng Việt (vi-VN)</option>
                  <option value="en-US">English (en-US)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link href={`/tenants/${tenant.id}`}>
              <Button type="button" variant="outline">
                {tCommon('cancel')}
              </Button>
            </Link>
            <Button type="submit" disabled={updateTenant.isPending}>
              <Save className="w-4 h-4 mr-2" />
              {updateTenant.isPending ? tCommon('loading') : t('edit.button')}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
