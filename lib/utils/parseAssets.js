"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseIconsAndSplashes = parseIconsAndSplashes;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fs = require("fs");

var path = require("path");

var process = require("process");

function parseIconsAndSplashes(basePath) {
  var iconPath = path.resolve(basePath, "icon");
  var splashPath = path.resolve(basePath, "splash");
  var android = {
    icons: parseAndroidIcons(path.join(iconPath, "/android")),
    splashes: parseAndroidSplashes(path.join(splashPath, "/android"))
  };
  var iOS = {
    icons: parseAppleIcons(path.join(iconPath, "/ios")),
    splashes: parseAppleSplashes(path.join(splashPath, "/ios"))
  };
  return {
    android: android,
    iOS: iOS
  };
}

function parseAndroidIcons(directory) {
  var cwd = process.cwd() + "/";
  var files = fs.readdirSync(directory, "utf-8");
  return files.map(function (file) {
    if (!/.(jpg|jpeg|png)$/.test(file)) {
      return null;
    }

    var density = file.split("-")[2];
    return {
      density: density,
      src: directory.replace(cwd, "") + "/" + file
    };
  }).filter(function (item) {
    return item !== null;
  });
}

function parseAndroidSplashes(directory) {
  var cwd = process.cwd() + "/";
  var files = fs.readdirSync(directory, "utf-8");
  return files.map(function (file) {
    if (!/.(jpg|jpeg|png)$/.test(file)) {
      return null;
    }

    var _file$split = file.split("-"),
        _file$split2 = _slicedToArray(_file$split, 3),
        _ = _file$split2[0],
        orientation = _file$split2[1],
        density = _file$split2[2];

    return {
      density: "".concat(orientation, "-").concat(density.split(".")[0]),
      src: directory.replace(cwd, "") + "/" + file
    };
  }).filter(function (item) {
    return item !== null;
  });
}

function parseAppleIcons(directory) {
  var cwd = process.cwd() + "/";
  var files = fs.readdirSync(directory, "utf-8");
  return files.map(function (file) {
    if (!/.(jpg|jpeg|png)$/.test(file)) {
      return null;
    }

    var _file$split$1$split = file.split("-")[1].split("@"),
        _file$split$1$split2 = _slicedToArray(_file$split$1$split, 2),
        size = _file$split$1$split2[0],
        _file$split$1$split2$ = _file$split$1$split2[1],
        ratio = _file$split$1$split2$ === void 0 ? "1" : _file$split$1$split2$;

    var parsedSize = size.replace(/.(jpg|jpeg|png)$/, "");
    var parseRatio = ratio.slice(0, 1);
    var width = Number(parsedSize) * Number(parseRatio);
    var height = width;
    console.log("====================================");
    console.log(parsedSize, "---- size", _typeof(parsedSize));
    console.log(parseRatio, "---- ratio", _typeof(parseRatio));
    console.log(width, "---- width");
    console.log("====================================");
    return {
      src: directory.replace(cwd, "") + "/" + file,
      width: width,
      height: height
    };
  }).filter(function (item) {
    return item !== null;
  });
}

var splashDict = {
  "Default~iphone": {
    height: 480,
    width: 320
  },
  "Default@2x~iphone": {
    height: 960,
    width: 640
  },
  "Default-Portrait~ipad": {
    height: 1024,
    width: 768
  },
  "Default-Portrait@2x~ipad": {
    height: 2048,
    width: 1536
  },
  "Default-Landscape~ipad": {
    height: 768,
    width: 1024
  },
  "Default-Landscape@2x~ipad": {
    height: 1536,
    width: 2048
  },
  "Default-568h@2x~iphone": {
    height: 1136,
    width: 640
  },
  "Default-667h@2x~iphone": {
    height: 1334,
    width: 750
  },
  "Default-736h@3x~iphone": {
    height: 2208,
    width: 1242
  },
  "Default-Landscape-736h@3x~iphone": {
    height: 1242,
    width: 2208
  },
  "Default-2436h": {
    height: 2436,
    width: 1125
  },
  "Default-Landscape-2436h": {
    height: 1125,
    width: 2436
  }
};

function parseAppleSplashes(directory) {
  var cwd = process.cwd() + "/";
  var files = fs.readdirSync(directory, "utf-8");
  return files.map(function (file) {
    if (!/.(jpg|jpeg|png)$/.test(file)) {
      return null;
    }

    var _file$split3 = file.split("."),
        _file$split4 = _slicedToArray(_file$split3, 1),
        filename = _file$split4[0];

    if (!splashDict[filename]) {
      return null;
    }

    var _splashDict$filename = splashDict[filename],
        height = _splashDict$filename.height,
        width = _splashDict$filename.width;
    return {
      src: directory.replace(cwd, "") + "/" + file,
      height: height,
      width: width
    };
  }).filter(function (item) {
    return item !== null;
  });
}