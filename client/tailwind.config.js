/* eslint-disable no-undef */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#374151", // gray-700
            lineHeight: "1.8",
            p: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            h2: {
              marginTop: "2.5em",
              marginBottom: "1em",
              color: "#111827", // gray-900
            },
            h3: {
              marginTop: "2em",
              marginBottom: "0.75em",
              color: "#1f2937", // gray-800
            },
            strong: {
              color: "#111827",
              fontWeight: "600",
            },
            table: {
              marginTop: "2em",
              marginBottom: "2em",
            },
            th: {
              backgroundColor: "#f9fafb",
              padding: "0.75em",
            },
            td: {
              padding: "0.75em",
            },
            code: {
              backgroundColor: "#f3f4f6",
              padding: "0.25em 0.4em",
              borderRadius: "0.375rem",
              color: "#111827",
            },
            pre: {
              backgroundColor: "#0f172a",
              color: "#e5e7eb",
              padding: "1.25em",
              borderRadius: "0.75rem",
              marginTop: "2em",
              marginBottom: "2em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
