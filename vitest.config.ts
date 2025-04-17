import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node",
    ui: true,
    coverage: {
      reporter: ["text", "html"],
      include: ["dist/**/*.{cjs,mjs,ts,cts}"],
      exclude: ["**/__tests__/**", "**/*.test.ts", "src/*"],
      reportsDirectory: "./coverage",
    },
  },
  resolve: {
    conditions: ["import", "require"],
  },
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "subflow",
    },
  },
});
