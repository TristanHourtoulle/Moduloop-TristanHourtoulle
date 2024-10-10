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
              50: "#FFF5F5",
              100: "#FED7D7",
              200: "#FEB2B2",
              300: "#FC8181",
              400: "#F56565",
              500: "#FE5858",
              600: "#E53E3E",
              700: "#C53030",
              800: "#9B2C2C",
              900: "#742A2A",
              DEFAULT: "#FE5858",
            },
            secondary: {
              50: "#FFF8F2",
              100: "#FFE8D6",
              200: "#FFD0B2",
              300: "#FFB988",
              400: "#FFA366",
              500: "#FF7A2F",
              600: "#DB5D1F",
              700: "#B7491A",
              800: "#933116",
              900: "#7A2713",
              DEFAULT: "#E54600",
            },
          },
        },
      },
    }),
  ],
});
export default config;
