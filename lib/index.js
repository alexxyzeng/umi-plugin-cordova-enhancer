"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _child_process = _interopRequireDefault(require("child_process"));

var _fs = _interopRequireDefault(require("fs"));

var _initCordova2 = require("./utils/initCordova");

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

var TAG = "org.alexzeng.umi-plugin-cordova-enhance";
var commands = {
  initCordova: function initCordova(options, success, failure) {
    return _initCordova(options, success, failure);
  },
  addIOS: function addIOS(_, success, failure) {
    return updateCordovaPlatform({
      _: ["add", "ios"],
      platform: true
    }, success, failure);
  },
  addAndroid: function addAndroid(_, success, failure) {
    return updateCordovaPlatform({
      _: ["add", "android"],
      platform: true
    }, success, failure);
  },
  removeIOS: function removeIOS(_, success, failure) {
    return updateCordovaPlatform({
      _: ["remove", "ios"],
      platform: true
    }, success, failure);
  },
  removeAndroid: function removeAndroid(_, success, failure) {
    return updateCordovaPlatform({
      _: ["remove", "android"],
      platform: true
    }, success, failure);
  },
  getCordovaInfo: function getCordovaInfo(_, success, failure) {
    getCordovaDetails(_, success, failure);
  },
  debugIOS: function debugIOS(_, success, failure) {
    runAppInUI("mock:ios", success, failure);
  },
  debugAndroid: function debugAndroid(_, success, failure) {
    runAppInUI("mock:android", success, failure);
  },
  runRealAndroid: function runRealAndroid(_, success, failure) {
    runAppInUI("run:android", success, failure);
  },
  releaseIOS: function releaseIOS(_, success, failure) {
    failure({
      message: "当前功能未实现"
    });
  },
  releaseAndroid: function releaseAndroid(options, success, failure) {
    releaseAndroidApp(options, success, failure);
  }
};
/**
 *
 * @param {IApi} api
 * @param {*} options
 */

