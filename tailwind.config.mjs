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
      },
    },
  },
  plugins: [],
};
