import { TenantPlan } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Sparkles,
  Gift,
  Briefcase,
  Building2,
} from 'lucide-react';

interface TenantPlanBadgeProps {
  plan: TenantPlan;
  className?: string;
  showIcon?: boolean;
}

export function TenantPlanBadge({ plan, className = '', showIcon = true }: TenantPlanBadgeProps) {
  const { t } = useTranslation();

  const planConfig = {
    [TenantPlan.Trial]: {
      label: t('tenants.plan.trial'),
      icon: Sparkles,
      className:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    },
    [TenantPlan.Free]: {
      label: t('tenants.plan.free'),
      icon: Gift,
      className:
        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700',
    },
    [TenantPlan.Professional]: {
      label: t('tenants.plan.professional'),
      icon: Briefcase,
      className:
        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800',
    },
    [TenantPlan.Enterprise]: {
      label: t('tenants.plan.enterprise'),
      icon: Building2,
      className:
        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
    },
  };

  // Handle both enum number and string plan from API
  const normalizePlan = (p: TenantPlan | string): TenantPlan => {
    if (typeof p === 'number') return p;
    const planMap: Record<string, TenantPlan> = {
      'Trial': TenantPlan.Trial,
      'Free': TenantPlan.Free,
      'Professional': TenantPlan.Professional,
      'Enterprise': TenantPlan.Enterprise,
    };
    return planMap[p] ?? TenantPlan.Free;
  };

  const normalizedPlan = normalizePlan(plan);
  const config = planConfig[normalizedPlan];
  
  if (!config) {
    return null;
  }

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
}
