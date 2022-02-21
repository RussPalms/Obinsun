// const defaultTheme = require('tailwindcss/defaultTheme');
const Nth = require('tailwindcss-nth-child');
// const plugin = new Nth("<nth-value>");
// const color2 = new Nth('2')
// const color3 = new Nth('3')
const plugin = new Nth('2');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or false or 'media'
  theme: {
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      // glass: '0 15px 25px rgba(0, 0, 0, 0.05)',
      glass: '0 0.9375em 1.5625em rgba(0, 0, 0, 0.05)',
      'dark-glass': '0 0.9375em 1.5625em rgba(255, 255, 255, 0.1)',
      glass1: '0 15px 35px rgba(0, 0, 0,0.05)',
      glass1a: '0 5px 10px rgba(0, 0, 0, 0.1)',
      glass2: '0 15px 30px rgba(0, 0, 0, 0.1)',
      glass3: '0 25px 45px rgba(0, 0, 0, 0.1)',
      glass3a: '0 5px 15px rgba(0, 0, 0, 0.05)',
      size: '0 2px 10px rgba(0, 0, 0, 0.1)',
      button: '0 15px 35px rgba(0, 0, 0, 0.1)',

      imageCapture: '1px -7px 7px -6px rgba(0, 0, 0, 0.44)',
    },
    typography: (theme) => ({
      dark: {
        css: {
          // color: theme('colors.gray.300'),
          // h1: {
          //   color: theme('colors.gray.100'),
          // },
          // h2: {
          //   color: theme('colors.gray.100'),
          // },
          // strong: {
          //   color: theme('colors.gray.300'),
          // },

          color: theme('colors.blue.500'),
          h1: {
            color: theme('colors.blue.300'),
          },
          h2: {
            color: theme('colors.blue.300'),
          },
          strong: {
            color: theme('colors.blue.500'),
          },
        },
      },
    }),
    screens: {
      // "3xl": { max: "140em" },
      // // "3xl": { max: "156.25em" }, // 22.708333
      // // "2xl": { max: "1535px" },
      // // "2xl": { max: "137.5em" },
      // "2xl": { max: "120em" },
      // // "2xl": { max: "134.58333em" },
      // // => @media (max-width: 1535px) { ... }

      // // xl: { max: "1279px" },
      // // xl: { max: "75em" },
      // // xl: { max: "111.666666em" },
      // xl: { max: "100em" },
      // // => @media (max-width: 1279px) { ... }

      // // lg: { max: "1023px" },
      // // lg: { max: "88.750000em" },
      // lg: { max: "80em" },
      // // => @media (max-width: 1023px) { ... }

      // // md: { max: "767px" },
      // // md: { max: "65.833333em" },
      // md: { max: "60em" },
      // // => @media (max-width: 767px) { ... }

      // // sm: { max: "639px" },
      // // sm: { max: "42.916666em" },
      // sm: { max: "40em" },
      // // => @media (max-width: 639px) { ... }42.916666
      // // xs: { max: "320px" },
      // xs: { max: "20em" },

      '0vs': { min: '0em' },
      xs: { min: '20em' },
      sm: { min: '40em' },
      md: { min: '60em' },
      lg: { min: '80em' },
      xl: { min: '100em' },
      '2xl': { min: '120em' },
      '3xl': { min: '140em' },
      '4vl': { min: '160em' },
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
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-25': '0% 100%',
        'pos-75': '100% 0%',
        'pos-100': '100% 100%',
      },
      // fontFamily: { grandstander: ["Grandstander", "cursive"] },
      fontFamily: {
        grandstander: [
          'Grandstander',
          // ,
          // ...defaultTheme.fontFamily.grandstander,
        ],
      },
      keyframes: {
        initial_page_load: {
          '0%': {
            transform: 'translateX(0)',
          },
          // '20%': {
          //   transform: 'translateX(-10%)',
          // },
          // '30%': {
          //   transform: 'translateX(-30%)',
          // },
          '50%': {
            transform: 'translateX(-65%)',
          },

          // '70%': {
          //   transform: 'translateX(30%)',
          // },
          // '80%': {
          //   transform: 'translateX(10%)',
          // },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        move: {
          '0%, 100%': {
            transform: 'translateY(50px)',
          },
          '50%': {
            transform: 'translateY(100px)',
          },
        },
        move1: {
          '0%, 100%': {
            transform: 'translateY(-20px)',
          },
          '50%': {
            transform: 'translateY(20px)',
          },
        },
        squaremove: {
          '0%, 100%': {
            transform: 'translateY(-40px)',
          },
          '50%': {
            transform: 'translateY(40px)',
          },
        },
        breath_1: {
          '0%, 100%': {
            transform: 'translateY(1rem)',
          },
          '50%': {
            transform: 'translateY(2rem)',
          },
        },
        breath_2: {
          '0%, 100%': {
            transform: 'translateY(-4rem)',
          },
          '50%': {
            transform: 'translateX(-2rem)',
          },
        },
        breath_3: {
          '0%, 100%': {
            transform: 'translateY(-1rem)',
          },
          '50%': {
            transform: 'translateX(-1rem)',
          },
        },
        breath_4: {
          '0%, 100%': {
            transform: 'rotateZ(0deg)',
          },
          '50%': {
            transform: 'rotateZ(10deg)',
          },
          // "0%": {
          //   transform: "rotateZ(0deg)",
          // },
          // "10%": {
          //   transform: "rotateZ(5deg)",
          // },
          // "20%": {
          //   transform: "rotateZ(10deg)",
          // },
          // "30%": {
          //   transform: "rotateZ(15deg)",
          // },
          // "40%": {
          //   transform: "rotateZ(20deg)",
          // },
          // "50%": {
          //   transform: "rotateZ(25deg)",
          // },
          // "55%": {
          //   transform: "rotateZ(30deg)",
          // },
          // "60%": {
          //   transform: "rotateZ(25deg)",
          // },
          // "70%": {
          //   transform: "rotateZ(20deg)",
          // },
          // "80%": {
          //   transform: "rotateZ(15deg)",
          // },
          // "90%": {
          //   transform: "rotateZ(5deg)",
          // },
          // "100%": {
          //   transform: "rotateZ(0deg)",
          // },
        },
        breath_5: {
          '0%, 100%': {
            transform: 'translateY(-1rem)',
          },
          '50%': {
            transform: 'translateX(-1rem)',
          },
        },
        breath_6: {
          '0%, 100%': {
            transform: 'translateY(-2rem)',
          },
          '50%': {
            transform: 'translateY(-1rem)',
          },
        },
      },
      animation: {
        'initial-page-load': 'initial_page_load 300ms ease-in-out infinite',
        move: 'move 5s linear infinite',
        move1: 'move1 5s linear infinite',
        squaremove: 'squaremove 10s linear infinite',
        breath1: 'breath_1 7s ease-out infinite',
        breath2: 'breath_2 7s ease-out infinite',
        breath3: 'breath_3 7s ease-out infinite',
        breath4: 'breath_4 7s ease-out infinite',
        breath5: 'breath_5 7s ease-out infinite',
        breath6: 'breath_6 7s ease-out infinite',
      },
      gridTemplateRows: {
        8: 'repeat(8, minmax(0,1fr)',
        // 'layout': 200px minmax(900px, 1fr) 100px'
        layout: '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['active', 'hover'],
      transform: ['hover'],
      rotate: ['hover'],
      scale: ['hover'],
      translate: ['hover'],
      background: ['hover', 'active', 'nth-child'],
      top: ['nth-child'],
      bottom: ['nth-child'],
      left: ['nth-child'],
      right: ['nth-child'],
      width: ['nth-child'],
      height: ['nth-child'],
      backgroundColor: ['checked', 'nth-child'],
      strokeWidth: ['nth-child', 'first'],
      strokeColor: ['nth-child', 'first'],
      fillColor: ['nth-child', 'first'],
      fill: ['nth-child', 'first'],
      typography: ['dark'],
    },
  },
  plugins: [plugin.nthChild(), require('@tailwindcss/typography')],
};
