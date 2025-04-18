/** @type {import('tailwindcss').Config} */
export const darkMode = ['class']
export const content = [
  './pages/**/*.{js,jsx}',
  './components/**/*.{js,jsx}',
  './app/**/*.{js,jsx}',
  './src/**/*.{js,jsx}',
  './src/**/*.css',
]
export const prefix = ''

import tailwindcssAnimate from 'tailwindcss-animate'

export const theme = {
  fontFamily: {
    sans: ['Public Sans Variable', 'Geist Sans', 'sans-serif'],
  },
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    colors: {
      border: 'var(--border)',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      baselayer: 'var(--baselayer)',
      background: {
        DEFAULT: 'var(--background)',
        paper: 'var(--background-paper)',
        alternate: 'var(--background-alternate)',
        paperchanel: 'var(--background-paper-channel)',
        neutral: 'var(--background-neutral)',
      },
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      spark: 'var(--spark)',
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'hsl(var(--accent-foreground))',
      },
      disabled: 'var(--disabled)',
      popover: {
        DEFAULT: 'var(--popover)',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'var(--card)',
        strong: 'var(--card-strong)',
      },
      action: {
        hover: 'var(--action-hover)',
        disabled: 'var(--action-disabled)',
      },
      palette: {
        diviver: 'var(--palette-divider)',
        grey: {
          50: 'var(--palette-grey-50)',
          100: 'var(--palette-grey-100)',
          200: 'var(--palette-grey-200)',
          300: 'var(--palette-grey-300)',
          400: 'var(--palette-grey-400)',
          500: 'var(--palette-grey-500)',
          600: 'var(--palette-grey-600)',
          700: 'var(--palette-grey-700)',
          800: 'var(--palette-grey-800)',
          900: 'var(--palette-grey-900)',
        },
        primary: {
          lighter: 'var(--palette-primary-lighter)',
          light: 'var(--palette-primary-light)',
          main: 'var(--palette-primary-main)',
          dark: 'var(--palette-primary-dark)',
          darker: 'var( --palette-primary-darker)',
        },
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    width: {
      // Sidebar size en AligmentPage
      sidebar: '350px',
      contentArea: 'calc(100% - 350px)',
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
    boxShadow: {
      'custom-z1': '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
      'custom-card': 'var(--custom-shadow-card)',
      'custom-dropdown': 'var(--custom-shadow-dropdown)',
      'custom-dialog': 'var(--custom-shadow-dialog)',
    },
  },
}
export const plugins = [tailwindcssAnimate]
