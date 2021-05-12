"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Worker = void 0;

var _DB = require("../DB");

var _Rule = require("../Rule/Rule");

var _Device = require("./Device");

class Worker extends _Device.Device {
  constructor(opts) {
    super(opts.timeRange);
    this.objectId = opts._id;
    this.id = opts.id;
    this.name = opts.name;
    this.type = opts.type;
    this.violation = [];
    this.device = opts.device;

    if (opts.openTimeRule && this.device) {
      this.timeRule = new _Rule.TimeRule({
        device: this
      });
    }
  }

  pushViolation(violation) {
    this.violation.push(violation);

    _DB.collections.Worker.updateOne({
      _id: this.objectId
    }, {
      $push: {
        violation
      }
    });
  }

  static deserialize(opts) {
    return new Worker(opts);
  }

}

exports.Worker = Worker;