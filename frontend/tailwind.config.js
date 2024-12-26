/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './app/**/*.{js,jsx}', './src/**/*.{js,jsx}', './src/**/*.css'],
  prefix: '',
  theme: {
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
          paperChanel: 'var(--background-paper-channel)',
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
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'var(--card)',
          strong: 'var(--card-strong)',
        },
        palette: {
          diviver: 'var(--palette-divider)',
        },
        actionHover: 'var(--action-hover)',
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
      boxShadow: {
        'custom-z1': '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
        'custom-card': 'var(--custom-shadow-card)',
        'custom-dropdown': 'var(--custom-shadow-dropdown)',
        'custom-dialog': 'var(--custom-shadow-dialog)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
