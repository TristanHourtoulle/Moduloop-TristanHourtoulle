const { nextui } = require("@nextui-org/react");
const withMT = require("@material-tailwind/react/utils/withMT");

const config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        "extra-loose": "5", // Example custom line height
      },
      colors: {
        "red-custom": "rgb(255, 0, 0)",
        "red-custom-transparent": "rgba(255, 0, 0, 0.19)",
        "primary-transparent": "rgb(48,193,189, 0.10)",
        "primary-border-transparent": "rgb(48,193,189, 0.5)",
      },
      fontFamily: {
        sans: ['"M PLUS Rounded 1c"', "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      colors: {},
      themes: {
        light: {
          colors: {
            background: "#F6F6F6",
            foreground: "#11181C",
            primary: {
              50: "#F0F9F8",
              100: "#D2FAEB",
              200: "#A6F6DF",
              300: "#75E6CF",
              400: "#4FCDBE",
              500: "#30C1BD",
              600: "#178C93",
              700: "#106B7B",
              800: "#0A4E63",
              900: "#063952",
              DEFAULT: "#30C1BD",
            },
            danger: {
              50: "#FEEFEE",
              100: "#FFE3D5",
              200: "#FFC1AC",
              300: "#FF9882",
              400: "#FF7163",
              500: "#FF3030",
              600: "#DB2333",
              700: "#B71833",
              800: "#930F31",
              900: "#7A0930",
              DEFAULT: "#FF3030",
            },
          },
        },
      },
    }),
  ],
});
export default config;
