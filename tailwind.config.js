// import daisyui from "daisyui";

// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [daisyui],
//   daisyui: {
//     themes: [
//       {
//         light: {
//           primary: "#16a34a",      // green
//           secondary: "#22c55e",
//           accent: "#4ade80",
//           neutral: "#f3f4f6",
//           "base-100": "#ffffff",
//           "base-200": "#f9fafb",
//           "base-300": "#e5e7eb",
//           info: "#0ea5e9",
//           success: "#22c55e",
//           warning: "#facc15",
//           error: "#ef4444",
//         },
//       },
//       {
//         dark: {
//           primary: "#22c55e",      // brighter green
//           secondary: "#4ade80",
//           accent: "#86efac",
//           neutral: "#1f2933",
//           "base-100": "#0f172a",   // navy dark
//           "base-200": "#020617",
//           "base-300": "#1e293b",
//           info: "#38bdf8",
//           success: "#4ade80",
//           warning: "#fde047",
//           error: "#f87171",
//         },
//       },
//     ],
//   },
// };

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- এই লাইনটি অবশ্যই থাকতে হবে
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}