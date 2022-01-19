const defaultTheme = require("tailwindcss/defaultTheme");
const Nth = require("tailwindcss-nth-child");
// const plugin = new Nth("<nth-value>");
// const color2 = new Nth('2')
// const color3 = new Nth('3')
const plugin = new Nth("2");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or false or 'class'
  theme: {
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
      glass: "0 15px 25px rgba(0, 0, 0, 0.05)",
      glass1: "0 15px 35px rgba(0, 0, 0,0.05)",
      glass1a: "0 5px 10px rgba(0, 0, 0, 0.1)",
      glass2: "0 15px 30px rgba(0, 0, 0, 0.1)",
      glass3: "0 25px 45px rgba(0, 0, 0, 0.1)",
      glass3a: "0 5px 15px rgba(0, 0, 0, 0.05)",
      size: "0 2px 10px rgba(0, 0, 0, 0.1)",
      button: "0 15px 35px rgba(0, 0, 0, 0.1)",
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "320px" },
    },
    // screens: { xs: "320px", ...defaultTheme.screens },
    // fontSize: {
    // 	xs: ".75rem",
    // 	sm: ".875rem",
    // 	tiny: ".875rem",
    // 	base: "1rem",
    // 	lg: "1.125rem",
    // 	xl: "1.25rem",
    // 	"2xl": "1.5rem",
    // 	"3xl": "1.875rem",
    // 	"4xl": "2.25rem",
    // 	"5xl": "3rem",
    // 	"6xl": "4rem",
    // 	"7xl": "5rem",
    // 	logo: [
    // 		"10rem",
    // 		{
    // 			lineHeight: 1,
    // 		},
    // 	],
    // },

    extend: {
      // fontFamily: { grandstander: ["Grandstander", "cursive"] },
      fontFamily: {
        grandstander: [
          "Grandstander",
          // ,
          // ...defaultTheme.fontFamily.grandstander,
        ],
      },
      keyframes: {
        move: {
          "0%, 100%": {
            transform: "translateY(50px)",
          },
          "50%": {
            transform: "translateY(100px)",
          },
        },
        move1: {
          "0%, 100%": {
            transform: "translateY(-20px)",
          },
          "50%": {
            transform: "translateY(20px)",
          },
        },
        squaremove: {
          "0%, 100%": {
            transform: "translateY(-40px)",
          },
          "50%": {
            transform: "translateY(40px)",
          },
        },
      },
      animation: {
        move: "move 5s linear infinite",
        move1: "move1 5s linear infinite",
        squaremove: "squaremove 10s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["active", "hover"],
      transform: ["hover"],
      rotate: ["hover"],
      scale: ["hover"],
      translate: ["hover"],
      background: ["hover", "active", "nth-child"],
      top: ["nth-child"],
      bottom: ["nth-child"],
      left: ["nth-child"],
      right: ["nth-child"],
      width: ["nth-child"],
      height: ["nth-child"],
      backgroundColor: ["checked"],
    },
  },
  plugins: [plugin.nthChild(), require("@tailwindcss/typography")],
};
