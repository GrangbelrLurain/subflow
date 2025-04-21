import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
      include: ["src"],
      exclude: ["test", "**/*.test.ts"],
      outDir: "dist/types",
      compilerOptions: {
        baseUrl: "./",
        paths: {
          "@subflow/*": ["./src/*"],
        },
      },
      beforeWriteFile: (filePath, content) => {
        return {
          filePath: filePath.replace(/^dist\/types\//, "dist/"),
          content,
        };
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Subflow",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      output: {
        dir: "dist",
      },
    },
    sourcemap: true,
  },
});
