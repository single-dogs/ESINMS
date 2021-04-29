"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _koaConditionalGet = _interopRequireDefault(require("koa-conditional-get"));

var _koaEtag = _interopRequireDefault(require("koa-etag"));

var _koaSession = _interopRequireDefault(require("koa-session"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _router = require("./router");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// koa
// rest router
// util
// app
const server = new _koa.default(); // main

server // dev logger
.use((0, _koaLogger.default)()) // 304 res
.use((0, _koaConditionalGet.default)()).use((0, _koaEtag.default)()) // static
.use((0, _koaStatic.default)(_path.default.resolve(__dirname, 'public'), {
  defer: false
})) // session
.use((0, _koaSession.default)({
  key: 'sk'
}, server)) // router
.use(_router.router.routes()).use(new _koaRouter.default().allowedMethods()) // listen
.listen(80);