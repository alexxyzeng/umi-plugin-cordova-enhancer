(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('antd')) :
  typeof define === 'function' && define.amd ? define(['react', 'antd'], factory) :
  (global = global || self, global['umi-plugin-cordova-ui'] = factory(global.React, global.antd));
}(this, (function (React, antd) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var TAG = "org.alexzeng.umi-plugin-cordova-enhance";

  function CordovaStatusPanel(_ref) {
    var api = _ref.api;

    var _useState = React.useState(""),
        _useState2 = _slicedToArray(_useState, 2),
        platforms = _useState2[0],
        setPlatforms = _useState2[1];

    var _useState3 = React.useState(""),
        _useState4 = _slicedToArray(_useState3, 2),
        plugins = _useState4[0],
        setPlugins = _useState4[1];

    React.useEffect(function () {
      var getInfo = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _yield$api$callRemote, data, platforms, plugins;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return api.callRemote({
                    type: "".concat(TAG, ".getCordovaInfo")
                  });

                case 2:
                  _yield$api$callRemote = _context.sent;
                  data = _yield$api$callRemote.data;
                  platforms = data.platforms, plugins = data.plugins;
                  setPlatforms(platforms);
                  setPlugins(plugins);

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function getInfo() {
          return _ref2.apply(this, arguments);
        };
      }();

      getInfo();
    });
    return /*#__PURE__*/React__default.createElement(antd.Card, {
      title: "Cordova\u72B6\u6001"
    }, /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement("h3", null, "Cordova\u5E73\u53F0\u72B6\u6001")), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement("div", null, platforms)), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement("h3", null, "Cordova\u63D2\u4EF6\u72B6\u6001")), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement("div", null, plugins)));
  }

  function CordovaCommandPanel(_ref) {
    var api = _ref.api;
    return /*#__PURE__*/React__default.createElement(antd.Card, {
      title: "Cordova\u76F8\u5173\u914D\u7F6E\u547D\u4EE4"
    }, /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement("h3", null, "Cordova\u5B89\u88C5")), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement(antd.Button, {
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
    }, "\u521D\u59CB\u5316Cordova\u73AF\u5883")), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement("h3", null, "\u914D\u7F6EApp\u5E73\u53F0\u4FE1\u606F")), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement(antd.Col, {
      span: 3
    }, /*#__PURE__*/React__default.createElement(antd.Button, {
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
    }, "\u914D\u7F6EiOS\u5E73\u53F0")), /*#__PURE__*/React__default.createElement(antd.Col, {
      span: 3
    }, /*#__PURE__*/React__default.createElement(antd.Button, {
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
    }, "\u79FB\u9664iOS\u5E73\u53F0")), /*#__PURE__*/React__default.createElement(antd.Col, {
      span: 3,
      push: 2
    }, /*#__PURE__*/React__default.createElement(antd.Button, {
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
    }, "\u914D\u7F6EAndroid\u5E73\u53F0")), /*#__PURE__*/React__default.createElement(antd.Col, {
      span: 3,
      push: 2
    }, /*#__PURE__*/React__default.createElement(antd.Button, {
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
    }, "\u79FB\u9664Android\u5E73\u53F0"))), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement("h3", null, "Cordova\u5176\u4ED6\u547D\u4EE4")), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement(antd.Col, {
      span: 3
    }, /*#__PURE__*/React__default.createElement(antd.Button, {
      type: "ghost",
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _yield$api$callRemote6, data;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return api.callRemote({
                  type: "".concat(TAG, ".debugIOS")
                });

              case 3:
                _yield$api$callRemote6 = _context6.sent;
                data = _yield$api$callRemote6.data;
                antd.message.success(data);
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                antd.message.error(_context6.t0.message);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 8]]);
      }))
    }, "\u8C03\u8BD5iOS")), /*#__PURE__*/React__default.createElement(antd.Col, {
      span: 3
    }, /*#__PURE__*/React__default.createElement(antd.Button, {
      type: "ghost",
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _yield$api$callRemote7, data;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return api.callRemote({
                  type: "".concat(TAG, ".debugAndroid")
                });

              case 3:
                _yield$api$callRemote7 = _context7.sent;
                data = _yield$api$callRemote7.data;
                antd.message.success(data);
                _context7.next = 11;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                antd.message.error(_context7.t0.message);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 8]]);
      }))
    }, "\u8C03\u8BD5Android")), /*#__PURE__*/React__default.createElement(antd.Col, {
      span: 3
    }, /*#__PURE__*/React__default.createElement(antd.Button, {
      type: "primary",
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _yield$api$callRemote8, data;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return api.callRemote({
                  type: "".concat(TAG, ".runRealAndroid")
                });

              case 3:
                _yield$api$callRemote8 = _context8.sent;
                data = _yield$api$callRemote8.data;
                antd.message.success(data);
                _context8.next = 11;
                break;

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](0);
                antd.message.error(_context8.t0.message);

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 8]]);
      }))
    }, "\u8FD0\u884CAndroid"))), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement(antd.Col, {
      span: 3
    }, /*#__PURE__*/React__default.createElement(antd.Button, {
      type: "primary",
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _yield$api$callRemote9, data;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return api.callRemote({
                  type: "".concat(TAG, ".releaseIOS")
                });

              case 3:
                _yield$api$callRemote9 = _context9.sent;
                data = _yield$api$callRemote9.data;
                antd.message.success(data);
                _context9.next = 11;
                break;

              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](0);
                antd.message.error(_context9.t0.message);

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 8]]);
      }))
    }, "\u53D1\u5E03iOS")), /*#__PURE__*/React__default.createElement(antd.Col, {
      span: 3
    }, /*#__PURE__*/React__default.createElement(antd.Button, {
      type: "primary",
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var _yield$api$callRemote10, data;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return api.callRemote({
                  type: "".concat(TAG, ".releaseAndroid")
                });

              case 3:
                _yield$api$callRemote10 = _context10.sent;
                data = _yield$api$callRemote10.data;
                antd.message.success(data);
                _context10.next = 11;
                break;

              case 8:
                _context10.prev = 8;
                _context10.t0 = _context10["catch"](0);
                antd.message.error(_context10.t0.message);

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 8]]);
      }))
    }, "\u53D1\u5E03Android"))));
  }

  function Configuration(_ref) {
    var api = _ref.api;

    var _Form$useForm = antd.Form.useForm(),
        _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
        form = _Form$useForm2[0];

    var TwoColumnPanel = api.TwoColumnPanel,
        Field = api.Field;
    return /*#__PURE__*/React__default.createElement(antd.Card, {
      title: "\u914D\u7F6EConfig.xml",
      style: {
        overflowY: "scroll"
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      style: {
        overflowY: "scroll",
        maxHeight: 1000
      }
    }, /*#__PURE__*/React__default.createElement(antd.Form, {
      form: form,
      onFinish: function onFinish(values) {
        console.log("values ----", values);
      }
    }, /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "id",
      label: "App Id",
      type: "string"
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "version",
      label: "App \u7248\u672C\u53F7",
      type: "string"
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "name",
      label: "App \u540D\u79F0",
      type: "string"
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "allow-intent",
      label: "allow-intent",
      type: "string[]"
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "author.email",
      label: "\u4F5C\u8005\u90AE\u7BB1",
      type: "string"
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "author.href",
      label: "\u4F5C\u8005\u76F8\u5173\u94FE\u63A5",
      type: "string"
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "author.name",
      label: "\u4F5C\u8005\u540D\u79F0",
      type: "string"
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "allow-navigation",
      label: "allow-navigation",
      type: "string"
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "preference.Orientation",
      label: "Orientation",
      type: "list",
      options: ["default", "landscape", "portrait"]
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "preference.target-device",
      label: "\u8BBE\u5907\u7C7B\u578B",
      type: "list",
      options: ["universal", "handset", "tablet"]
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "preference.FullScreen",
      label: "\u662F\u5426\u5168\u5C4F",
      type: "boolean"
    }), /*#__PURE__*/React__default.createElement(Field, {
      form: form,
      name: "other",
      label: "\u5176\u4ED6\u914D\u7F6E",
      type: "any"
    }), /*#__PURE__*/React__default.createElement(antd.Form.Item, {
      shouldUpdate: true
    }, function (_ref2) {
      var getFieldsValue = _ref2.getFieldsValue;
      return /*#__PURE__*/React__default.createElement("pre", null, JSON.stringify(getFieldsValue(), null, 2));
    }), /*#__PURE__*/React__default.createElement(antd.Button, {
      htmlType: "submit"
    }, "Submit"))));
  }

  var index = (function (api) {
    api.addPanel({
      title: "Cordova相关命令",
      path: "/cordova-commands",
      icon: "home",
      component: function component() {
        return /*#__PURE__*/React__default.createElement(CordovaCommandPanel, {
          api: api
        });
      }
    });
    api.addPanel({
      title: "Cordova相关状态",
      path: "/cordova-info",
      icon: "home",
      component: function component() {
        return /*#__PURE__*/React__default.createElement(CordovaStatusPanel, {
          api: api
        });
      }
    });
    api.addPanel({
      title: "Cordova配置",
      path: "/cordova-config",
      component: function component() {
        return /*#__PURE__*/React__default.createElement(Configuration, {
          api: api
        });
      }
    });
  });

  return index;

})));
