/** @type {import('tailwindcss').Config} */
// Tailwind v3 config (globals.css uses @tailwind directives). This file was
// missing, so fresh `next build` runs fell back to Next's Tailwind v4
// @tailwindcss/postcss path and failed with "Cannot find module
// '@tailwindcss/postcss'". Local runs only worked from the prebuilt
// .next/standalone bundle.
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {} },
  plugins: [],
};
