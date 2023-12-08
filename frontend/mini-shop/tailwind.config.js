/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./mini-shop/apps/admin/src/**/*.{html,ts}",
    "./mini-shop/apps/mini-shop/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')({
      forms: false,
  })],
  corePlugins: {
    forms: false,
  },
}

