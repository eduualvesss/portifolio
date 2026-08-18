import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Only used by `vite`'s own dev server as a fallback. Prefer
      // `vercel dev` (see README) which runs the API functions for real.
      "/api": "http://localhost:3000",
    },
  },
});
