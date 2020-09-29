"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _initCordova = require("./utils/initCordova");

var _config = require("./utils/config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @param {IApi} api
 * @param {*} options
 */
function _default(api, options) {
  // Example: output the webpack config
  api.registerCommand("cordova_init", function () {
    console.log(options, "---- options"); // TODO: 1. 复制build文件夹
    // TODO: 2. 安装cordova
    // TODO: 3. 将platforms/plugins/www添加到gitignore
    // TODO: 4.初始化config.xml
    // TODO: 5 写入package.json命令

    (0, _initCordova.updateGitignore)();
    (0, _initCordova.addCordova)();
    (0, _initCordova.updatePackageJson)();
    updateConfig(options);
  });
}

function updateConfig(options) {
  var configPath = options.configPath,
      config = options.config,
      resPath = options.resPath;
  (0, _config.parseConfig)(_objectSpread(_objectSpread({}, config), {}, {
    configPath: configPath,
    resPath: resPath
  }), configPath);
}