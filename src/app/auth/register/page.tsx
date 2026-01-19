'use client';

import { useState } from 'react';
import { useRegister } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import Link from 'next/link';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const registerMutation = useRegister();
  const t = useTranslations('auth');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerMutation.mutateAsync({
        email,
        password,
        tenantName,
        companyName,
      });
      // Không cần toast.success ở đây vì sẽ điều hướng đến dashboard
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo, không điều hướng
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl">CRM SaaS</CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {t('createAccount')}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              required
            />
            <Input
              label={t('password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Input
              label={t('tenantName')}
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              placeholder="My Tenant"
              required
            />
            <Input
              label={t('tenantName')}
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Corp"
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? '...' : t('createAccount')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              {t('login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
