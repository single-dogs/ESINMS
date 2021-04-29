"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rest = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rest = new _koaRouter.default();
exports.rest = rest;
rest.get('/test', ctx => {
  ctx.body = 'hello';
});