"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseConfig(options, outputPath) {
  var baseXml = fs.readFileSync(defaultOptions.baseConfigPath, "utf-8");
  var config = JSON.parse(parser.toJson(baseXml, {
    reversible: true
  }));
  var widget = config.widget;
  var finalWidget = writePermissions(writeIconsAndSplashes(writeInfos(widget, options), options), options);
  fs.writeFileSync(outputPath || options.configPath, format(parser.toXml(_objectSpread(_objectSpread({}, config), {}, {
    widget: finalWidget
  }))));
}

function writeIconsAndSplashes(widget, _ref) {
  var resPath = _ref.resPath,
      env = _ref.env;
  var parsedPath = path.resolve(resPath);
  var res = parseIconsAndSplashes(parsedPath, env);

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
  var permissions = _ref3.permissions;
  var permissionList = parsePermissions(permissions);

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
      _options$author = options.author,
      email = _options$author.email,
      href = _options$author.href,
      authorName = _options$author.name;
  finalWidget.defaultLocale = locale;
  finalWidget.id = id;
  finalWidget.version = version;
  finalWidget.name["$t"] = name;
  finalWidget.description["$t"] = description;
  finalWidget.author = {
    email: email,
    href: href,
    $t: authorName
  };
  return finalWidget;
}