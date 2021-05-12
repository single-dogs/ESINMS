"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWorker = updateWorker;

var _lodash = require("lodash");

var _DB = require("../../../model/DB");

var _errorHandler = require("../../../util/errorHandler");

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check
const paramsSchema = _joi.default.object({
  id: _joi.default.number().required(),
  name: _joi.default.string(),
  type: _joi.default.string(),
  TimeRange: _joi.default.object({
    start: _joi.default.number(),
    end: _joi.default.number()
  }),
  openTimeRule: _joi.default.bool(),
  device: _joi.default.number()
});

async function updateWorker(ctx) {
  try {
    const {
      value: params,
      error
    } = paramsSchema.validate(ctx.request.body);

    if (error) {
      throw new Error(error.message);
    }

    const result = await _DB.collections.Worker.updateOne({
      id: params.id
    }, (0, _lodash.pick)(params, ['name', 'type', 'timeRange', 'openTimeRule', 'device'])); // reload obj

    const updated = await _DB.collections.Worker.findOne({
      _id: result.upsertedId._id
    });
    ctx.manager.reloadWorker(params.id, updated);
    ctx.body = {
      code: 0,
      data: {
        updated: (0, _lodash.pick)(updated, ['id', 'name', 'type', 'timeRange', 'openTimeRule', 'device'])
      }
    };
  } catch (error) {
    (0, _errorHandler.errorHandler)(error, ctx);
  }
}