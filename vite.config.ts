import { join } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import createImportPlugin from "vite-plugin-import";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  server: {
    port: 8080,
    fs: {
      strict: true,
    },
  },
  plugins: [
    react(),
    createSvgSpritePlugin(),
    createImportPlugin({
      onlyBuild: false,
      babelImportPluginOptions: [
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: "css",
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: "assert",
        replacement: require.resolve("assert"),
      },
      { find: "@", replacement: "/src" },
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), "node_modules/$1"),
      },
    ],
  },
});
