global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);
global.fetch = sinon.stub();

require('babel-core/register');
require('./setup')();
