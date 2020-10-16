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

function writePermissions(widget, { config }) {
  const { permissions } = config;
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

function writeInfos(widget, { config: options }) {
  const finalWidget = { ...widget };
  const {
    locale = "zh_CN",
    id,
    version,
    name,
    description,
    author,
    allowNavigation,
    allowIntent,
    targetDevice,
    prefs
  } = options;
  const { preference } = widget;
  finalWidget.defaultLocale = locale;
  finalWidget.id = id;
  finalWidget.version = version;
  if (!finalWidget.name) {
    finalWidget.name = {};
  }
  finalWidget.name["$t"] = name || "";
  if (!finalWidget.description) {
    finalWidget.description = {};
  }
  finalWidget.description["$t"] = description || "";
  finalWidget.description["$t"] = description || "";
  if (allowNavigation) {
    finalWidget["allow-navigation"] = { href: allowNavigation };
  }
  if (author) {
    const { email, href, name: authorName } = author;
    finalWidget.author = {
      email,
      href,
      $t: authorName
    };
  }
  if (Array.isArray(allowIntent)) {
    finalWidget["allow-intent"] = allowIntent
      .filter(item => {
        return item !== null || item !== undefined;
      })
      .map(item => {
        return {
          href: item
        };
      });
  }
  if (prefs) {
    let prefList = [];
    for (let prefKey in prefs) {
      prefList.push({
        name: prefKey,
        value: prefs[prefKey]
      });
    }
    finalWidget["preference"] = prefList;
  }
  return finalWidget;
}

function getConfig(options) {
  const { configPath } = options;
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, "");
  }
  const configXml = fs.readFileSync(configPath, "utf-8");
  const widget = JSON.parse(parser.toJson(configXml, { reversible: true }));
  return widget;
}

function updateConfig(options) {
  const { config, configPath } = options;
  const { widget } = getConfig(options);
  const finalConfig = writeInfos(widget || {}, config);
  fs.writeFileSync(configPath, format(parser.toXml({ widget: finalConfig })));
}

export { parseConfig, getConfig, updateConfig };
