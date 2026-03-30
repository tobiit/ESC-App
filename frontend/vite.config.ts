import { execSync } from "child_process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getGitCommit(): string {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __GIT_COMMIT__: JSON.stringify(getGitCommit())
  },
  resolve: {
    // Prefer TS/TSX when both TS and generated JS artifacts are present.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"]
  },
  server: {
    host: "0.0.0.0",
    port: 5173
  }
});
