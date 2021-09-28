import { join } from "path";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import createImportPlugin from "vite-plugin-import";
import reactJsx from "vite-react-jsx";

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
    reactRefresh(),
    reactJsx(),
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
