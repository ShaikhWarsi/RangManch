import React from "react";
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { defaultTheme } from '../types/theme';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
}

export const Footer: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Rachit Tiwari",
      role: "Team Lead"
    },
    {
      id: "2", 
      name: "Shaikh Mohammad Warsi",
      role: "Full Stack Developer"
    }
  ];

  const categories = [
    "Textiles & Fabrics",
    "Handicrafts", 
    "Jewelry",
    "Home Decor",
    "Spices & Food",
    "Musical Instruments",
    "Art & Paintings",
    "Traditional Clothing"
  ];

  return (
    <footer 
      id="my-footer"
      style={{
        backgroundColor: defaultTheme.colors.maroon,
        color: defaultTheme.colors.ivory,
        padding: '60px 20px 30px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          
          {/* About Section */}
          <div>
            <h3 style={{
              fontFamily: 'Playfair Display',
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: defaultTheme.colors.ivory
            }}>
              Rangmanch
            </h3>
            <p style={{
              fontFamily: 'Inter',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              marginBottom: '20px',
              opacity: 0.9
            }}>
              Connecting India's master artisans with the world. 
              Every piece tells a story of tradition, craftsmanship, 
              and cultural heritage.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a 
                href="https://instagram.com/rangmanch" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  color: defaultTheme.colors.ivory,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = defaultTheme.colors.gold;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = defaultTheme.colors.ivory;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ExternalLink size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  color: defaultTheme.colors.ivory,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = defaultTheme.colors.gold;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = defaultTheme.colors.ivory;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h4 style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: defaultTheme.colors.ivory
            }}>
              Our Categories
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px'
            }}>
              {categories.map((category, index) => (
                <li key={index}>
                  <a 
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      color: defaultTheme.colors.ivory,
                      textDecoration: 'none',
                      fontFamily: 'Inter',
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      transition: 'all 0.3s ease',
                      display: 'block',
                      padding: '4px 0'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.color = defaultTheme.colors.gold;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.color = defaultTheme.colors.ivory;
                    }}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: defaultTheme.colors.ivory
            }}>
              Get in Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={18} style={{ color: defaultTheme.colors.gold }} />
                <span style={{ fontFamily: 'Inter', fontSize: '0.9rem' }}>
                  contact@teamacdc.demo
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={18} style={{ color: defaultTheme.colors.gold }} />
                <span style={{ fontFamily: 'Inter', fontSize: '0.9rem' }}>
                  +91 98765 43210
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} style={{ color: defaultTheme.colors.gold }} />
                <span style={{ fontFamily: 'Inter', fontSize: '0.9rem' }}>
                  Delhi, India
                </span>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div>
            <h4 style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '20px',
              color: defaultTheme.colors.ivory
            }}>
              Trusted by Thousands
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                fontFamily: 'Inter',
                fontSize: '0.9rem',
                opacity: 0.9,
                marginBottom: '8px'
              }}>
                🏆 Award-Winning Platform
              </div>
              <div style={{
                fontFamily: 'Inter',
                fontSize: '0.9rem',
                opacity: 0.9,
                marginBottom: '8px'
              }}>
                ⭐ 15,000+ Happy Customers
              </div>
              <div style={{
                fontFamily: 'Inter',
                fontSize: '0.9rem',
                opacity: 0.9
              }}>
                🎨 500+ Artisan Partners
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: `1px solid rgba(255,255,255,0.1)`,
          paddingTop: '30px',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: 'Inter',
            fontSize: '0.85rem',
            opacity: 0.7,
            margin: 0
          }}>
            2024 Rangmanch. All rights reserved. | Built by Team AC-DC | 
            <a 
              href="/privacy" 
              style={{
                color: defaultTheme.colors.ivory,
                textDecoration: 'none',
                margin: '0 8px'
              }}
            >
              Privacy Policy
            </a>
            |
            <a 
              href="/terms" 
              style={{
                color: defaultTheme.colors.ivory,
                textDecoration: 'none',
                margin: '0 8px'
              }}
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
