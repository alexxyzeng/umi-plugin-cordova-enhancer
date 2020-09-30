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
import chalk from "chalk";
/**
 *
 * @param {IApi} api
 * @param {*} options
 */
export default function(api, options) {
  api.modifyDefaultConfig(config => {
    return {
      ...config,
      outputPath: "www"
    };
  });

  api.registerCommand("cordova", args => {
    if (api.config.outputPath !== "www") {
      console.log(
        chalk.blue(
          "To develop a cordova based app, you need to specify " +
            chalk.green("outputPath") +
            " to " +
            chalk.yellow("www") +
            " in the " +
            chalk.underline.red("config.xml")
        )
      );
      return;
    }
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
      return releaseApp(args, options);
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

import fs from "fs";

function updateCordovaPlatform(args) {
  const list = childProcess.execSync("cordova platform ls") + "";
  const installedPlatforms = list.slice(0, list.indexOf("Available platforms"));
  // TODO: 在安装前检查对应的platform是否已存在
  const [action = "add", platform = "ios"] = args._ || [];
  if (action === "add" && installedPlatforms.includes(platform)) {
    console.log(
      "The platform " +
        chalk.yellow(platform) +
        " you want to add is already added"
    );
    return;
  }
  if (action === "remove" && !installedPlatforms.includes(platform)) {
    console.log(
      "The platform " +
        chalk.yellow(platform) +
        " you want to remove is not added"
    );
    return;
  }
  try {
    childProcess.execSync(`cordova platform ${action} ${platform}`);
    console.log(
      "The platform " + chalk.yellow(platform) + " is successfully added"
    );
  } catch (err) {
    console.log(chalk.bgCyan(err));
  }
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

function releaseApp(args, options) {
  const [platform] = args._ || [];
  if (!platform) {
    return;
  }
  if (platform === "android") {
    return releaseAndroidApp();
  } else if (platform === "ios") {
    releaseiOSApp(options);
  }
}

function releaseAndroidApp(options) {
  childProcess.execSync(`cordova build android --release`);
  // TODO: 移动App到指定位置
}

function releaseiOSApp() {
  childProcess.execSync(`cordova build ios && fastlane beta`);
}

// TODO: 初始化iOS ci环境

function updateConfig(options, baseConfigPath) {
  const { configPath, config, resPath } = options;
  parseConfig({ ...config, configPath, resPath }, baseConfigPath);
}
