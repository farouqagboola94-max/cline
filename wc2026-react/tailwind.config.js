/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#030303',
          900: '#080808',
          800: '#0d0d0d',
          700: '#111111',
          600: '#161616',
          500: '#1e1e1e',
          400: '#262626',
          300: '#303030',
        },
        neon: {
          blue: '#00b4ff',
          green: '#39ff14',
          orange: '#ff6b00',
          red: '#ff2d55',
          yellow: '#ffd700',
          pink: '#ff2d78',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'slide-in': 'slideIn 0.35s ease-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        ticker: 'ticker 35s linear infinite',
      },
      keyframes: {
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,180,255,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0,180,255,0.8), 0 0 60px rgba(0,180,255,0.3)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
