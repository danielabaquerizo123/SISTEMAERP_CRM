/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDECEC',
          100: '#FBD5D5',
          200: '#F8ABAB',
          300: '#F47373',
          400: '#EE4444',
          500: '#D71920',
          600: '#B51218',
          700: '#981016',
          800: '#7E0E13',
          900: '#6B0C11',
        },
        surface: {
          DEFAULT: '#F7F8FA',
          card: '#FFFFFF',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
        border: {
          DEFAULT: '#E5E7EB',
        },
        success: { DEFAULT: '#059669', light: '#D1FAE5', lighter: '#ECFDF5' },
        warning: { DEFAULT: '#D97706', light: '#FEF3C7', lighter: '#FFFBEB' },
        info: { DEFAULT: '#2563EB', light: '#DBEAFE', lighter: '#EFF6FF' },
        error: { DEFAULT: '#DC2626', light: '#FEE2E2', lighter: '#FEF2F2' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
