"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addWorker = addWorker;

var _lodash = require("lodash");

var _DB = require("../../../model/DB");

var _errorHandler = require("../../../util/errorHandler");

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check
const paramsSchema = _joi.default.object({
  name: _joi.default.string().required(),
  type: _joi.default.string().default(''),
  TimeRange: _joi.default.object({
    start: _joi.default.number().required(),
    end: _joi.default.number().required()
  }).required(),
  openTimeRule: _joi.default.bool().default(false),
  device: _joi.default.number().required()
});

async function addWorker(ctx) {
  try {
    const {
      value: params,
      error
    } = paramsSchema.validate(ctx.request.body);

    if (error) {
      throw new Error(error.message);
    }

    const result = await _DB.collections.Worker.insertOne((0, _lodash.pick)(params, ['name', 'type', 'timeRange', 'openTimeRule', 'device']));
    ctx.manager.addWorker(result.ops);
    ctx.body = {
      code: 0,
      data: {
        inserted: (0, _lodash.pick)(result.ops, ['id', 'name', 'type', 'timeRange', 'openTimeRule', 'device'])
      }
    };
  } catch (error) {
    (0, _errorHandler.errorHandler)(error, ctx);
  }
}