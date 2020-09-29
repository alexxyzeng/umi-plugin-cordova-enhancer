"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateGitignore = updateGitignore;
exports.addCordova = addCordova;
exports.updatePackageJson = updatePackageJson;

var _process = _interopRequireDefault(require("process"));

var _child_process = _interopRequireDefault(require("child_process"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function updateGitignore() {
  var gitIgnoreFilePath = _path.default.resolve(_process.default.cwd(), ".gitignore");

  if (!_fs.default.existsSync(gitIgnoreFilePath)) {
    _fs.default.writeFileSync(gitIgnoreFilePath, "", {
      encoding: "utf-8"
    });
  }

  var gitIgnoreFile = _fs.default.readFileSync(gitIgnoreFilePath, "utf-8");

  if (!gitIgnoreFile.includes("plugins")) {
    gitIgnoreFile += "\nplugins";
  }

  if (!gitIgnoreFile.includes("platforms")) {
    gitIgnoreFile += "\nplatforms";
  }

  if (!gitIgnoreFile.includes("www")) {
    gitIgnoreFile += "\nwww";
  }

  _fs.default.writeFileSync(gitIgnoreFilePath, gitIgnoreFile);
}

function addCordova() {
  var wwwPath = _path.default.resolve(_process.default.cwd(), "www");

  if (!_fs.default.existsSync(wwwPath)) {
    _fs.default.mkdirSync(wwwPath);
  }

  _child_process.default.spawnSync("yarn add cordova");
}

function updatePackageJson() {
  var packageJsonPath = _path.default.resolve(_process.default.cwd(), "package.json");

  if (!packageJsonPath) {
    throw new Error("You have to init your project with package.json");
  }

  var packageJson = JSON.parse(_fs.default.readFileSync(packageJsonPath, "utf-8"));

  if (!packageJson["scripts"]) {
    packageJson["scripts"] = {};
  }

  var scripts = packageJson.scripts;
  var cordovaScripts = [["postinstall", "umi cordova_prepare"], ["mock:android", "umi build && cordova emulate android"], ["run:android", "umi build && cordova run android"], ["release:android", "umi build && cordova build android --release"], ["mock:ios", "umi build && cordova build ios"]];
  cordovaScripts.forEach(function (cordovaScript) {
    var _cordovaScript = _slicedToArray(cordovaScript, 2),
        scriptName = _cordovaScript[0],
        scriptCommand = _cordovaScript[1];

    scripts[scriptName] = scriptCommand;
  });
  packageJson.scripts = _objectSpread({}, scripts);

  _fs.default.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}