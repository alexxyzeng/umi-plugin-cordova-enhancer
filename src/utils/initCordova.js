import process from "process";
import childProcess from "child_process";
import fs from "fs";
import path from "path";

function updateGitignore() {
  const gitIgnoreFilePath = path.resolve(process.cwd(), ".gitignore");
  if (!fs.existsSync(gitIgnoreFilePath)) {
    fs.writeFileSync(gitIgnoreFilePath, "", { encoding: "utf-8" });
  }
  let gitIgnoreFile = fs.readFileSync(gitIgnoreFilePath, "utf-8");
  if (!gitIgnoreFile.includes("plugins")) {
    gitIgnoreFile += "\nplugins";
  }
  if (!gitIgnoreFile.includes("platforms")) {
    gitIgnoreFile += "\nplatforms";
  }
  if (!gitIgnoreFile.includes("www")) {
    gitIgnoreFile += "\nwww";
  }
  fs.writeFileSync(gitIgnoreFilePath, gitIgnoreFile);
}

function addCordova() {
  const wwwPath = path.resolve(process.cwd(), "www");
  if (!fs.existsSync(wwwPath)) {
    fs.mkdirSync(wwwPath);
  }
  childProcess.spawnSync("yarn add cordova");
}

function updatePackageJson() {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  if (!packageJsonPath) {
    throw new Error("You have to init your project with package.json");
  }
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  if (!packageJson["scripts"]) {
    packageJson["scripts"] = {};
  }
  const { scripts } = packageJson;
  const cordovaScripts = [
    ["postinstall", "umi cordova_prepare"],
    ["mock:android", "umi build && cordova emulate android"],
    ["run:android", "umi build && cordova run android"],
    ["release:android", "umi build && cordova build android --release"],
    ["mock:ios", "umi build && cordova build ios"]
  ];
  cordovaScripts.forEach(cordovaScript => {
    const [scriptName, scriptCommand] = cordovaScript;
    scripts[scriptName] = scriptCommand;
  });
  packageJson.scripts = { ...scripts };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

export { updateGitignore, addCordova, updatePackageJson };
