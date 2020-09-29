"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _initCordova = require("./utils/initCordova");

// ref:
// - https://umijs.org/plugin/develop.html
// import { IApi } from "umi-types";

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
  });
}