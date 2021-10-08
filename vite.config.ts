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
    react({
      jsxRuntime: "classic",
      babel: {
        plugins: [
          "babel-plugin-transform-typescript-metadata",
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
    createSvgSpritePlugin(),
    createImportPlugin({
      onlyBuild: false,
      babelImportPluginOptions: [
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: "css",
        },
        {
          libraryName: "lodash",
          libraryDirectory: "",
          camel2DashComponentName: false,
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
