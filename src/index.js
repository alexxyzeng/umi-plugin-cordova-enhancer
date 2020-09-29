// ref:
// - https://umijs.org/plugin/develop.html
// import { IApi } from "umi-types";

import {
  updateGitignore,
  updatePackageJson,
  addCordova
} from "./utils/initCordova";
import { parseConfig } from "./utils/config";
/**
 *
 * @param {IApi} api
 * @param {*} options
 */
export default function(api, options) {
  // Example: output the webpack config
  api.registerCommand("cordova_init", () => {
    console.log(options, "---- options");
    // TODO: 1. 复制build文件夹
    // TODO: 2. 安装cordova
    // TODO: 3. 将platforms/plugins/www添加到gitignore
    // TODO: 4.初始化config.xml
    // TODO: 5 写入package.json命令
    updateGitignore();
    addCordova();
    updatePackageJson();
    updateConfig(options);
  });
}

function updateConfig(options) {
  const { configPath, config, resPath } = options;
  parseConfig({ ...config, configPath, resPath }, configPath);
}
