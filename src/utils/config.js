import fs from "fs";
import path from "path";
import parser from "xml2json";
import format from "xml-formatter";
import { parseIconsAndSplashes } from "./parseAssets";
import { parsePermissions } from "./parsePermissions";

function parseConfig(options, baseConfigPath) {
  baseConfigPath =
    baseConfigPath || path.resolve(__dirname, "..", "config-base.xml");
  const baseXml = fs.readFileSync(baseConfigPath, "utf-8");
  const config = JSON.parse(parser.toJson(baseXml, { reversible: true }));
  const { widget } = config;
  const finalWidget = writePermissions(
    writeIconsAndSplashes(writeInfos(widget, options), options),
    options
  );
  fs.writeFileSync(
    options.configPath,
    format(parser.toXml({ ...config, widget: finalWidget }))
  );
}

function writeIconsAndSplashes(widget, { resPath }) {
  const parsedPath = path.resolve(resPath);
  const res = parseIconsAndSplashes(parsedPath);
  const { platform, ...restConfig } = widget;
  const { android: resAndroid, iOS: resApple } = res;
  const parsedPlatforms = [];
  const resList = [resAndroid, resApple];
  const dirName = process.cwd();
  resList.forEach(({ icons, splashes }, index) => {
    const targetPlatform = platform[index];
    targetPlatform.icon = icons;
    targetPlatform.splash = splashes;
    parsedPlatforms.push(targetPlatform);
  });
  return {
    ...restConfig,
    platform: parsedPlatforms
  };
}

function writePermissions(widget, { permissions }) {
  const permissionList = parsePermissions(permissions);
  const { platform, ...restConfig } = widget;
  const platformIOS = platform[1];
  if (!platformIOS["config-file"]) {
    platformIOS["config-file"] = [];
  }
  permissionList.forEach(permission => {
    const { permissionType, desc, parent } = permission;
    if (permissionType === "config-file") {
      platformIOS["config-file"].push({
        parent,
        platform: "ios",
        target: "*-Info.plist",
        string: {
          $t: desc
        }
      });
    }
    if (permissionType === "edit-config") {
      platformIOS["edit-config"] = {
        file: "*-Info.plist",
        mode: "merge",
        target: parent,
        string: {
          $t: desc
        }
      };
    }
  });
  platform[1] = platformIOS;
  return {
    ...restConfig,
    platform
  };
}

function writeInfos(widget, options) {
  const finalWidget = { ...widget };
  const {
    locale = "zh_CN",
    id,
    version,
    name,
    description,
    author: { email, href, name: authorName }
  } = options;
  finalWidget.defaultLocale = locale;
  finalWidget.id = id;
  finalWidget.version = version;
  finalWidget.name["$t"] = name;
  finalWidget.description["$t"] = description;
  finalWidget.author = {
    email,
    href,
    $t: authorName
  };
  return finalWidget;
}

export { parseConfig };
