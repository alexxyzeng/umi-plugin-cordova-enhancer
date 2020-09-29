// ref:
// - https://umijs.org/plugin/develop.html
// import { IApi } from "umi-types";
import childProcess from "child_process";
import {
  updateGitignore,
  updatePackageJson,
  addCordova
} from "./utils/initCordova";
import { parseConfig } from "./utils/config";
import { stdout } from "process";
/**
 *
 * @param {IApi} api
 * @param {*} options
 */
export default function(api, options) {
  api.registerCommand("cordova", args => {
    if (args.init) {
      return initCordova(options);
    }
    if (args.prepare) {
      return prepareCorodva();
    }
    if (args.platform) {
      return updateCordovaPlatform(args);
    }
    return updateCordovaPlugin(args);
  });
}

function initCordova(options) {
  addCordova();
  updateGitignore();
  updatePackageJson(options);
  updateConfig(options);
}

function updateCordovaPlatform(args) {
  // TODO: 在安装前检查对应的platform是否已存在
  const [action = "add", platform = "ios"] = args._ || [];
  childProcess.execSync(`cordova platform ${action} ${platform}`);
}

function updateCordovaPlugin(args) {
  const [action, plugin] = args._ || [];
  if (!action || !plugin) {
    // TODO: 错误提示
    return;
  }
  childProcess.execSync(
    `cordova plugin ${action} ${plugin} && cordova plugin save`
  );
}

function prepareCorodva() {
  childProcess.execFileSync(`cordova prepare --color`);
}

function updateConfig(options, baseConfigPath) {
  const { configPath, config, resPath } = options;
  parseConfig({ ...config, configPath, resPath }, baseConfigPath);
}
