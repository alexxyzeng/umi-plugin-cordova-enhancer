"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseConfig = parseConfig;
exports.getConfig = getConfig;
exports.updateConfig = updateConfig;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _xml2json = _interopRequireDefault(require("xml2json"));

var _xmlFormatter = _interopRequireDefault(require("xml-formatter"));

var _parseAssets = require("./parseAssets");

var _parsePermissions = require("./parsePermissions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseConfig(options, baseConfigPath) {
  console.log(options, "--- options");
  baseConfigPath = baseConfigPath || _path.default.resolve(__dirname, "..", "config-base.xml");

  var baseXml = _fs.default.readFileSync(baseConfigPath, "utf-8");

  var config = JSON.parse(_xml2json.default.toJson(baseXml, {
    reversible: true
  }));
  var widget = config.widget;
  var finalWidget = writePermissions(writeIconsAndSplashes(writeInfos(widget, options), options), options);

  _fs.default.writeFileSync(options.configPath, (0, _xmlFormatter.default)(_xml2json.default.toXml(_objectSpread(_objectSpread({}, config), {}, {
    widget: finalWidget
  }))));
}

function writeIconsAndSplashes(widget, _ref) {
  var resPath = _ref.resPath;

  var parsedPath = _path.default.resolve(resPath);

  var res = (0, _parseAssets.parseIconsAndSplashes)(parsedPath);

  var platform = widget.platform,
      restConfig = _objectWithoutProperties(widget, ["platform"]);

  var resAndroid = res.android,
      resApple = res.iOS;
  var parsedPlatforms = [];
  var resList = [resAndroid, resApple];
  var dirName = process.cwd();
  resList.forEach(function (_ref2, index) {
    var icons = _ref2.icons,
        splashes = _ref2.splashes;
    var targetPlatform = platform[index];
    targetPlatform.icon = icons;
    targetPlatform.splash = splashes;
    parsedPlatforms.push(targetPlatform);
  });
  return _objectSpread(_objectSpread({}, restConfig), {}, {
    platform: parsedPlatforms
  });
}

function writePermissions(widget, _ref3) {
  var config = _ref3.config;
  var permissions = config.permissions;
  var permissionList = (0, _parsePermissions.parsePermissions)(permissions);

  var platform = widget.platform,
      restConfig = _objectWithoutProperties(widget, ["platform"]);

  var platformIOS = platform[1];

  if (!platformIOS["config-file"]) {
    platformIOS["config-file"] = [];
  }

  permissionList.forEach(function (permission) {
    var permissionType = permission.permissionType,
        desc = permission.desc,
        parent = permission.parent;

    if (permissionType === "config-file") {
      platformIOS["config-file"].push({
        parent: parent,
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
  return _objectSpread(_objectSpread({}, restConfig), {}, {
    platform: platform
  });
}

function writeInfos(widget, options) {
  var finalWidget = _objectSpread({}, widget);

  var _options$locale = options.locale,
      locale = _options$locale === void 0 ? "zh_CN" : _options$locale,
      id = options.id,
      version = options.version,
      name = options.name,
      description = options.description,
      author = options.author,
      allowNavigation = options.allowNavigation,
      allowIntent = options.allowIntent,
      targetDevice = options.targetDevice,
      prefs = options.prefs;
  var preference = widget.preference;
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
    finalWidget["allow-navigation"] = {
      href: allowNavigation
    };
  }

  if (author) {
    var email = author.email,
        href = author.href,
        authorName = author.name;
    finalWidget.author = {
      email: email,
      href: href,
      $t: authorName
    };
  }

  if (Array.isArray(allowIntent)) {
    finalWidget["allow-intent"] = allowIntent.filter(function (item) {
      return item !== null || item !== undefined;
    }).map(function (item) {
      return {
        href: item
      };
    });
  }

  if (prefs) {
    var prefList = [];

    for (var prefKey in prefs) {
      prefList.push({
        key: prefKey,
        value: prefs[prefKey]
      });
    }

    finalWidget["preference"] = prefList;
  }

  return finalWidget;
}

function getConfig(options) {
  var configPath = options.configPath;

  if (!_fs.default.existsSync(configPath)) {
    _fs.default.writeFileSync(configPath, "");
  }

  var configXml = _fs.default.readFileSync(configPath, "utf-8");

  var widget = JSON.parse(_xml2json.default.toJson(configXml, {
    reversible: true
  }));
  return widget;
}

function updateConfig(options) {
  var config = options.config,
      configPath = options.configPath;

  var _getConfig = getConfig(options),
      widget = _getConfig.widget;

  var finalConfig = writeInfos(widget || {}, config);

  _fs.default.writeFileSync(configPath, (0, _xmlFormatter.default)(_xml2json.default.toXml({
    widget: finalConfig
  })));
}