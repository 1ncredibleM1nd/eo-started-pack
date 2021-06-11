const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const CopyPlugin = require("copy-webpack-plugin");
const DotenvFlow = require("dotenv-flow-webpack");

module.exports = (env, { mode }) => {
  process.env.NODE_ENV = mode; // setup for dotenv-flow-webpack

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },
    devServer: {
      historyApiFallback: true,
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: false,
      },
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
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
                  [
                    require.resolve("babel-plugin-import"),
                    {
                      libraryName: "antd",
                      libraryDirectory: "es",
                      style: true,
                    },
                  ],
                  [
                    require.resolve("@babel/plugin-proposal-decorators"),
                    { legacy: true },
                  ],
                  [
                    require.resolve("@babel/plugin-proposal-private-methods"),
                    { loose: true },
                  ],
                  [
                    require.resolve("@babel/plugin-proposal-class-properties"),
                    { loose: true },
                  ],
                  require.resolve("@babel/plugin-proposal-optional-chaining"),
                  require.resolve(
                    "@babel/plugin-proposal-nullish-coalescing-operator"
                  ),
                ],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: "style-loader" },
            MiniCssExtractPlugin.loader,
            { loader: "css-loader" },
            {
              loader: "postcss-loader",
              options: {
                config: { path: path.join(__dirname, "./postcss.config.ts") },
              },
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
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader", // translates CSS into CommonJS
            },
            {
              loader: "postcss-loader",
              options: {
                config: { path: path.join(__dirname, "./postcss.config.ts") },
              },
            },
            {
              loader: "less-loader", // compiles Less to CSS,
              options: {
                javascriptEnabled: true,
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
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new DotenvFlow(),
      new CopyPlugin({
        patterns: [{ from: "manifest.json" }],
      }),
      new SpriteLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new FriendlyErrorsPlugin({
        clearConsole: true,
        compilationSuccessInfo: {
          messages: [
            "PapaBot application is running here http://localhost:8080",
          ],
        },
      }),
    ],
  };
};
