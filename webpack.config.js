const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const DotenvFlow = require("dotenv-flow-webpack");

module.exports = (env, { mode }) => {
  const isProdMode = mode === "production";
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProdMode ? "[name].[contenthash].js" : "[name].js",
    },
    devServer: {
      stats: "minimal",
      historyApiFallback: true,
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".json",
        ".scss",
        ".png",
        ".jpg",
        ".gif",
        ".jpeg",
        ".otf",
        ".ttf",
        ".svg",
      ],
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                presets: [
                  require.resolve("@babel/preset-env"),
                  require.resolve("@babel/preset-react"),
                  require.resolve("@babel/preset-typescript"),
                ],
                plugins: [
                  require.resolve("@babel/plugin-proposal-private-methods"),
                  require.resolve("@babel/plugin-proposal-class-properties"),
                  require.resolve("@babel/plugin-proposal-optional-chaining"),
                  require.resolve(
                    "@babel/plugin-proposal-nullish-coalescing-operator"
                  ),
                  require.resolve("@babel/plugin-transform-runtime"),
                ],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: "style-loader" },
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            { loader: "css-loader" },
            {
              loader: "postcss-loader",
            },
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader", // creates style nodes from JS strings
            },
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            {
              loader: "css-loader", // translates CSS into CommonJS
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "less-loader", // compiles Less to CSS,
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                  math: "always",
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },

        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
        {
          test: /.(ttf|otf|eot|woff(2)?)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-sprite-loader",
              options: {
                symbolId: "[name]",
              },
            },
          ],
        },
      ],
    },
    cache: {
      type: "filesystem",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new DotenvFlow({
        node_env: env.production
          ? "production"
          : env.demo
          ? "demo"
          : "development",
      }),
      new SpriteLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: isProdMode ? "[name].[contenthash].css" : "[name].css",
        chunkFilename: isProdMode ? "[id].[contenthash].css" : "[id].css",
      }),
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
    ],
  };
};
