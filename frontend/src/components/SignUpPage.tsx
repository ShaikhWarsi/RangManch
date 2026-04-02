'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { defaultTheme } from '../types/theme';

// TypeScript interfaces
interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  role: 'buyer' | 'artisan' | 'ngo';
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  dateOfBirth?: string;
  role?: string;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    role: 'buyer'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
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
      await signup(formData.email, formData.password, {
        name: `${formData.firstName} ${formData.lastName}`,
        role: formData.role,
        dateOfBirth: formData.dateOfBirth
      });
      
      // Redirect based on role
      switch (formData.role) {
        case 'artisan':
          router.push('/artisan/dashboard');
          break;
        case 'ngo':
          router.push('/ngo/dashboard');
          break;
        default:
          router.push('/trade');
      }
    } catch (error: any) {
      setServerError(error.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: defaultTheme.colors.ivory,
      backgroundImage: 'url(/HomePage/loginpage.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(107, 31, 43, 0.8)',
        backdropFilter: 'blur(4px)'
      }} />
      
      <div style={{
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 240, 0.95)',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '450px',
        margin: '20px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{
            fontFamily: 'serif',
            fontSize: '28px',
            color: defaultTheme.colors.maroon,
            marginBottom: '8px'
          }}>
            Create Account
          </h1>
          <p style={{
            color: defaultTheme.colors.walnut,
            fontSize: '14px'
          }}>
            Join the Rangmanch community
          </p>
        </div>

        {serverError && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c53030',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid #fcc'
          }}>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '4px',
                color: defaultTheme.colors.walnut,
                fontWeight: '500',
                fontSize: '12px'
              }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${errors.firstName ? '#c53030' : defaultTheme.colors.sand}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="First name"
              />
              {errors.firstName && (
                <p style={{ color: '#c53030', fontSize: '11px', marginTop: '2px' }}>
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '4px',
                color: defaultTheme.colors.walnut,
                fontWeight: '500',
                fontSize: '12px'
              }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${errors.lastName ? '#c53030' : defaultTheme.colors.sand}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="Last name"
              />
              {errors.lastName && (
                <p style={{ color: '#c53030', fontSize: '11px', marginTop: '2px' }}>
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: defaultTheme.colors.walnut,
              fontWeight: '500',
              fontSize: '12px'
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
                padding: '10px',
                border: `1px solid ${errors.email ? '#c53030' : defaultTheme.colors.sand}`,
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p style={{ color: '#c53030', fontSize: '11px', marginTop: '2px' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: defaultTheme.colors.walnut,
              fontWeight: '500',
              fontSize: '12px'
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
                padding: '10px',
                border: `1px solid ${errors.password ? '#c53030' : defaultTheme.colors.sand}`,
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Create password"
            />
            {errors.password && (
              <p style={{ color: '#c53030', fontSize: '11px', marginTop: '2px' }}>
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: defaultTheme.colors.walnut,
              fontWeight: '500',
              fontSize: '12px'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${errors.confirmPassword ? '#c53030' : defaultTheme.colors.sand}`,
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p style={{ color: '#c53030', fontSize: '11px', marginTop: '2px' }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: defaultTheme.colors.walnut,
              fontWeight: '500',
              fontSize: '12px'
            }}>
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${errors.dateOfBirth ? '#c53030' : defaultTheme.colors.sand}`,
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            {errors.dateOfBirth && (
              <p style={{ color: '#c53030', fontSize: '11px', marginTop: '2px' }}>
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: defaultTheme.colors.walnut,
              fontWeight: '500',
              fontSize: '12px'
            }}>
              Account Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${defaultTheme.colors.sand}`,
                borderRadius: '6px',
                fontSize: '14px',
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
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1,
              marginTop: '8px'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: `1px solid ${defaultTheme.colors.sand}`
        }}>
          <p style={{ color: defaultTheme.colors.walnut, marginBottom: '12px', fontSize: '14px' }}>
            Already have an account?
          </p>
          <button
            onClick={() => router.push('/login')}
            style={{
              backgroundColor: 'transparent',
              color: defaultTheme.colors.maroon,
              border: `1px solid ${defaultTheme.colors.maroon}`,
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
