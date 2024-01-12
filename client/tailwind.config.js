/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "Sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        Oswald: ["Oswald", "sans-serif"],
        Handlee: ["Handlee", "cursive"],
        Nothing: ["Nothing You Could Do", "cursive"],
      },
      backgroundImage: {
        paymentBG: "url('./assets/ten_payment.svg')",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),

    require("tailwind-scrollbar-hide"),
    require("flowbite/plugin"),
    require("daisyui"),
  ],
};
