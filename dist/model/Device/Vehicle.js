"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vehicle = void 0;

class Vehicle {
  constructor(opts) {
    this.id = opts.id;
    this.numbers = opts.numbers;
    this.type = opts.type;
    this.driver = opts.driver;
    this.timeRange = opts.timeRange;
    this.device = opts.device;
  }

  pushViolation(violation) {
    this.driver.pushViolation(violation);
  }

}

exports.Vehicle = Vehicle;