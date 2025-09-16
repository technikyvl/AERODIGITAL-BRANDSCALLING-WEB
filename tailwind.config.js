/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E6CFF',
        accent: '#00B8F0',
        background: '#0A0D12',
        elevated: '#10141C',
        surface: '#141A24',
        text: '#FFFFFF',
        muted: '#8C97A8',
      },
      fontFamily: {
        rubik: ['var(--font-rubic)', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pulse': 'pulse 2s infinite',
        'neon-glow': 'neon-glow 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.7',
          },
        },
        'neon-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(46, 108, 255, 0.6)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(46, 108, 255, 1)',
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
