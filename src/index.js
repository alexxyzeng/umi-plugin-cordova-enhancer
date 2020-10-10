// ref:
// - https://umijs.org/plugin/develop.html
// import { IApi } from "umi-types";
import childProcess from "child_process";
import fs from "fs";
import {
  updateGitignore,
  updatePackageJson,
  addCordova
} from "./utils/initCordova";
import { parseConfig } from "./utils/config";
import { stdout } from "process";
import chalk from "chalk";

const TAG = "org.alexzeng.umi-plugin-cordova-enhance";

const commands = {
  initCordova: (options, success, failure) =>
    initCordova(options, success, failure),
  addIOS: (_, success, failure) =>
    updateCordovaPlatform(
      { _: ["add", "ios"], platform: true },
      success,
      failure
    ),
  addAndroid: (_, success, failure) =>
    updateCordovaPlatform(
      { _: ["add", "android"], platform: true },
      success,
      failure
    ),
  removeIOS: (_, success, failure) =>
    updateCordovaPlatform(
      { _: ["remove", "ios"], platform: true },
      success,
      failure
    ),
  removeAndroid: (_, success, failure) =>
    updateCordovaPlatform(
      { _: ["remove", "android"], platform: true },
      success,
      failure
    ),
  getCordovaInfo: (_, success, failure) => {
    getCordovaDetails(_, success, failure);
  },
  debugIOS: (_, success, failure) => {
    runAppInUI("mock:ios", success, failure);
  },
  debugAndroid: (_, success, failure) => {
    runAppInUI("mock:android", success, failure);
  },
  runRealAndroid: (_, success, failure) => {
    runAppInUI("run:android", success, failure);
  },
  releaseIOS: (_, success, failure) => {
    failure({
      message: "当前功能未实现"
    });
  },
  releaseAndroid: (options, success, failure) => {
    releaseAndroidApp(options, success, failure);
  }
};

/**
 *
 * @param {IApi} api
 * @param {*} options
 */
export default function(api, options) {
  api.addUIPlugin(require.resolve("../dist/index.umd"));
  api.onUISocket(({ action, failure, success }) => {
    const { type } = action;
    if (!type.startsWith(TAG)) {
      failure({
        message: "输入的指令不正确"
      });
      return;
    }
    const parsedAction = type.replace(`${TAG}.`, "");
    const command = commands[parsedAction];
    if (!command) {
      failure({
        message: "未找到对应的指令"
      });
    }
    command(options, success, failure);
  });

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
    if (args.plugin) {
      return updateCordovaPlugin(args);
    }
    return runApp(args);
  });
}

function initCordova(options, success) {
  updateConfig(options);
  addCordova();
  updateGitignore();
  updatePackageJson(options);
  success &&
    success({
      data: "初始化Cordova成功"
    });
}

function updateCordovaPlatform(args, success, failure) {
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
    failure &&
      failure({
        message: `要添加的platform: ${platform}, 已存在`
      });
    return;
  }
  if (action === "remove" && !installedPlatforms.includes(platform)) {
    console.log(
      "The platform " +
        chalk.yellow(platform) +
        " you want to remove is not added"
    );
    failure &&
      failure({
        message: `要移除的platform: ${platform}不存在`
      });
    return;
  }
  try {
    childProcess.execSync(`cordova platform ${action} ${platform}`);
    console.log(
      "The platform " + chalk.yellow(platform) + " is successfully added"
    );
    success &&
      success({
        data: `更新platform: ${platform}成功`
      });
  } catch (err) {
    console.log(chalk.bgCyan(err));
    failure &&
      failure({
        message: `更新platform: ${platform}失败, 错误信息为: ${err?.message}`
      });
  }
}

function updateCordovaPlugin(args, success, failure) {
  const [action, plugin] = args._ || [];
  if (!action || !plugin) {
    // TODO: 错误提示
    failure &&
      failure({
        message: `未指定add/remove或者plugin名称, 当前操作为${action}, 当前plugin名称为${plugin}`
      });
    return;
  }
  childProcess.execSync(
    `cordova plugin ${action} ${plugin} && cordova plugin save`
  );
  success &&
    success({
      data: `更新插件${plugin}成功`
    });
}

function prepareCorodva(args, success, failure) {
  childProcess.execSync(`cordova prepare --color`);
  success &&
    success({
      data: "恢复Cordova信息成功"
    });
}

function runApp(args) {
  const [action, platform] = args._ || [];
  if (!action || !platform) {
    return;
  }
  childProcess.execSync(`cordova ${action} ${platform}`);
}

function runAppInUI(args, success, failure) {
  childProcess.execSync(`yarn ${args}`);
  success &&
    success({
      data: "启动成功"
    });
}

function releaseApp(args, options) {
  const [platform] = args._ || [];
  if (!platform) {
    return;
  }
  if (platform === "android") {
    return releaseAndroidApp(options);
  } else if (platform === "ios") {
    releaseiOSApp(options);
  }
}

function releaseAndroidApp(options, success, failure) {
  childProcess.execSync(`cordova build android --release`);
  success &&
    success({
      data: "Release成功"
    });
  const { apkOutputPath, apkOutputName = "app-release" } = options;
  if (!apkOutputPath) {
    return;
  }
  if (!fs.existsSync(apkOutputPath)) {
    fs.mkdirSync(apkOutputPath);
  }
  childProcess.execSync(
    `cp platforms/android/app/build/outputs/apk/release/app-release*.apk ${apkOutputPath}/${apkOutputName}.apk` +
      ` && cd ${apkOutputPath} && open .`
  );
}

function configCI_iOS(_, success, failure) {
  childProcess.spawn("fastlane init", { cwd: "platforms/ios" });
}

function releaseiOSApp(_, success, failure) {
  const noFastlane = (childProcess.execSync("which fastlane") + "").includes(
    "not Found"
  );
  if (noFastlane) {
    return (
      failure &&
      failure({
        message: '需要先安装fastlane, 可以执行"brew install fastlane"'
      })
    );
  }
  childProcess.execSync(`cordova build ios && fastlane beta`);
}

function getCordovaDetails(_, success, failure) {
  const platforms = childProcess.execSync("cordova platform ls") + "";
  const installedPlatforms = platforms
    .slice(0, platforms.indexOf("Available platforms"))
    .replace(/Installed platforms:|\n/g, "")
    .split(" ")
    .filter(item => item !== "");
  const plugins = (childProcess.execSync("cordova plugin ls") + "")
    .replace(/\n/g, "")
    .split('"')
    .filter(item => item !== "");
  success &&
    success({
      data: {
        platforms: installedPlatforms,
        plugins
      }
    });
}

// TODO: 初始化iOS ci环境

function updateConfig(options, baseConfigPath) {
  const { configPath, config, resPath } = options;
  parseConfig({ ...config, configPath, resPath }, baseConfigPath);
}
