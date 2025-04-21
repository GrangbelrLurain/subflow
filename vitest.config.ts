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
      include: ["dist/**/*.{js,ts}"],
      exclude: ["**/__tests__/**", "**/*.test.ts", "src/**", "dist/types/**"],
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
