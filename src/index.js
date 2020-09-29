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
    if (args.release) {
      return releaseAndroidApp(args);
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
  childProcess.execSync(`cordova prepare --color`);
}

function runApp(args) {
  const [action, platform] = args._ || [];
  if (!action || !platform) {
    return;
  }
  childProcess.execSync(`cordova ${action} ${platform}`);
}

function releaseApp(args) {
  const [platform] = args._ || [];
  if (!platform) {
    return;
  }
  if (platform === "android") {
    return releaseAndroidApp();
  } else if (platform === "ios") {
    releaseiOSApp();
  }
}

function releaseAndroidApp() {
  childProcess.execSync(`cordova build android --release`);
}

function releaseiOSApp() {
  childProcess.execSync(`cordova build ios && fastlane beta`);
}

function updateConfig(options, baseConfigPath) {
  const { configPath, config, resPath } = options;
  parseConfig({ ...config, configPath, resPath }, baseConfigPath);
}
