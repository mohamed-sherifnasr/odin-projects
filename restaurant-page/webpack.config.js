// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Module from "node:module";

export default {
  mode: "production",

  entry: "./src/index.js",

  output: {
  filename: "main.js",
  path: path.resolve(import.meta.dirname, "dist"),
  publicPath: "/odin-projects/restaurant-page/",
  clean: true,
},
  devServer: {
  static: {
    directory: path.resolve(import.meta.dirname, "dist"),
  },
  port: 8080,
  open: true,
  historyApiFallback: true,
},

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};