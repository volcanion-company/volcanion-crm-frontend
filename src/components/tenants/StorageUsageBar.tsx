import { useTranslation } from '@/hooks/useTranslation';

interface StorageUsageBarProps {
  used: number; // bytes
  max: number; // bytes
  className?: string;
}

export function StorageUsageBar({ used, max, className = '' }: StorageUsageBarProps) {
  const { t } = useTranslation();

  // Calculate percentage
  const percentage = max > 0 ? Math.min((used / max) * 100, 100) : 0;

  // Determine color based on usage
  const getColorClass = () => {
    if (percentage >= 95) {
      return 'bg-red-600 dark:bg-red-500';
    } else if (percentage >= 80) {
      return 'bg-yellow-600 dark:bg-yellow-500';
    }
    return 'bg-green-600 dark:bg-green-500';
  };

  // Format bytes to human-readable format
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formattedUsed = formatBytes(used);
  const formattedMax = formatBytes(max);

  return (
    <div className={`w-full ${className}`}>
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getColorClass()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Usage text */}
      <div className="mt-1 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>
          {formattedUsed} / {formattedMax}
        </span>
        <span className="font-medium">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
}
