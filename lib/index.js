"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _child_process = _interopRequireDefault(require("child_process"));

var _initCordova = require("./utils/initCordova");

var _config = require("./utils/config");

var _process = require("process");

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @param {IApi} api
 * @param {*} options
 */
function _default(api, options) {
  api.modifyDefaultConfig(function (config) {
    return _objectSpread(_objectSpread({}, config), {}, {
      outputPath: "www"
    });
  }); // TODO: 修改默认配置

  api.registerCommand("cordova", function (args) {
    if (api.config.outputPath !== "www") {
      console.log(_chalk.default.blue("To develop a cordova based app, you need to specify " + _chalk.default.green("outputPath") + " to " + _chalk.default.yellow("www") + " in the " + _chalk.default.underline.red("config.xml")));
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
      return releaseAndroidApp(args);
    }

    return updateCordovaPlugin(args);
  });
}

function initCordova(options) {
  (0, _initCordova.addCordova)();
  (0, _initCordova.updateGitignore)();
  (0, _initCordova.updatePackageJson)(options);
  updateConfig(options);
}

function updateCordovaPlatform(args) {
  // TODO: 在安装前检查对应的platform是否已存在
  var _ref = args._ || [],
      _ref2 = _slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      action = _ref2$ === void 0 ? "add" : _ref2$,
      _ref2$2 = _ref2[1],
      platform = _ref2$2 === void 0 ? "ios" : _ref2$2;

  _child_process.default.execSync("cordova platform ".concat(action, " ").concat(platform));
}

function updateCordovaPlugin(args) {
  var _ref3 = args._ || [],
      _ref4 = _slicedToArray(_ref3, 2),
      action = _ref4[0],
      plugin = _ref4[1];

  if (!action || !plugin) {
    // TODO: 错误提示
    return;
  }

  _child_process.default.execSync("cordova plugin ".concat(action, " ").concat(plugin, " && cordova plugin save"));
}

function prepareCorodva() {
  _child_process.default.execSync("cordova prepare --color");
}

function runApp(args) {
  var _ref5 = args._ || [],
      _ref6 = _slicedToArray(_ref5, 2),
      action = _ref6[0],
      platform = _ref6[1];

  if (!action || !platform) {
    return;
  }

  _child_process.default.execSync("cordova ".concat(action, " ").concat(platform));
}

function releaseApp(args) {
  var _ref7 = args._ || [],
      _ref8 = _slicedToArray(_ref7, 1),
      platform = _ref8[0];

  if (!platform) {
    return;
  }

  if (platform === "android") {
    return releaseAndroidApp();
  } else if (platform === "ios") {
    releaseiOSApp();
  }
}

function releaseAndroidApp() {
  _child_process.default.execSync("cordova build android --release"); // TODO: 移动App到指定位置

}

function releaseiOSApp() {
  _child_process.default.execSync("cordova build ios && fastlane beta");
} // TODO: 初始化iOS ci环境


function updateConfig(options, baseConfigPath) {
  var configPath = options.configPath,
      config = options.config,
      resPath = options.resPath;
  (0, _config.parseConfig)(_objectSpread(_objectSpread({}, config), {}, {
    configPath: configPath,
    resPath: resPath
  }), baseConfigPath);
}