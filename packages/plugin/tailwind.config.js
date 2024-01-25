import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#00c3ff",
          secondary: "#00a04b",
          accent: "#e23a00",
          neutral: "#0e0a07",
          "base-100": "#f8ffff",
          info: "#006dc8",
          success: "#37b542",
          warning: "#ff6f00",
          error: "#eb0041",
        },
        dark: {
          primary: "#00c3ff",
          secondary: "#00a04b",
          accent: "#e23a00",
          neutral: "#f8ffff",
          "base-100": "#0e0a07",
          info: "#006dc8",
          success: "#37b542",
          warning: "#ff6f00",
          error: "#eb0041",
        },
      },
    ],
    darkTheme: "dark",
  },
};
