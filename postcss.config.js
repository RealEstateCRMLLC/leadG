// PostCSS for Tailwind v3 (see tailwind.config.js). Without this file Next
// assumes Tailwind v4 and requires @tailwindcss/postcss, which is not a
// dependency of this app.
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
