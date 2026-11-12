/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Dynamic gradient utilities used via variables
    // KPI card icon backgrounds
    'from-blue-100', 'to-blue-50',
    'from-emerald-100', 'to-emerald-50',
    'from-red-100', 'to-red-50',
    'from-purple-100', 'to-purple-50',
    // KPI card icon foreground gradients (text gradient attempt)
    'from-blue-600', 'to-blue-500',
    'from-emerald-600', 'to-emerald-500',
    'from-red-600', 'to-red-500',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Design tokens: brand = emerald scale, accent = amber
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        accent: { DEFAULT: '#f59e0b', soft: '#fef3c7' },
        surface: { DEFAULT: '#ffffff', muted: '#f8fafc' },
      },
      fontFamily: {
        sans: ['var(--font-prompt)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)',
        'card-hover': '0 4px 12px rgba(5, 150, 105, 0.10), 0 2px 4px rgba(16, 24, 40, 0.06)',
      },
    },
  },
  plugins: [],
};
