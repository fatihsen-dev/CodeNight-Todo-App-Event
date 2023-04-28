/** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      container: {
         center: true,
      },
      extend: {
         colors: {
            blue: "#5E96D8",
            blueDark: "#3e72b0",
            red: "#DE665A",
            green: "#62C275",
            greenDark: "#55b569",
            yellow: "#FFDE54",
            yellowDark: "#d6b93e",
            light: "#FBFBFB",
            dark: "rgba(0,0,0,0.80)",
         },
      },
   },
   plugins: [],
};
