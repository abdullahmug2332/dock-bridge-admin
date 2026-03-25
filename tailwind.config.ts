import type { Config } from "tailwindcss"

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
    },
  },
}

export default config