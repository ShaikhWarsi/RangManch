import React, { useState, useRef, useEffect } from 'react';

// Lazy loading utility for images
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
}> = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  placeholder = '/placeholder.jpg'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-sand/20 animate-pulse rounded-lg"
          style={{ width, height }}
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          style={{ width, height }}
        />
      )}
    </div>
  );
};

// Simple lazy loading component for Next.js
export const LazyImg: React.FC<{
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}> = ({ src, alt, className, width, height }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
};
