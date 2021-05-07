"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vehicle = void 0;

var _Device = require("./Device");

class Vehicle extends _Device.Device {
  constructor(opts) {
    super(opts.timeRange);
    this.id = opts.id;
    this.numbers = opts.numbers;
    this.type = opts.type;
    this.driver = opts.driver;
    this.device = opts.device;
  }

  pushViolation(violation) {
    this.driver.pushViolation(violation);
  }

}

exports.Vehicle = Vehicle;