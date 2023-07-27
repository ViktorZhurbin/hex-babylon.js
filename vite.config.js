import checker from "vite-plugin-checker";

export default {
  plugins: [
    checker({
      typescript: true,
      overlay: false,
      enableBuild: true,
    }),
  ],
};
