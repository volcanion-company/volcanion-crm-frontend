'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAuthStore } from '@/stores/auth.store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { getInitials } from '@/lib/utils';
import { toast } from '@/lib/toast';
import { authApi } from '@/services/auth.service';
import { Mail, Calendar, Shield, Building2, Edit2, Lock, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const t = useTranslations('profile');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { user, setUser } = useAuthStore();
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      setIsLoadingProfile(true);
      
      const updatedUser = await authApi.updateProfile({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        phone: profileForm.phone,
      });
      
      // Update user in store
      setUser({
        ...user,
        ...updatedUser,
      });
      
      toast.success(t('messages.profileUpdated'));
      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || t('messages.profileUpdateFailed'));
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword.length < 8) {
      toast.error(t('messages.passwordTooShort'));
      return;
    }
    
    try {
      setIsLoadingPassword(true);
      
      await authApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      
      toast.success(t('messages.passwordChanged'));
      setIsPasswordDialogOpen(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
      });
    } catch (error: any) {
      toast.error(error.message || t('messages.passwordChangeFailed'));
    } finally {
      setIsLoadingPassword(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl font-bold shadow-lg">
              {getInitials(user.firstName, user.lastName)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-muted-foreground mt-1">{user.email}</p>
              {user.role && (
                <div className="mt-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Shield className="mr-2 h-4 w-4" />
                  {user.role}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('accountInfo')}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setProfileForm({
                  firstName: user?.firstName || '',
                  lastName: user?.lastName || '',
                  phone: user?.phone || '',
                });
                setIsEditDialogOpen(true);
              }}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {tCommon('edit')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('email')}</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('phone')}</p>
                <p className="font-medium">{user.phone || '-'}</p>
              </div>
            </div>

            {user.tenantName && (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('company')}</p>
                  <p className="font-medium">{user.tenantName}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('createdAt')}</p>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {user.lastLoginAt && (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('lastLoginAt')}</p>
                  <p className="font-medium">
                    {new Date(user.lastLoginAt).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                {t('security.title')}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {t('security.description')}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPasswordDialogOpen(true)}
            >
              {t('security.changePassword')}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Edit Profile Dialog */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('editProfile')}</CardTitle>
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">{t('firstName')}</Label>
                    <Input
                      id="firstName"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t('lastName')}</Label>
                    <Input
                      id="lastName"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>{t('email')}</Label>
                    <Input value={user.email} disabled className="bg-gray-100 dark:bg-gray-800" />
                  </div>
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    {tCommon('cancel')}
                  </Button>
                  <Button type="submit" disabled={isLoadingProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoadingProfile ? tCommon('saving') : tCommon('save')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Change Password Dialog */}
      {isPasswordDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  {t('security.changePassword')}
                </CardTitle>
                <button
                  onClick={() => setIsPasswordDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">{t('security.currentPassword')}</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">{t('security.newPassword')}</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('security.passwordHint')}
                  </p>
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsPasswordDialogOpen(false);
                      setPasswordForm({
                        currentPassword: '',
                        newPassword: '',
                      });
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    {tCommon('cancel')}
                  </Button>
                  <Button type="submit" disabled={isLoadingPassword}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoadingPassword ? tCommon('saving') : t('security.changePassword')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
