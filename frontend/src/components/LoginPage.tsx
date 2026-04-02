'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { defaultTheme } from '../types/theme';

interface LoginFormData {
  email: string;
  password: string;
  role: 'buyer' | 'artisan' | 'ngo';
}

interface FormErrors {
  email?: string;
  password?: string;
  role?: string;
}

const DEMO_ACCOUNTS = [
  { role: 'Buyer', email: 'demo.buyer@rangmanch.in', password: 'demo123456', color: '#8B5CF6' },
  { role: 'Artisan', email: 'demo.artisan@rangmanch.in', password: 'demo123456', color: '#D97706' },
  { role: 'NGO', email: 'demo.ngo@rangmanch.in', password: 'demo123456', color: '#059669' }
];

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    role: 'buyer'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      await login(formData.email, formData.password);
      router.push('/trade');
    } catch (error: any) {
      setServerError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setServerError('');

    try {
      await login(email, password);
      router.push('/trade');
    } catch (error: any) {
      setServerError(error.message || 'Demo login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: defaultTheme.colors.ivory }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon border-t-transparent mx-auto"></div>
          <p className="mt-4" style={{ color: defaultTheme.colors.walnut }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory relative">
      <div className="absolute inset-0 bg-gradient-to-br from-maroon/20 via-purple/10 to-teal/5" />
      <div className="absolute inset-0 bg-sand/5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(107, 31, 43, 0.03) 35px, rgba(107, 31, 43, 0.03) 70px)`
      }} />

      <div className="relative bg-white/95 backdrop-blur-sm p-12 rounded-2xl shadow-premium w-full max-w-md mx-5 border border-sand/20">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-maroon mb-2">
            Welcome Back
          </h1>
          <p className="text-walnut text-base">
            Sign in to your Rangmanch account
          </p>
        </div>

        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px'
        }}>
          <p style={{ color: '#92400e', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>
            Demo Accounts - Quick Login
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.role}
                onClick={() => handleDemoLogin(account.email, account.password)}
                disabled={loading}
                style={{
                  backgroundColor: account.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  transition: 'all 0.2s'
                }}
              >
                {account.role}
              </button>
            ))}
          </div>
          <p style={{ color: '#b45309', fontSize: '11px', marginTop: '8px' }}>
            Password for all demo accounts: demo123456
          </p>
        </div>

        {serverError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-5 text-sm border border-red-200">
            {serverError}
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: defaultTheme.colors.sand }} />
          <span style={{ padding: '0 12px', color: defaultTheme.colors.walnut, fontSize: '12px' }}>or sign in with email</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: defaultTheme.colors.sand }} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: defaultTheme.colors.walnut,
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.email ? '#c53030' : defaultTheme.colors.sand}`,
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p style={{ color: '#c53030', fontSize: '12px', marginTop: '4px' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: defaultTheme.colors.walnut,
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.password ? '#c53030' : defaultTheme.colors.sand}`,
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p style={{ color: '#c53030', fontSize: '12px', marginTop: '4px' }}>
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: defaultTheme.colors.walnut,
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Account Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${defaultTheme.colors.sand}`,
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="buyer">Buyer</option>
              <option value="artisan">Artisan</option>
              <option value="ngo">NGO</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? defaultTheme.colors.sand : defaultTheme.colors.maroon,
              color: defaultTheme.colors.ivory,
              padding: '14px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: `1px solid ${defaultTheme.colors.sand}`
        }}>
          <p style={{ color: defaultTheme.colors.walnut, marginBottom: '12px' }}>
            Don't have an account?
          </p>
          <button
            onClick={() => router.push('/signup')}
            style={{
              backgroundColor: 'transparent',
              color: defaultTheme.colors.maroon,
              border: `1px solid ${defaultTheme.colors.maroon}`,
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
