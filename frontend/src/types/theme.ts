// Theme system with TypeScript interfaces for consistent styling

export interface ThemeColors {
  maroon: string;
  walnut: string;
  gold: string;
  ivory: string;
  sand: string;
  teal: string;
  purple: string;
}

export interface Theme {
  colors: ThemeColors;
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    premium: string;
    premiumHover: string;
  };
  fonts: {
    heading: string[];
    devanagari: string[];
    body: string[];
    ui: string[];
  };
}

export const defaultTheme: Theme = {
  colors: {
    maroon: '#6B1F2B',
    walnut: '#3E2F26',
    gold: '#C6A75E',
    ivory: '#F5EFE6',
    sand: '#D8CFC4',
    teal: '#2D4B4B',
    purple: '#4A2C40',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '50%',
  },
  shadows: {
    premium: '0 10px 30px rgba(107, 31, 43, 0.2)',
    premiumHover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  fonts: {
    heading: ['"Kelly Slab"', 'serif'],
    devanagari: ['"Noto Sans Devanagari"', 'serif'],
    body: ['Inter', 'sans-serif'],
    ui: ['"Instrument Sans"', 'sans-serif'],
  },
};

// Common component props interfaces
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface ResponsiveProps {
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
}

// Utility functions for theme
export const getThemeColor = (colorName: keyof ThemeColors): string => {
  return defaultTheme.colors[colorName];
};

export const getResponsiveValue = <T>(values: Partial<Record<keyof ResponsiveProps, T>>, fallback: T, isMobile?: boolean, isTablet?: boolean): T => {
  if (isMobile && values.isMobile !== undefined) return values.isMobile;
  if (isTablet && values.isTablet !== undefined) return values.isTablet;
  if (values.isDesktop !== undefined) return values.isDesktop;
  return fallback;
};
