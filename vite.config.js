import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      port: 3000,
    },
    define: {
      "process.env": process.env,
    },
  };
});
