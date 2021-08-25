import { join } from "path";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import createImportPlugin from "vite-plugin-import";

import reactJsx from "vite-react-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    fs: {
      strict: true,
    },
  },
  plugins: [
    reactRefresh(),
    reactJsx(),
    svgrPlugin(),
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
      { find: "@", replacement: "/src" },
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), "node_modules/$1"),
      },
    ],
  },
});
