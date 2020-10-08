(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('antd')) :
  typeof define === 'function' && define.amd ? define(['react', 'antd'], factory) :
  (global = global || self, global['umi-plugin-cordova-ui'] = factory(global.React, global.antd));
}(this, (function (React, antd) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var TAG = "org.alexzeng.umi-plugin-cordova-enhance";
  var index = (function (api) {
    function CommandPanel() {
      return /*#__PURE__*/React.createElement(antd.Card, {
        title: "Cordova\u76F8\u5173\u914D\u7F6E\u547D\u4EE4"
      }, /*#__PURE__*/React.createElement(antd.Row, null, /*#__PURE__*/React.createElement("h2", null, "Cordova\u5B89\u88C5")), /*#__PURE__*/React.createElement(antd.Row, null, /*#__PURE__*/React.createElement(antd.Button, {
        type: "primary",
        onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _yield$api$callRemote, data;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return api.callRemote({
                    type: "".concat(TAG, ".initCordova")
                  });

                case 3:
                  _yield$api$callRemote = _context.sent;
                  data = _yield$api$callRemote.data;
                  antd.message.success(data);
                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](0);
                  antd.message.error(_context.t0.message);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 8]]);
        }))
      }, "\u521D\u59CB\u5316Cordova\u73AF\u5883")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(antd.Row, null, /*#__PURE__*/React.createElement("h2", null, "\u914D\u7F6EApp\u5E73\u53F0\u4FE1\u606F")), /*#__PURE__*/React.createElement(antd.Row, null, /*#__PURE__*/React.createElement(antd.Col, {
        span: 2
      }, /*#__PURE__*/React.createElement(antd.Button, {
        type: "primary",
        onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var _yield$api$callRemote2, data;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return api.callRemote({
                    type: "".concat(TAG, ".addIOS")
                  });

                case 3:
                  _yield$api$callRemote2 = _context2.sent;
                  data = _yield$api$callRemote2.data;
                  antd.message.success(data);
                  _context2.next = 11;
                  break;

                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2["catch"](0);
                  antd.message.error(_context2.t0.message);

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[0, 8]]);
        }))
      }, "\u914D\u7F6EiOS\u5E73\u53F0")), /*#__PURE__*/React.createElement(antd.Col, {
        span: 2
      }, /*#__PURE__*/React.createElement(antd.Button, {
        type: "ghost",
        onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var _yield$api$callRemote3, data;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return api.callRemote({
                    type: "".concat(TAG, ".removeIOS")
                  });

                case 3:
                  _yield$api$callRemote3 = _context3.sent;
                  data = _yield$api$callRemote3.data;
                  antd.message.success(data);
                  _context3.next = 11;
                  break;

                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3["catch"](0);
                  antd.message.error(_context3.t0.message);

                case 11:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[0, 8]]);
        }))
      }, "\u79FB\u9664iOS\u5E73\u53F0")), /*#__PURE__*/React.createElement(antd.Col, {
        span: 3,
        push: 2
      }, /*#__PURE__*/React.createElement(antd.Button, {
        type: "primary",
        onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var _yield$api$callRemote4, data;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return api.callRemote({
                    type: "".concat(TAG, ".addAndroid")
                  });

                case 3:
                  _yield$api$callRemote4 = _context4.sent;
                  data = _yield$api$callRemote4.data;
                  antd.message.success(data);
                  _context4.next = 11;
                  break;

                case 8:
                  _context4.prev = 8;
                  _context4.t0 = _context4["catch"](0);
                  antd.message.error(_context4.t0.message);

                case 11:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[0, 8]]);
        }))
      }, "\u914D\u7F6EAndroid\u5E73\u53F0")), /*#__PURE__*/React.createElement(antd.Col, {
        span: 3,
        push: 2
      }, /*#__PURE__*/React.createElement(antd.Button, {
        type: "ghost",
        onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          var _yield$api$callRemote5, data;

          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return api.callRemote({
                    type: "".concat(TAG, ".removeAndroid")
                  });

                case 3:
                  _yield$api$callRemote5 = _context5.sent;
                  data = _yield$api$callRemote5.data;
                  antd.message.success(data);
                  _context5.next = 11;
                  break;

                case 8:
                  _context5.prev = 8;
                  _context5.t0 = _context5["catch"](0);
                  antd.message.error(_context5.t0.message);

                case 11:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, null, [[0, 8]]);
        }))
      }, "\u79FB\u9664Android\u5E73\u53F0"))));
    }

    api.addPanel({
      title: "Cordova相关命令",
      path: "/cordova-commands",
      icon: "home",
      component: CommandPanel
    });
  });

  return index;

})));
