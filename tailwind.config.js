/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',        // Extra small devices (mobile)
        'sm': '640px',        // Small devices (tablets)
        'md': '1024px',       // Large devices (laptops/desktops)
        'lg': '1280px',       // Extra large devices (desktops)
        'xl': '1536px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        kuduOrange: "rgba(255, 111, 34, 1)",
        kuduOrangeFade: "rgba(255, 111, 34, 0.7)",
        kuduGray: "rgba(141, 141, 141, 1)",
        kuduLightBlue: "rgba(241, 241, 242, 1)",
        kuduOrange500: "rgba(255, 133, 86, 1)",
        kuduPeach: "rgba(254, 222, 199, 1)",
        kuduGrayPeach: "rgba(239, 239, 239, 1)",
        kuduDarkBlue: "rgba(25, 45, 76, 1)",
        kuduSkyBlue: "rgba(198, 229, 250, 1)",
        kuduGreen: "rgba(52, 168, 83, 1)",
        kuduRed: "rgba(255, 15, 0, 1)",
        kuduDarkGrey: "rgba(57, 57, 57, 1)",
        kuduLightGray: "rgba(246, 247, 251, 1)",
        kuduTableGrey: "rgba(246, 247, 251, 1)",
        kuduRomanSilver: "rgba(114, 112, 112, 1)",
        kuduDarkFade: "rgba(210, 210, 210, 1)",
        kuduPink: "rgba(255, 184, 211, 1)",
        kuduStrayBlue: "rgba(165, 179, 255, 1)",
        kuduOrangeLight: "rgba(255, 222, 193, 1)",
        kuduPurple: "rgba(233, 198, 255, 1)",
        kuduLightGreen: "rgba(193, 255, 165, 1)",
        kuduBlue: "rgba(18, 84, 255, 1)",
        kuduMade: "#F6F7FB",
        
      },
      backgroundImage: {
        'custom-bg': "url('/images/signInBg.png')",
        'signUp-bg': "url('/images/signUpBg.png')",
        'senseBanner': "url('https://res.cloudinary.com/do2kojulq/image/upload/v1735564234/kudu_mart/Frame_1618873123_cleanup_e75ord.png')"
      },
    },
  },
  plugins: [],
});
