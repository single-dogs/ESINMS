"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Worker = void 0;

class Worker {
  constructor(opts) {
    this.id = opts.id;
    this.name = opts.name;
    this.type = opts.type;
    this.violation = [];
    this.timeRange = opts.timeRange;
    this.device = opts.device;
  }

  pushViolation(violation) {
    this.violation.push(violation);
  }

}

exports.Worker = Worker;