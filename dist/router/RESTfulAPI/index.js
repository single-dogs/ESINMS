"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rest = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _addWorker = require("./worker/addWorker");

var _delWorker = require("./worker/delWorker");

var _getWorker = require("./worker/getWorker");

var _updateWorker = require("./worker/updateWorker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rest = new _koaRouter.default();
exports.rest = rest;
rest.post('/worker', _addWorker.addWorker);
rest.del('/worker', _delWorker.delWorker);
rest.put('/worker', _updateWorker.updateWorker);
rest.get('/worker', _getWorker.getWorker);