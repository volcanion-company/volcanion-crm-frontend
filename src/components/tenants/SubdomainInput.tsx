import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCheckSubdomain } from '@/hooks/useTenants';
import {
  SUBDOMAIN_REGEX,
  SUBDOMAIN_MIN_LENGTH,
  SUBDOMAIN_MAX_LENGTH,
  RESERVED_SUBDOMAINS,
} from '@/types/tenant.types';
import { Check, X, Loader2, AlertCircle } from 'lucide-react';

interface SubdomainInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function SubdomainInput({
  value,
  onChange,
  onValidationChange,
  disabled = false,
  required = false,
  className = '',
}: SubdomainInputProps) {
  const { t } = useTranslation();
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [validationError, setValidationError] = useState<string>('');

  // Debounce value for API check
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  // Client-side validation
  const clientValidation = (): string | null => {
    if (!value) {
      if (required) return t('tenants.validation.subdomainRequired');
      return null;
    }

    if (value.length < SUBDOMAIN_MIN_LENGTH) {
      return t('tenants.validation.subdomainMinLength');
    }

    if (value.length > SUBDOMAIN_MAX_LENGTH) {
      return t('tenants.validation.subdomainMaxLength');
    }

    if (!SUBDOMAIN_REGEX.test(value)) {
      return t('tenants.validation.subdomainFormat');
    }

    if (value.startsWith('-') || value.endsWith('-')) {
      return t('tenants.validation.subdomainStartEnd');
    }

    if (RESERVED_SUBDOMAINS.includes(value.toLowerCase())) {
      return t('tenants.validation.subdomainReserved');
    }

    return null;
  };

  // Check subdomain availability from API
  const shouldCheckAvailability =
    !clientValidation() && debouncedValue.length >= SUBDOMAIN_MIN_LENGTH;

  const { data: isAvailable, isLoading: isChecking } = useCheckSubdomain(
    debouncedValue,
    shouldCheckAvailability
  );

  // Update validation state
  useEffect(() => {
    const clientError = clientValidation();

    if (clientError) {
      setValidationError(clientError);
      onValidationChange?.(false);
      return;
    }

    if (shouldCheckAvailability && !isChecking) {
      if (isAvailable === false) {
        const error = t('tenants.validation.subdomainTaken');
        setValidationError(error);
        onValidationChange?.(false);
      } else if (isAvailable === true) {
        setValidationError('');
        onValidationChange?.(true);
      }
    } else if (value && value.length >= SUBDOMAIN_MIN_LENGTH) {
      setValidationError('');
      onValidationChange?.(true);
    } else {
      setValidationError('');
      onValidationChange?.(false);
    }
  }, [value, debouncedValue, isAvailable, isChecking, shouldCheckAvailability]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    onChange(newValue);
  };

  const showValidationIcon = value.length >= SUBDOMAIN_MIN_LENGTH;

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {t('tenants.fields.subdomain')}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={t('tenants.fields.subdomainPlaceholder')}
          className={`
            w-full px-3 py-2 pr-10
            border rounded-md
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              validationError
                ? 'border-red-300 dark:border-red-700'
                : showValidationIcon && isAvailable
                  ? 'border-green-300 dark:border-green-700'
                  : 'border-gray-300 dark:border-gray-600'
            }
          `}
        />

        {/* Validation icon */}
        {showValidationIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {isChecking ? (
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
            ) : validationError ? (
              <X className="w-4 h-4 text-red-500" />
            ) : isAvailable ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : null}
          </div>
        )}
      </div>

      {/* Helper text or error */}
      <div className="mt-1 text-xs">
        {validationError ? (
          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
            <AlertCircle className="w-3 h-3" />
            <span>{validationError}</span>
          </div>
        ) : isChecking ? (
          <span className="text-gray-500 dark:text-gray-400">
            {t('tenants.fields.subdomainChecking')}
          </span>
        ) : isAvailable && showValidationIcon ? (
          <span className="text-green-600 dark:text-green-400">
            {t('tenants.fields.subdomainAvailable')}
          </span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            {t('tenants.fields.subdomainHelper').replace(
              '{subdomain}',
              value || t('tenants.fields.subdomainPlaceholder')
            )}
          </span>
        )}
      </div>
    </div>
  );
}
