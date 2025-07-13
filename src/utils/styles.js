// 樣式工具函數

// 主題顏色配置
export const themes = {
  blue: {
    primary: '#2563eb',
    secondary: '#1d4ed8',
    accent: '#3b82f6'
  },
  green: {
    primary: '#16a34a',
    secondary: '#15803d',
    accent: '#22c55e'
  },
  purple: {
    primary: '#9333ea',
    secondary: '#7c3aed',
    accent: '#a855f7'
  }
};

// 間距系統
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem'
};

// 字體大小系統
export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem'
};

// 陰影系統
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
};

// 圓角系統
export const borderRadius = {
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px'
};

// 動畫持續時間
export const transitions = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms'
};

// 響應式斷點
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// 工具函數
export const getThemeColor = (theme, color) => {
  return themes[theme]?.[color] || themes.blue[color];
};

export const getResponsiveClass = (baseClass, breakpoint, variant) => {
  return `${baseClass} ${breakpoint}:${variant}`;
};

export const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(' ');
}; 