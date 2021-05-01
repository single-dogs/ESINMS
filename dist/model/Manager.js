"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Manager = void 0;

var _DB = require("./DB");

var _Vehicle = require("./Device/Vehicle");

var _Worker = require("./Device/Worker");

/**
 * 单例
 */
class Manager {
  constructor() {
    this.workers = this.vehicles = [];

    this._deserialization();
  }

  _deserialization() {
    _DB.collections.Worker.find({}).toArray((err, workers) => {
      if (err) {
        return console.log(err);
      }

      this.workers = workers.map(worker => {
        worker.timeRange.start = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * worker.timeRange.start;
        worker.timeRange.end = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * worker.timeRange.end;
        return new _Worker.Worker(worker);
      });
    });

    _DB.collections.Vehicle.find({}).toArray((err, vehicles) => {
      if (err) {
        return console.log(err);
      }

      this.vehicles = vehicles.map(vehicle => {
        vehicle.timeRange.start = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * vehicle.timeRange.start;
        vehicle.timeRange.end = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * vehicle.timeRange.end;
        return new _Vehicle.Vehicle(vehicle);
      });
    });
  }

  static getInstance() {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }

    return this.instance;
  }

}

exports.Manager = Manager;