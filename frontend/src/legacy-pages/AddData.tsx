'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import IndianNavbarFixed from '../components/IndianNavbarFixed';
import { Footer } from '../components/Footer';
import { defaultTheme } from '../types/theme';

// TypeScript interfaces
interface FormData {
  name: string;
  email: string;
  phone: string;
  craft: string;
  description: string;
  location: string;
  experience: string;
  images: string[];
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  craft?: string;
  description?: string;
  location?: string;
  experience?: string;
}

const AddData: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    craft: '',
    description: '',
    location: '',
    experience: '',
    images: []
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.craft) {
      newErrors.craft = 'Craft type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          craft: '',
          description: '',
          location: '',
          experience: '',
          images: []
        });
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: defaultTheme.colors.ivory }}>
      <IndianNavbarFixed />
      
      <div style={{ 
        paddingTop: '120px', 
        paddingBottom: '80px',
        paddingLeft: '20px',
        paddingRight: '20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          padding: '40px',
          border: `1px solid ${defaultTheme.colors.sand}`
        }}>
          <h1 style={{
            fontFamily: 'serif',
            fontSize: '2.5rem',
            color: defaultTheme.colors.maroon,
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            Join Our Artisan Community
          </h1>
          
          <p style={{
            textAlign: 'center',
            color: defaultTheme.colors.walnut,
            marginBottom: '40px',
            fontSize: '1.1rem',
            lineHeight: '1.6'
          }}>
            Share your craft with the world and connect with customers who appreciate traditional artistry
          </p>

          {success && (
            <div style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              textAlign: 'center',
              border: '1px solid #c3e6cb'
            }}>
              <strong>Success!</strong> Your application has been submitted. We'll review it and get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: defaultTheme.colors.walnut,
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.name ? '#dc3545' : defaultTheme.colors.sand}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: defaultTheme.colors.walnut,
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.email ? '#dc3545' : defaultTheme.colors.sand}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: defaultTheme.colors.walnut,
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.phone ? '#dc3545' : defaultTheme.colors.sand}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="9876543210"
                />
                {errors.phone && (
                  <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: defaultTheme.colors.walnut,
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Craft Type *
                </label>
                <select
                  name="craft"
                  value={formData.craft}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.craft ? '#dc3545' : defaultTheme.colors.sand}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select your craft</option>
                  <option value="pottery">Pottery</option>
                  <option value="textiles">Textiles</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="woodwork">Woodwork</option>
                  <option value="metalwork">Metalwork</option>
                  <option value="painting">Painting</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="other">Other</option>
                </select>
                {errors.craft && (
                  <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                    {errors.craft}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: defaultTheme.colors.walnut,
                fontWeight: '600',
                fontSize: '14px'
              }}>
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.location ? '#dc3545' : defaultTheme.colors.sand}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="City, State"
              />
              {errors.location && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.location}
                </p>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: defaultTheme.colors.walnut,
                fontWeight: '600',
                fontSize: '14px'
              }}>
                Experience Level *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.experience ? '#dc3545' : defaultTheme.colors.sand}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="experienced">Experienced (5-10 years)</option>
                <option value="master">Master (10+ years)</option>
              </select>
              {errors.experience && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.experience}
                </p>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: defaultTheme.colors.walnut,
                fontWeight: '600',
                fontSize: '14px'
              }}>
                Craft Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.description ? '#dc3545' : defaultTheme.colors.sand}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                placeholder="Describe your craft, techniques, materials used, and what makes your work unique..."
              />
              {errors.description && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.description}
                </p>
              )}
              <p style={{
                color: defaultTheme.colors.walnut,
                fontSize: '12px',
                marginTop: '4px',
                opacity: 0.7
              }}>
                Minimum 50 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? defaultTheme.colors.sand : defaultTheme.colors.maroon,
                color: defaultTheme.colors.ivory,
                padding: '16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddData;
