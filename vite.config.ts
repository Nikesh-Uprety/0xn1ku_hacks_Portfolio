import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // 🔥 This enables support for SPA routes in local dev
    fs: {
      allow: ["."],
    },
    export default defineConfig({
  root: 'client',
  build: {
    outDir: '../dist'
  }
}),
    middlewareMode: false,
    historyApiFallback: true,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
    },
  },
  build: {
    outDir: "dist",
  },
}));
