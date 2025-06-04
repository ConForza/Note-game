import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
    }),
  ],
  base: "/Note-game/",
});
