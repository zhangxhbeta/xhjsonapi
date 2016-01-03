# xhjsonapi

a jsonrpc client for node/browser/react native

超轻量级的 json-rpc 2.0 协议实现，基于新的标准 [fetch](https://fetch.spec.whatwg.org/) api 来实现，另外为了方便使用集成了另外一个库 [frisbee](https://github.com/niftylettuce/frisbee)，实现了[常见的 http 操作](#rest-接口)

[![Travis build status](http://img.shields.io/travis/zhangxhbeta/xhjsonapi.svg?style=flat)](https://travis-ci.org/zhangxhbeta/xhjsonapi)
[![Code Climate](https://codeclimate.com/github/zhangxhbeta/xhjsonapi/badges/gpa.svg)](https://codeclimate.com/github/zhangxhbeta/xhjsonapi)
[![Test Coverage](https://codeclimate.com/github/zhangxhbeta/xhjsonapi/badges/coverage.svg)](https://codeclimate.com/github/zhangxhbeta/xhjsonapi)
[![Dependency Status](https://david-dm.org/zhangxhbeta/xhjsonapi.svg)](https://david-dm.org/zhangxhbeta/xhjsonapi)
[![devDependency Status](https://david-dm.org/zhangxhbeta/xhjsonapi/dev-status.svg)](https://david-dm.org/zhangxhbeta/xhjsonapi#info=devDependencies)

## 环境设置

### react native 环境下

1. 安装依赖项

	```bash
  npm install zhangxhbeta/xhjsonapi --save
	```
2. 然后获取 XHJsonApi 对象

	```bash
  import XHJsonApi from 'xhjsonapi';
	```
3. 查看例子开始使用


### 如果想在 Node.js 环境执行

与 react native 环境基本类似，区别在于 Node 环境缺少 fetch 和 es6-promise，需要安装

1. 安装依赖项

	```bash
  npm install es6-promise --save
  npm install isomorphic-fetch --save
  npm install zhangxhbeta/xhjsonapi --save
	```
2. 然后获取 XHJsonApi 对象

	```bash
  import 'isomorphic-fetch';

  import es6promise from 'es6-promise';
  es6promise.polyfill();

  import XHJsonApi from 'xhjsonapi';
	```
3. 查看例子开始使用


### 传统浏览器环境

1. 下载必要的脚本
	[es6-promise](https://raw.githubusercontent.com/jakearchibald/es6-promise/master/dist/es6-promise.min.js)
	[fetch](https://raw.githubusercontent.com/github/fetch/master/fetch.js)

	**要支持ie8的话，要用下面2个**，请使用 [es5-shim](https://raw.githubusercontent.com/es-shims/es5-shim/master/es5-shim.min.js) + [fetch-ie8](https://raw.githubusercontent.com/camsong/fetch-ie8/master/fetch.js)
2. 引入js脚本

	```html
  <!doctype html>
  <html lang="zh-CN">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title></title>
      <meta name="description" content="">
      <!-- 双核浏览器 -->
      <meta name="renderer" content="webkit">

      <!-- 解决 ie8 下面 es5 的问题 -->
      <!--[if lt IE 9]>
        <script src="scripts/es5-shim.js"></script>
      <![endif]-->
      <!-- 引入 promise 库` -->
      <script src="scripts/es6-promise.js"></script>
      <!-- 引入 fetch 库 -->
      <script src="scripts/fetch.js"></script>
      <!-- 引入 frisbee -->
      <script src='scripts/frisbee.js'></script>
    </head>
    <body>
    </body>
  </html>
	```

### 使用例子

methods 是一个服务端暴漏的方法列表，提供这个列表后会将这些方法按照模块都生成出来，客户端就可以直接调用这些方法

  ```js
  // 初始化 api（仅设置一次即可）
  var api = new XHJsonApi({
    baseURI: 'localhost:8080/app',
    rpcPath: 'json-rpc',
    methods: [
      {
        name: 'news',
        methods: ['getHotNews', 'getLatestNews']
      },
      {
        name: 'otherModule',
        methods: ['foo', 'bar']
      }
    ],
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  // 在需要用的地方调用 api
  api.news.getHotNews().then(result) {
    console.log(result);
  }.catch(e) {
    console.log(e);
  }

  // 如果需要传参数
  api.otherModule.foo('the', 'best', 1).then(result) {
    console.log(result);
  }.catch(e) {
    console.log(e);
  }
```

## REST 接口

* List of available HTTP methods:
	* `api.get(path, options, callback)` - GET
    * `api.head(path, options, callback)` - HEAD (*现在暂时不能用*)
    * `api.post(path, options, callback)` - POST
    * `api.put(path, options, callback)` - PUT
    * `api.del(path, options, callback)` - DELETE
    * `api.options(path, options, callback)` - OPTIONS (*现在暂时不能用*)
    * `api.patch(path, options, callback)` - PATCH

具体用法，参见 [frisbee](https://github.com/niftylettuce/frisbee) 的文档
