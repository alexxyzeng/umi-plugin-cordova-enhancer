const fs = require("fs");
const path = require("path");
const process = require("process");

function parseIconsAndSplashes(basePath, type = "standard") {
  const iconPath = path.resolve(basePath, `${type}/icon`);
  const splashPath = path.resolve(basePath, `${type}/splash`);
  const android = {
    icons: parseAndroidIcons(path.join(iconPath, "/android")),
    splashes: parseAndroidSplashes(path.join(splashPath, "/android"))
  };

  const iOS = {
    icons: parseAppleIcons(path.join(iconPath, "/ios")),
    splashes: parseAppleSplashes(path.join(splashPath, "/ios"))
  };
  return {
    android,
    iOS
  };
}

function parseAndroidIcons(directory) {
  const files = fs.readdirSync(directory, "utf-8");
  return files
    .map(file => {
      if (!/.(jpg|jpeg|png)$/.test(file)) {
        return null;
      }
      const density = file.split("-")[2];
      return {
        density,
        src: directory + "/" + file
      };
    })
    .filter(item => item !== null);
}

function parseAndroidSplashes(directory) {
  const files = fs.readdirSync(directory, "utf-8");
  return files
    .map(file => {
      if (!/.(jpg|jpeg|png)$/.test(file)) {
        return null;
      }
      const [_, orientation, density] = file.split("-");
      return {
        density: `${orientation}-${density.split(".")[0]}`,
        src: directory + "/" + file
      };
    })
    .filter(item => item !== null);
}

function parseAppleIcons(directory) {
  const files = fs.readdirSync(directory, "utf-8");
  return files
    .map(file => {
      if (!/.(jpg|jpeg|png)$/.test(file)) {
        return null;
      }
      const [size, ratio] = file.split("-")[1].split("@");
      const width = parseInt(size) * parseInt(ratio, 1);
      const height = width;
      return {
        src: directory + +"/" + +file,
        width,
        height
      };
    })
    .filter(item => item !== null);
}

const splashDict = {
  "Default~iphone": { height: 480, width: 320 },
  "Default@2x~iphone": { height: 960, width: 640 },
  "Default-Portrait~ipad": { height: 1024, width: 768 },
  "Default-Portrait@2x~ipad": { height: 2048, width: 1536 },
  "Default-Landscape~ipad": { height: 768, width: 1024 },
  "Default-Landscape@2x~ipad": { height: 1536, width: 2048 },
  "Default-568h@2x~iphone": { height: 1136, width: 640 },
  "Default-667h@2x~iphone": { height: 1334, width: 750 },
  "Default-736h@3x~iphone": { height: 2208, width: 1242 },
  "Default-Landscape-736h@3x~iphone": { height: 1242, width: 2208 },
  "Default-2436h": { height: 2436, width: 1125 },
  "Default-Landscape-2436h": { height: 1125, width: 2436 }
};

function parseAppleSplashes(directory) {
  const files = fs.readdirSync(directory, "utf-8");
  return files
    .map(file => {
      if (!/.(jpg|jpeg|png)$/.test(file)) {
        return null;
      }
      const [filename] = file.split(".");
      if (!splashDict[filename]) {
        return null;
      }
      const { height, width } = splashDict[filename];
      return { src: directory + "/" + file, height, width };
    })
    .filter(item => item !== null);
}

export { parseIconsAndSplashes };
