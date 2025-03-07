import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebPack";
import { IBuildPaths, IEnvVariables } from "./config/build/types/types";

export default (env: IEnvVariables) => {
  const paths: IBuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };
  const isDev = env.mode === "development";
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
    platfrom: env.platform ?? "desktop",
  });
  return config;
};
