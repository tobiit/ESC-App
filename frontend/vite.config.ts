import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Prefer TS/TSX when both TS and generated JS artifacts are present.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"]
  },
  server: {
    host: "0.0.0.0",
    port: 5173
  }
});
