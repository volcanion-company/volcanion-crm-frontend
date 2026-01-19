import { TenantStatus } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface TenantStatusBadgeProps {
  status: TenantStatus;
  className?: string;
}

export function TenantStatusBadge({ status, className = '' }: TenantStatusBadgeProps) {
  const { t } = useTranslation();

  const statusConfig = {
    [TenantStatus.Trial]: {
      label: t('tenants.status.trial'),
      className:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    },
    [TenantStatus.Active]: {
      label: t('tenants.status.active'),
      className:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800',
    },
    [TenantStatus.Suspended]: {
      label: t('tenants.status.suspended'),
      className:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
    },
    [TenantStatus.Inactive]: {
      label: t('tenants.status.inactive'),
      className:
        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700',
    },
    [TenantStatus.Deleted]: {
      label: t('tenants.status.deleted'),
      className:
        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
    },
  };

  // Handle both enum number and string status from API
  const normalizeStatus = (s: TenantStatus | string): TenantStatus => {
    if (typeof s === 'number') return s;
    const statusMap: Record<string, TenantStatus> = {
      'Trial': TenantStatus.Trial,
      'Active': TenantStatus.Active,
      'Suspended': TenantStatus.Suspended,
      'Inactive': TenantStatus.Inactive,
      'Deleted': TenantStatus.Deleted,
    };
    return statusMap[s] ?? TenantStatus.Active;
  };

  const normalizedStatus = normalizeStatus(status);
  const config = statusConfig[normalizedStatus];

  if (!config) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}
