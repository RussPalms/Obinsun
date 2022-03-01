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
      'social-glass': '0 5px 45px rgba(0, 0, 0, 0.1)',
      'dark-glass': '0 0.9375em 1.5625em rgba(255, 255, 255, 0.1)',
      menu: '0 -0.5em 0 #111827',
      'active-menu': '0 0 0 #111827',
      'dark-menu': '0 -0.5em 0 #4C8EFF',
      'active-dark-menu': '0 0 0 #4C8EFF',
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

      vs: { min: '20em' }, //  Smallest  @ 320px * 787px
      xs: { min: '23.4375em' }, //  iPhone SE @ 375px * 667px
      '0xs': { min: '24.375em' }, //  iPhone 12 Pro @ 390px * 884px
      '1xs': { min: '24.5625em' }, //  Pixel 5 @ 393px * 851px
      '2xs': { min: '25.875em' }, //  iPhone XR @ 414px * 896px
      'mobile-l': { min: '26.5625em' }, //  MobileL @425px * 787px
      sm: { min: '40em' },
      tablet: { min: '48em' }, //  Tablet / iPadMini
      'tablet-l': { min: '51.25em' }, //  Tablet L / iPadAir
      md: { min: '60em' },
      laptop: { min: '64em' }, //  Laptop
      lg: { min: '80em' },
      'laptop-l': { min: '90em' }, //  Laptop L
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
        // 'social_glass'{
        //   '0.5s' : top,
        //   '0s': z-index,
        //   '0.5s': transform
        // },
        // social_glass0: {
        //   transition: 'top 0.5s, z-index 0s, transform 0.5s',
        //   'transition-delay': 'transition-delay: 0.5s, 0.5s, 0s',
        // },
        // social_glass1: {
        //   transition: 'top 0.5s, z-index 0s, transform 0.5s',
        //   'transition-delay': 'transition-delay: 0.5s, 0.5s, 0s',
        // },
        // },
        social_glass: {
          '0% 100%': { transform: 'skewX(45deg)' },
          '50%': { transform: 'translateX(9.375em)' },
        },
        social_glass0: {
          '0% 100%': { transform: 'skewX(45deg)' },
          '50%': { transform: 'translateX(-9.375em)' },
        },
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
        },
        breath_6: {
          '0%, 100%': {
            transform: 'translateY(-2rem)',
          },
          '50%': {
            transform: 'translateY(-1rem)',
          },
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
        asset_1: {
          '0%, 100%': {
            transform: 'translateY(1rem)',
          },
          '50%': {
            transform: 'translateX(-2rem)',
          },
        },
        asset_2: {
          '0%, 100%': {
            transform: 'translateX(1rem)',
          },
          '50%': {
            transform: 'rotateX(180deg)',
          },
        },
        asset_3: {
          '0%, 100%': {
            transform: 'rotateZ(-50deg)',
          },
          '50%': {
            transform: 'rotateY(90deg)',
          },
        },
        asset_4: {
          '0%, 100%': {
            transform: 'translateY(5rem)',
          },
          '50%': {
            transform: 'translateX(-5rem)',
          },
        },
        asset_5: {
          '0%, 100%': {
            transform: 'scale(2)',
          },
          '50%': {
            transform: 'translateY(2rem)',
          },
        },
        asset_6: {
          '0%, 100%': {
            transform: 'translateX(-1rem)',
          },
          '50%': {
            transform: 'rotate(-45deg)',
          },
        },
        asset_7: {
          '0%, 100%': {
            transform: 'scaleY(0.5)',
          },
          '50%': {
            transform: 'rotateZ(10deg)',
          },
        },
        asset_8: {
          '0%, 100%': {
            transform: 'rotateX(86deg)',
          },
          '50%': {
            transform: 'translateY(3rem)',
          },
        },
        asset_9: {
          '0%, 100%': {
            transform: 'scale(0.3)',
          },
          '50%': {
            transform: 'rotateZ(-100deg)',
          },
        },
        asset_10: {
          '0%, 100%': {
            transform: 'translateX(5rem)',
          },
          '50%': {
            transform: 'translateX(-5rem)',
          },
        },
        asset_11: {
          '0%, 100%': {
            transform: 'rotateY(90deg)',
          },
          '50%': {
            transform: 'scale(2)',
          },
        },
        asset_12: {
          '0%, 100%': {
            transform: 'scaleX(5)',
          },
          '50%': {
            transform: 'translateY(2rem)',
          },
        },
        asset_13: {
          '0%, 100%': {
            transform: 'rotateZ(20deg)',
          },
          '50%': {
            transform: 'translateY(3rem)',
          },
        },
        asset_14: {
          '0%, 100%': {
            transform: 'scaleX(0.9))',
          },
          '50%': {
            transform: 'translateX(9rem)',
          },
        },
        asset_15: {
          '0%, 100%': {
            transform: 'translateY(-2rem)',
          },
          '50%': {
            transform: 'translateY(2rem)',
          },
        },
        asset_16: {
          '0%, 100%': {
            transform: 'rotateY(45deg)',
          },
          '50%': {
            transform: 'rotateY(-45deg)',
          },
        },
        asset_17: {
          '0%, 100%': {
            transform: 'scale(2)',
          },
          '50%': {
            transform: 'scale(0.5)',
          },
        },
        asset_18: {
          '0%, 100%': {
            transform: 'rotateY(90deg)',
          },
          '50%': {
            transform: 'rotateZ(90deg)',
          },
        },
        asset_19: {
          '0%, 100%': {
            transform: 'translateX(1rem)',
          },
          '50%': {
            transform: 'translateY(-12rem)',
          },
        },
        asset_20: {
          '0%, 100%': {
            transform: 'rotateX(-40deg)',
          },
          '50%': {
            transform: 'rotateX(40deg)',
          },
        },
        asset_21: {
          '0%, 100%': {
            transform: 'rotateY(5deg)',
          },
          '50%': {
            transform: 'scale(5)',
          },
        },
        asset_22: {
          '0%, 100%': {
            transform: 'translateX(-4rem)',
          },
          '50%': {
            transform: 'rotateY(145deg)',
          },
        },
        asset_23: {
          '0%, 100%': {
            transform: 'rotateY(50deg)',
          },
          '50%': {
            transform: 'scale(0.7)',
          },
        },
        asset_24: {
          '0%, 100%': {
            transform: 'scale(3)',
          },
          '50%': {
            transform: 'rotateX(200deg)',
          },
        },
        asset_25: {
          '0%, 100%': {
            transform: 'translateX(30rem)',
          },
          '50%': {
            transform: 'rotateZ(40deg)',
          },
        },
        asset_26: {
          '0%, 100%': {
            transform: 'scaleY(2)',
          },
          '50%': {
            transform: 'scaleX(0.2)',
          },
        },
        asset_27: {
          '0%, 100%': {
            transform: 'rotateX(40deg)',
          },
          '50%': {
            transform: 'rotateX(-50deg)',
          },
        },
        asset_28: {
          '0%, 100%': {
            transform: 'rotateZ(45deg)',
          },
          '50%': {
            transform: 'scale(1.5)',
          },
        },
        asset_29: {
          '0%, 100%': {
            transform: 'scaleY(2)',
          },
          '50%': {
            transform: 'scaleX(1.5)',
          },
        },
        asset_30: {
          '0%, 100%': {
            transform: 'translateX(1rem)',
          },
          '50%': {
            transform: 'rotateX(90deg)',
          },
        },
        asset_31: {
          '0%, 100%': {
            transform: 'rotateY(95deg)',
          },
          '50%': {
            transform: 'rotateZ(-40deg)',
          },
        },
        asset_32: {
          '0%, 100%': {
            transform: 'scale(1.1)',
          },
          '50%': {
            transform: 'scale(0.1)',
          },
        },
        asset_33: {
          '0%, 100%': {
            transform: 'translateY(4rem)',
          },
          '50%': {
            transform: 'translateY(-4rem)',
          },
        },
        asset_34: {
          '0%, 100%': {
            transform: 'rotateY(300deg)',
          },
          '50%': {
            transform: 'rotateY(-30deg)',
          },
        },
        asset_35: {
          '0%, 100%': {
            transform: 'translateX(2rem)',
          },
          '50%': {
            transform: 'rotateZ(330deg)',
          },
        },
        asset_36: {
          '0%, 100%': {
            transform: 'scale(1.7)',
          },
          '50%': {
            transform: 'rotate(50deg)',
          },
        },
        asset_37: {
          '0%, 100%': {
            transform: 'rotateY(-50deg)',
          },
          '50%': {
            transform: 'scale(0.7)',
          },
        },
        asset_38: {
          '0%, 100%': {
            transform: 'rotateX(60deg)',
          },
          '50%': {
            transform: 'translateX(2rem)',
          },
        },
        asset_39: {
          '0%, 100%': {
            transform: 'scaleX(3)',
          },
          '50%': {
            transform: 'scaleY(2.7)',
          },
        },
        asset_40: {
          '0%, 100%': {
            transform: 'rotateZ(45deg)',
          },
          '50%': {
            transform: 'rotateX(45deg)',
          },
        },
        asset_41: {
          '0%, 100%': {
            transform: 'translateY(-3rem)',
          },
          '50%': {
            transform: 'translateX(3rem)',
          },
        },
        asset_42: {
          '0%, 100%': {
            transform: 'rotate(-20deg)',
          },
          '50%': {
            transform: 'rotate(40deg)',
          },
        },
        asset_43: {
          '0%, 100%': {
            transform: 'scale(1.5)',
          },
          '50%': {
            transform: 'rotateY(30deg)',
          },
        },
        asset_44: {
          '0%, 100%': {
            transform: 'translateX(-2rem)',
          },
          '50%': {
            transform: 'translateY(0.5rem)',
          },
        },
      },
      animation: {
        // socialglass: 'social_glass 0.5s 0.5s 0.5s',
        'social-glass': 'social_glass 0.5s',
        'social-glass0': 'social_glass0',
        'initial-page-load': 'initial_page_load 1000ms ease-in-out infinite',
        move: 'move 5s linear infinite',
        move1: 'move1 5s linear infinite',
        squaremove: 'squaremove 10s linear infinite',
        breath1: 'breath_1 7s ease-out infinite',
        breath2: 'breath_2 7s ease-out infinite',
        breath3: 'breath_3 7s ease-out infinite',
        breath4: 'breath_4 7s ease-out infinite',
        breath5: 'breath_5 7s ease-out infinite',
        breath6: 'breath_6 7s ease-out infinite',
        asset1: 'asset_1 0s ease-out infinite',
        asset2: 'asset_2 0s ease-out infinite',
        asset3: 'asset_3 0s ease-out infinite',
        asset4: 'asset_4 0s ease-out infinite',
        asset5: 'asset_5 0s ease-out infinite',
        asset6: 'asset_6 0s ease-out infinite',
        asset7: 'asset_7 0s ease-out infinite',
        asset8: 'asset_8 0s ease-out infinite',
        asset9: 'asset_9 0s ease-out infinite',
        asset10: 'asset_10 0s ease-out infinite',
        asset11: 'asset_11 0s ease-out infinite',
        asset12: 'asset_12 0s ease-out infinite',
        asset13: 'asset_13 0s ease-out infinite',
        asset14: 'asset_14 0s ease-out infinite',
        asset15: 'asset_15 0s ease-out infinite',
        asset16: 'asset_16 0s ease-out infinite',
        asset17: 'asset_17 0s ease-out infinite',
        asset18: 'asset_18 0s ease-out infinite',
        asset19: 'asset_19 0s ease-out infinite',
        asset20: 'asset_20 0s ease-out infinite',
        asset21: 'asset_21 0s ease-out infinite',
        asset22: 'asset_22 0s ease-out infinite',
        asset23: 'asset_23 0s ease-out infinite',
        asset24: 'asset_24 0s ease-out infinite',
        asset25: 'asset_25 0s ease-out infinite',
        asset26: 'asset_26 0s ease-out infinite',
        asset27: 'asset_27 0s ease-out infinite',
        asset28: 'asset_28 0s ease-out infinite',
        asset29: 'asset_29 0s ease-out infinite',
        asset30: 'asset_30 0s ease-out infinite',
        asset31: 'asset_31 0s ease-out infinite',
        asset32: 'asset_32 0s ease-out infinite',
        asset33: 'asset_33 0s ease-out infinite',
        asset34: 'asset_34 0s ease-out infinite',
        asset35: 'asset_35 0s ease-out infinite',
        asset36: 'asset_36 0s ease-out infinite',
        asset37: 'asset_37 0s ease-out infinite',
        asset38: 'asset_38 0s ease-out infinite',
        asset39: 'asset_39 0s ease-out infinite',
        asset40: 'asset_40 0s ease-out infinite',
        asset41: 'asset_41 0s ease-out infinite',
        asset42: 'asset_42 0s ease-out infinite',
        asset43: 'asset_43 0s ease-out infinite',
        asset44: 'asset_44 0s ease-out infinite',
      },
      gridTemplateRows: {
        8: 'repeat(8, minmax(0,1fr))',
        // 'layout': 200px minmax(900px, 1fr) 100px'
        layout: '15em minmax(60em, 1fr) 20em',
        // designMixRows: 'repeat(11, minmax(0, 1fr))',
        // designMixColumns: 'repeat(4, minmax(0, 1fr))',
        designMixHorizontal: 'repeat(11, minmax(0, 1fr))',
        // mobile_medium: 'repeat(7, 1fr)',
      },
      gridTemplateColumns: {
        // designMixHorizontal: 'repeat(4, minmax(0, 1fr))',
        mobile: 'repeat(4, minmax(0, 1fr))',
        mobile_medium: 'repeat(6, minmax(0, 1fr))',
        desktop: 'repeat(11, minmax(0, 1fr))',
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
