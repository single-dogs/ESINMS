"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delWorker = delWorker;

var _DB = require("../../../model/DB");

var _errorHandler = require("../../../util/errorHandler");

var _joi = _interopRequireDefault(require("joi"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check
const paramsSchema = _joi.default.object({
  id: _joi.default.number().required()
});

async function delWorker(ctx) {
  try {
    const {
      value: params,
      error
    } = paramsSchema.validate(ctx.query);

    if (error) {
      throw new Error(error.message);
    }

    await _DB.collections.Worker.deleteOne((0, _lodash.pick)(params, ['id']));
    ctx.manager.delWorker(params.id);
    ctx.body = {
      code: 0,
      data: {
        deleted: {
          id: params.id
        }
      }
    };
  } catch (error) {
    (0, _errorHandler.errorHandler)(error, ctx);
  }
}