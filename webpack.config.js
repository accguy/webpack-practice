const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
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
      banner: `
        <Banner>\n
        Commit version : ${childProcess.execSync("git rev-parse --short HEAD")}
        Committer : ${childProcess.execSync("git config user.name")}
        Commit Date : ${new Date().toLocaleString()}
    `,
    }),

    // 소스코드에 직접적으로 작성하면 안되는 전역상수를 만드는 플러그인
    new webpack.DefinePlugin({
      // webpack.config.js 파일 자체가 깃허브에 올라가 있는 경우 노출을
      // 피하기 위해서 .env를 사용하여 값을 관리합니다.
      pw: process.env.PW,
      dev: JSON.stringify(process.env.DEV_API),
      pro: JSON.stringify(process.env.PRO_API),
      // 값을 단순히 문자열로 전달하면 값으로 인식하지 못하는 문제가 있습니다.
      // 주소에 :가 들어가면 에러남
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new CleanWebpackPlugin(),
  ],
};
