//Интерфейс для установки путей проекта
export interface IBuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
}
//Интерфейс для типизации env переменной
export interface IEnvVariables {
  mode: TBuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: TBuildPlatform;
}
//Интерфейс для типизации общих переменных options
export interface IBuildOptions {
  port: number;
  paths: IBuildPaths;
  mode: TBuildMode;
  analyzer: boolean;
  platfrom: string;
}

export type TBuildMode = "production" | "development";
export type TBuildPlatform = "mobile" | "descktop";
