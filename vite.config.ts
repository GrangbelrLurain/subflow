import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths({ root: "./usecases" })],
  optimizeDeps: {
    exclude: ["vitest"],
  },
  build: {
    lib: {
      entry: "./usecases/sign-up.ts",
      formats: ["es"],
      fileName: () => "sign-up.js",
    },
    outDir: "./usecases/dist",
    emptyOutDir: false,
  },
});
