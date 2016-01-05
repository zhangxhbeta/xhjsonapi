/**
生成符合 jsonrpc 2.0 规范的 api，基于 frisbee

@author zhangxhbeta
*/

import Frisbee from 'frisbee';

// 自定义的rpc错误对象
function RPCError(code, message) {
  this.name = 'RPCError';
  this.message = (message || '');
  this.code = (code || -32603);
}
RPCError.prototype = new Error;

export default class XHJsonApi extends Frisbee{

  constructor(opts) {
    super(opts);

    if (!this.opts.rpcPath) {
      throw new Error('需要提供rpc路径参数（rpcPath）');
    }

    if (!this.opts.methods) {
      throw new Error('需要提供方法定义列表（methods）');
    }

    this.opts.methods.forEach((namespace) => {
      this[namespace.name] = namespace.methods.reduce((result, method) => {
        // 依次设置方法函数
        result[method] = (...params) => {
          const payload = {
            jsonrpc: '2.0',
            method: namespace.name + '.' + method,
            id: 1,
            params: params,
          };

          return this.post(this.opts.rpcPath, {credentials: 'include', body: JSON.stringify(payload)})
            .then(({response, body}) => {
              // 这里接收到 body 和 原始的 response
              if (typeof body === 'object') {
                const result = body.result;
                const error = body.error;
                if (result !== undefined) {
                  // 成功返回结果
                  return result;
                } else if (error !== undefined) {
                  if (typeof error === 'object' && error.code && error.message) {
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
  }
}
