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
import { getConfig, parseConfig, updateConfig } from "./utils/config";
import { stdout } from "process";
import path from "path";
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
  debugIOS: (_, success, failure, api) => {
    runAppInUI("mock:ios", success, failure, api);
  },
  debugAndroid: (_, success, failure, api) => {
    runAppInUI("mock:android", success, failure, api);
  },
  runRealAndroid: (_, success, failure, api) => {
    runAppInUI("run:android", success, failure, api);
  },
  releaseIOS: (_, success, failure) => {
    failure({
      message: "当前功能未实现"
    });
  },
  releaseAndroid: (options, success, failure) => {
    releaseAndroidApp(options, success, failure);
  },
  getCordovaConfig: (options, success, failure) => {
    getCordovaConfig(options, success, failure);
  },
  updateCordovaConfig: (options, success, failure, _, params) => {
    updateCordovaConfig(options, success, failure, params);
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
    const { type, payload } = action;
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
    command(options, success, failure, api, payload);
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
    return runApp(args, api);
  });
}

function initCordova(options, success) {
  writeCordovaConfig(options);
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
    childProcess.execSync(`cordova platform ${action} ${platform}`, {
      stdio: "inherit"
    });
    console.log(
      "The platform " +
        chalk.yellow(platform) +
        " is successfully " +
        action ===
        "add"
        ? "added"
        : "removed"
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
  const { _, variable } = args;
  const [action, plugin] = args._ || [];
  if (!action || !plugin) {
    // TODO: 错误提示
    failure &&
      failure({
        message: `未指定add/remove或者plugin名称, 当前操作为${action}, 当前plugin名称为${plugin}`
      });
    return;
  }
  let addPluginCommand = `cordova plugin ${action} ${plugin}`;
  if (Array.isArray(variable) && variable.length > 0) {
    variable.forEach(item => {
      addPluginCommand += ` --variable ${item}`;
    });
  }
  addPluginCommand += " -- save";
  // TODO: 如果有对应的types, 同时下载
  childProcess.execSync(`${addPluginCommand}`, { stdio: "inherit" });
  const pluginTypings = JSON.parse(
    fs.readFileSync(path.join(__dirname, "pluginTypings.json"), "utf-8")
  );
  if (pluginTypings[plugin]) {
    const devAction = action === "add" ? "add -D" : "remove";
    childProcess.execSync(`yarn ${devAction} @types/${plugin}`, {
      stdio: "inherit"
    });
  }
  success &&
    success({
      data: `更新插件${plugin}成功`
    });
}

function prepareCorodva(args, success, failure) {
  childProcess.execSync(`cordova prepare --color`, { stdio: "inherit" });
  success &&
    success({
      data: "恢复Cordova信息成功"
    });
}

function runApp(args, api) {
  const [action, platform] = args._ || [];
  if (!action || !platform) {
    return;
  }
  api.log.pending(`Running cordova ${action} ${platform}`);
  childProcess.execSync(`cordova ${action} ${platform}`, { stdio: "inherit" });
  api.log.success(`Run cordova ${action} ${platform} success`);
}

function runAppInUI(args, success, failure, api) {
  api.log.pending(`Running yarn ${args}`);
  childProcess.execSync(`yarn ${args}`, { stdio: "inherit" });
  api.log.success(`Run yarn ${args} success!`);
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

function releaseAndroidApp(options, success, failure, api) {
  api.log.pending(`Running release android app`);
  childProcess.execSync(`cordova build android --release`, {
    stdio: "inherit"
  });
  api.log.success(`Run release android app finished`);
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
      ` && cd ${apkOutputPath} && open .`,
    { stdio: "inherit" }
  );
}

function configCI_iOS(_, success, failure) {
  childProcess.spawn("fastlane init", {
    cwd: "platforms/ios",
    stdio: "inherit"
  });
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
  childProcess.execSync(`cordova build ios && fastlane beta`, {
    stdio: "inherit"
  });
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

function getCordovaConfig(options, success, failure) {
  const config = getConfig(options);
  success &&
    success({
      data: config
    });
}

function writeCordovaConfig(options, success, failure) {
  parseConfig(options);
  success &&
    success({
      data: "写入配置成功"
    });
}

function updateCordovaConfig(options, success, failure, params) {
  const finalOptions = { ...options, config: params };
  updateConfig(finalOptions);
  success &&
    success({
      data: "更新配置成功"
    });
}