function _default(api, options) {
  api.addUIPlugin(require.resolve("../dist/index.umd"));
  api.onUISocket(function (_ref) {
    var action = _ref.action,
        failure = _ref.failure,
        success = _ref.success;
    var type = action.type;

    if (!type.startsWith(TAG)) {
      failure({
        message: "输入的指令不正确"
      });
      return;
    }

    var parsedAction = type.replace("".concat(TAG, "."), "");
    var command = commands[parsedAction];

    if (!command) {
      failure({
        message: "未找到对应的指令"
      });
    }

    command(options, success, failure);
  });
  api.modifyDefaultConfig(function (config) {
    return _objectSpread(_objectSpread({}, config), {}, {
      outputPath: "www"
    });
  });
  api.registerCommand("cordova", function (args) {
    if (api.config.outputPath !== "www") {
      console.log(_chalk.default.blue("To develop a cordova based app, you need to specify " + _chalk.default.green("outputPath") + " to " + _chalk.default.yellow("www") + " in the " + _chalk.default.underline.red("config.xml")));
      return;
    }

    if (args.init) {
      return _initCordova(options);
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

    return runApp(args);
  });
}

function _initCordova(options, success) {
  updateConfig(options);
  (0, _initCordova2.addCordova)();
  (0, _initCordova2.updateGitignore)();
  (0, _initCordova2.updatePackageJson)(options);
  success && success({
    data: "初始化Cordova成功"
  });
}

function updateCordovaPlatform(args, success, failure) {
  var list = _child_process.default.execSync("cordova platform ls") + "";
  var installedPlatforms = list.slice(0, list.indexOf("Available platforms")); // TODO: 在安装前检查对应的platform是否已存在

  var _ref2 = args._ || [],
      _ref3 = _slicedToArray(_ref2, 2),
      _ref3$ = _ref3[0],
      action = _ref3$ === void 0 ? "add" : _ref3$,
      _ref3$2 = _ref3[1],
      platform = _ref3$2 === void 0 ? "ios" : _ref3$2;

  if (action === "add" && installedPlatforms.includes(platform)) {
    console.log("The platform " + _chalk.default.yellow(platform) + " you want to add is already added");
    failure && failure({
      message: "\u8981\u6DFB\u52A0\u7684platform: ".concat(platform, ", \u5DF2\u5B58\u5728")
    });
    return;
  }

  if (action === "remove" && !installedPlatforms.includes(platform)) {
    console.log("The platform " + _chalk.default.yellow(platform) + " you want to remove is not added");
    failure && failure({
      message: "\u8981\u79FB\u9664\u7684platform: ".concat(platform, "\u4E0D\u5B58\u5728")
    });
    return;
  }

  try {
    _child_process.default.execSync("cordova platform ".concat(action, " ").concat(platform));

    console.log("The platform " + _chalk.default.yellow(platform) + " is successfully added");
    success && success({
      data: "\u66F4\u65B0platform: ".concat(platform, "\u6210\u529F")
    });
  } catch (err) {
    console.log(_chalk.default.bgCyan(err));
    failure && failure({
      message: "\u66F4\u65B0platform: ".concat(platform, "\u5931\u8D25, \u9519\u8BEF\u4FE1\u606F\u4E3A: ").concat(err === null || err === void 0 ? void 0 : err.message)
    });
  }
}

function updateCordovaPlugin(args, success, failure) {
  var _ref4 = args._ || [],
      _ref5 = _slicedToArray(_ref4, 2),
      action = _ref5[0],
      plugin = _ref5[1];

  if (!action || !plugin) {
    // TODO: 错误提示
    failure && failure({
      message: "\u672A\u6307\u5B9Aadd/remove\u6216\u8005plugin\u540D\u79F0, \u5F53\u524D\u64CD\u4F5C\u4E3A".concat(action, ", \u5F53\u524Dplugin\u540D\u79F0\u4E3A").concat(plugin)
    });
    return;
  }

  _child_process.default.execSync("cordova plugin ".concat(action, " ").concat(plugin, " && cordova plugin save"));

  success && success({
    data: "\u66F4\u65B0\u63D2\u4EF6".concat(plugin, "\u6210\u529F")
  });
}

function prepareCorodva(args, success, failure) {
  _child_process.default.execSync("cordova prepare --color");

  success && success({
    data: "恢复Cordova信息成功"
  });
}

function runApp(args) {
  var _ref6 = args._ || [],
      _ref7 = _slicedToArray(_ref6, 2),
      action = _ref7[0],
      platform = _ref7[1];

  if (!action || !platform) {
    return;
  }

  _child_process.default.execSync("cordova ".concat(action, " ").concat(platform));
}

function runAppInUI(args, success, failure) {
  _child_process.default.execSync("yarn ".concat(args));

  success && success({
    data: "启动成功"
  });
}

function releaseApp(args, options) {
  var _ref8 = args._ || [],
      _ref9 = _slicedToArray(_ref8, 1),
      platform = _ref9[0];

  if (!platform) {
    return;
  }

  if (platform === "android") {
    return releaseAndroidApp(options);
  } else if (platform === "ios") {
    releaseiOSApp(options);
  }
}

function releaseAndroidApp(options, success, failure) {
  _child_process.default.execSync("cordova build android --release");

  success && success({
    data: "Release成功"
  });
  var apkOutputPath = options.apkOutputPath;

  if (!apkOutputPath) {
    return;
  }

  if (!_fs.default.existsSync(apkOutputPath)) {
    _fs.default.mkdirSync(apkOutputPath);
  }

  _child_process.default.execSync("cp platforms/android/app/build/outputs/apk/release/app-release*.apk ".concat(apkOutputPath, "/app-release.apk"));
}

function releaseiOSApp(_, success, failure) {
  _child_process.default.execSync("cordova build ios && fastlane beta");
}

function getCordovaDetails(_, success, failure) {
  var platforms = _child_process.default.execSync("cordova platform ls") + "";
  var installedPlatforms = platforms.slice(0, platforms.indexOf("Available platforms")).replace(/Installed platforms:|\n/g, "").split(" ").filter(function (item) {
    return item !== "";
  });
  var plugins = (_child_process.default.execSync("cordova plugin ls") + "").replace(/\n/g, "").split('"').filter(function (item) {
    return item !== "";
  });
  success && success({
    data: {
      platforms: installedPlatforms,
      plugins: plugins
    }
  });
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