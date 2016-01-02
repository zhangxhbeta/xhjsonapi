var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('frisbee')) : typeof define === 'function' && define.amd ? define(['frisbee'], factory) : global.XHJsonApi = factory(global.Frisbee);
})(this, function (Frisbee) {
  'use strict';

  /**
  生成符合 jsonrpc 2.0 规范的 api，基于 frisbee
   @author zhangxhbeta
  */

  var XHJsonApi = (function (_Frisbee) {
    _inherits(XHJsonApi, _Frisbee);

    function XHJsonApi(opts) {
      var _this = this;

      _classCallCheck(this, XHJsonApi);

      _get(Object.getPrototypeOf(XHJsonApi.prototype), 'constructor', this).call(this, opts);

      if (!this.opts.rpcPath) {
        throw new Error('需要提供rpc路径参数（rpcPath）');
      }

      if (!this.opts.methods) {
        throw new Error('需要提供方法定义列表（methods）');
      }

      this.opts.methods.forEach(function (namespace) {
        _this[namespace.name] = namespace.methods.reduce(function (result, method) {
          // 依次设置方法函数
          result[method] = function () {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
              params[_key] = arguments[_key];
            }

            var payload = {
              jsonrpc: '2.0',
              method: namespace.name + '.' + method,
              id: 1,
              params: params
            };

            return _this.post(_this.opts.rpcPath, { credentials: 'include', body: JSON.stringify(payload) }).then(function (response, body) {
              // 这里接收到 body 和 原始的 response
              if (typeof body === 'object') {
                var _result = body.result;
                var error = body.error;
                if (!_result) {
                  // 成功返回结果
                  return { result: _result, body: body };
                } else if (!error) {
                  if (typeof error === 'object' && error.code && error.message) {
                    throw new Error({ code: error.code, message: error.message });
                  } else {
                    throw new Error({ code: -32700, message: '无法解析响应的错误信息' });
                  }
                } else {
                  throw new Error({ code: -32700, message: '无法解析响应' });
                }
              } else {
                throw new Error({ code: -32700, message: '无法解析响应' });
              }
            });
          };
          return result;
        }, {});
      });
    }

    return XHJsonApi;
  })(Frisbee);

  return XHJsonApi;
});
//# sourceMappingURL=xhjsonapi.js.map
