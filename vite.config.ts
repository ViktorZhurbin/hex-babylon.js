import { defineConfig, splitVendorChunkPlugin } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    checker({
      typescript: true,
      overlay: false,
      enableBuild: true,
    }),
  ],
});
