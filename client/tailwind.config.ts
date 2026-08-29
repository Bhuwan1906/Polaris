import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        polar: {
          50: '#E8F4FD',
          100: '#D1E9FB',
          200: '#A3D3F7',
          300: '#75BEF3',
          400: '#4FC3F7',
          500: '#29B6F6',
          600: '#1E88E5',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#0A1628',
          950: '#060E1A',
        },
        ice: {
          50: '#F0F8FF',
          100: '#E0F0FE',
          200: '#BAE0FD',
          300: '#7CC8FB',
          400: '#36ADF6',
          500: '#0C93E7',
          600: '#0074C5',
          700: '#005BA0',
          800: '#024D84',
          900: '#08406E',
        },
        aurora: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#00E5A0',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'polar-gradient': 'linear-gradient(135deg, #0A1628 0%, #1A365D 50%, #0D2137 100%)',
        'aurora-gradient': 'linear-gradient(90deg, #4FC3F7, #00E5A0)',
        'hero-gradient': 'linear-gradient(180deg, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.7) 50%, rgba(10,22,40,0.95) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
