import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node",
    coverage: {
      reporter: ["text", "html"],
      include: ["dist/**/*.{ts,tsx}"],
      exclude: ["**/__tests__/**", "**/*.test.ts", "src/*"],
      reportsDirectory: "./coverage",
    },
  },
});
