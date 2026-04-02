'use client'

import React, { useEffect, useState } from 'react';
import '../styles/LoadingPage.css';
import { defaultTheme } from '../types/theme';

// TypeScript interfaces
interface LoadingPageProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ 
  onLoadingComplete, 
  duration = 800 
}) => {
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
      }, 750); // Fade out duration
    }, duration);

    return () => clearTimeout(timer);
  }, [onLoadingComplete, duration]);

  return (
    <div 
      className={`sarvam-loading ${fadeOut ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: defaultTheme.colors.maroon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.75s ease-in-out',
        opacity: fadeOut ? 0 : 1
      }}
    >
      <div 
        className="loading-content"
        style={{
          textAlign: 'center',
          color: defaultTheme.colors.ivory,
          fontFamily: 'serif',
          animation: 'pulse 2s infinite'
        }}
      >
        <h1 
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: `2px 2px 4px rgba(0,0,0,0.3)`,
            letterSpacing: '0.1em'
          }}
        >
          Rangmanch
        </h1>
        <p 
          style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            fontStyle: 'italic',
            letterSpacing: '0.05em'
          }}
        >
          Rooted in Culture, Built on Code
        </p>
        
        {/* Loading indicator */}
        <div 
          style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center'
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: defaultTheme.colors.ivory,
                animation: `bounce 1.4s infinite ease-in-out both`,
                animationDelay: `${i * 0.16}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .fade-out {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export { LoadingPage };
