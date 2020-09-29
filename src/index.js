// ref:
// - https://umijs.org/plugin/develop.html
// import { IApi } from "umi-types";
import process from "process";
import childProcess from "child_process";
import fs from "fs";
import path from "path";
/**
 *
 * @param {IApi} api
 * @param {*} options
 */
export default function(api, options) {
  // Example: output the webpack config
  api.registerCommand("cordova_init", () => {
    // TODO: 1. 复制build文件夹
    // TODO: 2. 安装cordova
    // TODO: 3. 将platforms/plugins/www添加到gitignore
    // TODO: 4.初始化config.xml
    // TODO: 5 写入package.json命令
    updateGitignore();
    addCordova();
    updatePackageJson();
  });
}

function updateGitignore() {
  const gitIgnoreFilePath = path.resolve(__dirname, ".gitignore");
  if (!fs.existsSync(gitIgnoreFilePath)) {
    fs.writeFileSync(gitIgnoreFilePath, "", { encoding: "utf-8" });
  }
  let gitIgnoreFile = fs.readFileSync(gitIgnoreFilePath, "utf-8");
  if (!gitIgnoreFile.includes("plugins")) {
    gitIgnoreFile += "\nplugins\n";
  }
  if (!gitIgnoreFile.includes("platforms")) {
    gitIgnoreFile += "\nplatforms\n";
  }
  if (!gitIgnoreFile.includes("www")) {
    gitIgnoreFile += "\nwww\n";
  }
  fs.writeFileSync(gitIgnoreFilePath, gitIgnoreFile);
}

function addCordova() {
  const wwwPath = path.resolve(process.cwd(), "www");
  if (!fs.existsSync(wwwPath)) {
    fs.mkdirSync(wwwPath);
  }
  childProcess.execSync("yarn add cordova");
}

function updatePackageJson() {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  if (!packageJsonPath) {
    throw new Error("You have to init your project with package.json");
  }
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  if (!packageJson["script"]) {
    packageJson["script"] = {};
  }
  const { script } = packageJson;
  const cordovaScripts = [
    ["postinstall", "umi cordova_prepare"],
    ["mock:android", "umi build && cordova emulate android"],
    ["run:android", "umi build && cordova run android"],
    ["release:android", "umi build && cordova build android --release"],
    ["mock:ios", "umi build && cordova build ios"]
  ];
  cordovaScripts.forEach(cordovaScript => {
    const [scriptName, scriptCommand] = cordovaScript;
    script[scriptName] = scriptCommand;
  });
  packageJson.script = { ...script };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function updateConfig() {}
