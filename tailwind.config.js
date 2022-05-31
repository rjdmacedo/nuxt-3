const colors = require("tailwindcss/colors")
require("daisyui/src/colors/themes")

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        teal: colors.teal,
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0d9488",
          secondary: "#14b8a6",
          accent: "#a7f3d0",
          neutral: "#FFFFFF",
          "base-100": "#FFFFFF",
          info: "#bae6fd",
          success: "#059669",
          warning: "#fcd34d",
          error: "#ef4444",
        },
      },
      {
        dark: {
          primary: "#ff79c6",
          secondary: "#bd93f9",
          accent: "#ffb86c",
          neutral: "#414558",
          "base-100": "#282a36",
          "base-content": "#f8f8f2",
          info: "#8be9fd",
          success: "#50fa7b",
          warning: "#f1fa8c",
          error: "#ff5555",
        },
      },
    ],
  },
}
