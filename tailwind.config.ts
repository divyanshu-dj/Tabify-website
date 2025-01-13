import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        background: "var(--background)",
        foreground: "var(--foreground)",
        'dark-blue': "#313338",
        'secondary-black': '#1e1f22',
        'tertiary-black': '#232428',
      },
    },
  },
  plugins: [],
} satisfies Config;
