import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { IBuildOptions } from "./types/types";
import { RuleSetRule } from "webpack";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: IBuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const imagesLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
            namedExport: false,
            exportLocalsConvention: "as-is",
          },
        },
      },
      ,
      "sass-loader",
    ],
  };

  const stringReplaceLoader: RuleSetRule = {
    test: /\.(js|jsx|ts|tsx)$/,
    use: [
      {
        loader: "string-replace-loader",
        options: {
          search: 'data-testid="[^"]*"',
          replace: "",
          flags: "g",
        },
      },
    ],
    enforce: !isDev ? "pre" : undefined, // enforce может быть "pre" или undefined
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
            namedExport: false,
            exportLocalsConvention: "as-is",
          },
        },
      },
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev,
        },
      },
    ],
    exclude: /node_modules/,
  };
  return [
    scssLoader,
    cssLoader,
    tsLoader,
    imagesLoader,
    svgrLoader,
    stringReplaceLoader,
  ];
}
