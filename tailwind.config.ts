const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        // Main theme colors
        primary: "#30C1BD",
        danger: "#FE5858",
        secondary: "#E54600",
        // UI component colors (with hover states)
        "ui-primary": "#30C1BD",
        "ui-primary-hover": "#2AA8A5",
        "ui-danger": "#FE5858",
        "ui-danger-hover": "#E54646",
        "ui-secondary": "#E54600",
        "ui-secondary-hover": "#CC3F00",
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
  plugins: [],
};
export default config;
