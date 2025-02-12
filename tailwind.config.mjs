/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        'xspace-green': {DEFAULT: "#05F292"},
        'xspace-border': {DEFAULT: "#65646450"},
        'xspace-dark': {DEFAULT: "#074D35"},
      },
    },
  },
  plugins: [],
};
