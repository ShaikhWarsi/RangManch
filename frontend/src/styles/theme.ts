// Centralized Theme System for RangManch
// Ensures consistent color usage across all components

export const defaultTheme = {
  colors: {
    // Primary Colors
    maroon: "#6B1F2B",        // Primary brand color
    walnut: "#8B4513",         // Text color
    ivory: "#FFF8E3",          // Background color
    sand: "#F5E6D3",           // Light background
    
    // Secondary Colors
    teal: "#008080",           // Accent color
    gold: "#FFD700",           // Highlight color
    
    // Semantic Colors
    success: "#10B981",         // Success state
    warning: "#F59E0B",         // Warning state
    error: "#EF4444",           // Error state
    info: "#3B82F6",            // Info state
    
    // Neutral Colors
    white: "#FFFFFF",             // Pure white
    black: "#000000",             // Pure black
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827"
    }
  },
  
  // Opacity values for consistent transparency
  opacity: {
    5: "0.05",
    10: "0.10",
    20: "0.20",
    30: "0.30",
    40: "0.40",
    50: "0.50",
    60: "0.60",
    70: "0.70",
    80: "0.80",
    90: "0.90",
    95: "0.95"
  },
  
  // Spacing scale
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "5rem",
    "5xl": "6rem",
    "6xl": "7rem"
  },
  
  // Typography scale
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem"
  },
  
  // Border radius
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px"
  },
  
  // Shadow scale
  boxShadow: {
    sm: "0 1px 2px 0 rgba(107, 31, 43, 0.05)",
    md: "0 4px 6px -1px rgba(107, 31, 43, 0.1), 0 2px 4px -1px rgba(107, 31, 43, 0.06)",
    lg: "0 10px 15px -3px rgba(107, 31, 43, 0.1), 0 4px 6px -2px rgba(107, 31, 43, 0.05)",
    xl: "0 20px 25px -5px rgba(107, 31, 43, 0.1), 0 10px 10px -5px rgba(107, 31, 43, 0.04)",
    premium: "0 25px 50px -12px rgba(107, 31, 43, 0.25)"
  }
};

// Helper functions for consistent color usage
export const getColorWithOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const theme = defaultTheme;
export default theme;
