(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("frisbee"));
	else if(typeof define === 'function' && define.amd)
		define(["frisbee"], factory);
	else if(typeof exports === 'object')
		exports["XHJsonApi"] = factory(require("frisbee"));
	else
		root["XHJsonApi"] = factory(root["frisbee"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	生成符合 jsonrpc 2.0 规范的 api，基于 frisbee
	
	@author zhangxhbeta
	*/
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _frisbee = __webpack_require__(1);
	
	var _frisbee2 = _interopRequireDefault(_frisbee);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// 自定义的rpc错误对象
	function RPCError(code, message) {
	  this.name = 'RPCError';
	  this.message = message || '';
	  this.code = code || -32603;
	}
	RPCError.prototype = new Error();
	
	var XHJsonApi = (function (_Frisbee) {
	  _inherits(XHJsonApi, _Frisbee);
	
	  function XHJsonApi(opts) {
	    _classCallCheck(this, XHJsonApi);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XHJsonApi).call(this, opts));
	
	    if (!_this.opts.rpcPath) {
	      throw new Error('需要提供rpc路径参数（rpcPath）');
	    }
	
	    if (!_this.opts.methods) {
	      throw new Error('需要提供方法定义列表（methods）');
	    }
	
	    _this.opts.methods.forEach(function (namespace) {
	      _this[namespace.name] = namespace.methods.reduce(function (result, method) {
	        // 依次设置方法函数
	        result[method] = function () {
	          for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	            params[_key] = arguments[_key];
	          }
	
	          var payload = {
	            jsonrpc: '2.0',
	            method: (namespace.remoteName || namespace.name) + '.' + method,
	            id: 1,
	            params: params
	          };
	
	          return _this.post(_this.opts.rpcPath, { credentials: 'include', body: JSON.stringify(payload) }).then(function (_ref) {
	            var response = _ref.response;
	            var body = _ref.body;
	
	            // 这里接收到 body 和 原始的 response
	            if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object') {
	              var _result = body.result;
	              var error = body.error;
	              if (_result !== undefined) {
	                // 成功返回结果
	                return _result;
	              } else if (error !== undefined) {
	                if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error.code && error.message) {
	                  throw new RPCError(error.code, error.message);
	                } else {
	                  throw new RPCError(-32700, '无法解析响应的错误信息');
	                }
	              } else {
	                throw new RPCError(-32700, '无法解析响应');
	              }
	            } else {
	              throw new RPCError(-32700, '无法解析响应');
	            }
	          });
	        };
	        return result;
	      }, {});
	    });
	    return _this;
	  }
	
	  return XHJsonApi;
	})(_frisbee2.default);
	
	exports.default = XHJsonApi;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=xhjsonapi.js.map