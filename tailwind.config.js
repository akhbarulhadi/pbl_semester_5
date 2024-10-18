/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/daisyui/dist/**/*.js",
    ...flowbite.content(), // Menambahkan konten dari flowbite-react
  ],
  theme: {
    extend: {
      flexShrink: {
        2: '2'
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "custom-yellow": "#facc15",
        "custom-gray": "#9E9C9C",
        "custom-cyan": "#00FFFF",
        "custom-indigo": "#4B0082",
      },
      fontSize: {
        xs: "12px", // Custom size example, smaller than 'sm'
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "64px",
      },
    },
  },
  plugins: [
    flowbite.plugin(), // Menambahkan plugin dari flowbite-react
    require("flowbite/plugin"),
    require("daisyui"),
  ],
});
