"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Worker = void 0;

var _Device = require("./Device");

class Worker extends _Device.Device {
  constructor(opts) {
    super(opts.timeRange);
    this.id = opts.id;
    this.name = opts.name;
    this.type = opts.type;
    this.violation = [];
    this.device = opts.device;
  }

  pushViolation(violation) {
    this.violation.push(violation);
  }

}

exports.Worker = Worker;