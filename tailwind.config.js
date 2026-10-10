/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: { 950: '#07051a', 900: '#0d0a2b', 800: '#150f3d', 700: '#201757' },
        gold: { 300: '#f3dc9a', 400: '#e8c46a', 500: '#d4a84a', 600: '#b88a2e' },
        mystic: { 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' },
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        twinkle: { '0%,100%': { opacity: 0.2 }, '50%': { opacity: 1 } },
        shimmer: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: 0.6 }, '100%': { transform: 'scale(1.8)', opacity: 0 } },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        marquee: 'marquee 35s linear infinite',
        pulseRing: 'pulseRing 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
