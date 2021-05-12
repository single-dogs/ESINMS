"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWorker = getWorker;

var _lodash = require("lodash");

var _DB = require("../../../model/DB");

var _errorHandler = require("../../../util/errorHandler");

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check
const paramsSchema = _joi.default.object({
  id: _joi.default.string(),
  name: _joi.default.string(),
  type: _joi.default.string(),
  device: _joi.default.number(),
  page: _joi.default.number().default(1),
  limit: _joi.default.number().default(20)
});

async function getWorker(ctx) {
  try {
    const {
      value: params,
      error
    } = paramsSchema.validate(ctx.request.body);

    if (error) {
      throw new Error(error.message);
    }

    const condition = (0, _lodash.pick)(ctx.query, ['id', 'name', 'type', 'device']);
    const result = await _DB.collections.Worker.find(condition).skip((params.page - 1) * params.limit).limit(params.limit).toArray();
    ctx.body = {
      code: 0,
      data: {
        workers: result.map(worker => (0, _lodash.pick)(worker, ['id', 'name', 'type', 'timeRange', 'openTimeRule', 'device']))
      }
    };
  } catch (error) {
    (0, _errorHandler.errorHandler)(error, ctx);
  }
}