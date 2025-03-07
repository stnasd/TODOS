import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration, DefinePlugin } from "webpack";
import { IBuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export function buildPlugins({
  mode,
  paths,
  analyzer,
  platfrom,
}: IBuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";

  const plugins: Configuration["plugins"] = [
    analyzer && new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, "favicon.ico"),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platfrom),
      __ENV__: JSON.stringify(mode),
    }),
  ];

  if (isDev) {
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (!isDev) {
    //prod
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    // ProgressPlugin медленный, можно включить например в режиме prod или вообще не ставить
    plugins.push(new webpack.ProgressPlugin());
    //CopyPlugin Для копирования фалов в бандл, например для файлов json переводов
    new CopyPlugin({
      patterns: [{ from: "source", to: "dest" }],
    });
  }
  return plugins.filter(Boolean);
}
