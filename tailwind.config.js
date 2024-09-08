/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: '#fff',
          foreground: '#1d1d1d',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // CUSTOM COLORS
        orange: {
          base: '#f24d0d',
          dark: '#c43c08',
        },
        blue: {
          light: '#d7eff9',
          base: '#5ec5fd',
          dark: '#009cf0',
        },
        white: '#ffffff',
        background: '#fbf4f4',
        shape: '#f5eaea',
        gray: {
          100: '#adadad',
          200: '#949494',
          300: '#666666',
          400: '#3d3d3d',
          500: '#1d1d1d',
        },
        danger: '#dc3545',
        success: '#28a745',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontSize: {
        'title-lg': [
          '1.75rem',
          {
            lineHeight: '1.2',
            fontWeight: 'bold',
          },
        ],
        'title-md': [
          '1.5rem',
          {
            lineHeight: '1.2',
            fontWeight: 'bold',
          },
        ],
        'title-sm': [
          '1.125rem',
          {
            lineHeight: '1.2',
            fontWeight: 'bold',
          },
        ],
        subtitle: [
          '1rem',
          {
            lineHeight: '1.2',
            fontWeight: 'semi-bold',
          },
        ],
        'body-md': [
          '1rem',
          {
            lineHeight: '1.2',
            fontWeight: 'regular',
          },
        ],
        'body-sm': [
          '0.875rem',
          {
            lineHeight: '1.2',
            fontWeight: 'regular',
          },
        ],
        'body-xs': [
          '0.75rem',
          {
            lineHeight: '1.2',
            fontWeight: 'regular',
          },
        ],
        'label-md': [
          '0.75rem',
          {
            lineHeight: '1.2',
            fontWeight: 'medium',
          },
        ],
        'label-sm': [
          '0.675rem',
          {
            lineHeight: '1.2',
            fontWeight: 'medium',
          },
        ],
        'action-md': [
          '1rem',
          {
            lineHeight: '1.2',
            fontWeight: 'medium',
          },
        ],
        'action-sm': [
          '0.875rem',
          {
            lineHeight: '1.2',
            fontWeight: 'medium',
          },
        ],
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
