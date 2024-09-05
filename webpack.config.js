const path = require("path");
const webpack = require("webpack");
require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",

  entry: {
    main: path.resolve("./src/app.js"),
  },

  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve("./myLoader.js")],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 용량이 20kB 이하인 이미지만 base64 포맷으로 처리하겠다는 조건
            // rickdom.jpg는 6KB이므로 base64 포맷으로 이미지를 불러온다.
            maxSize: 20 * 1024,
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: `마지막 빌드 시간은 ${new Date().toLocaleString()}입니다.`,
    }),

    new webpack.DefinePlugin({
      dev: JSON.stringify(process.env.DEV_API),
      pro: JSON.stringify(process.env.PRO_API),
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new CleanWebpackPlugin(),
  ],
};
