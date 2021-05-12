"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = errorHandler;

function errorHandler(error, ctx) {
  ctx.body = {
    code: 1,
    message: error.message
  };
}