"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.managerContext = managerContext;
exports.Manager = void 0;

var _DB = require("../DB");

var _Worker = require("../Device/Worker");

/**
 * 单例
 */
class Manager {
  constructor() {
    this.workerMap = new Map();
    this.vehicles = [];

    this._deserialize();
  }

  _deserialize() {
    _DB.collections.Worker.find({}).toArray((err, workers) => {
      if (err) {
        return console.log(err);
      }

      workers.forEach(worker => {
        const workerObj = _Worker.Worker.deserialize(worker);

        this.workerMap.set(worker.id, workerObj);
      });
    }); // collections.Vehicle.find({}).toArray((err, vehicles) => {
    //   if (err) {
    //     return console.log(err)
    //   }
    //   this.vehicles = vehicles.map((vehicle: VehicleOptions) => {
    //     vehicle.timeRange.start = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * vehicle.timeRange.start
    //     vehicle.timeRange.end = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * vehicle.timeRange.end
    //     return new Vehicle(vehicle)
    //   })
    // })

  }

  addWorker(workerOpts) {
    this.workerMap.set(workerOpts.id, _Worker.Worker.deserialize(workerOpts));
  }

  delWorker(id) {
    this.workerMap.delete(id);
  }

  reloadWorker(id, newObj) {
    this.delWorker(id);
    this.addWorker(newObj);
  }

  static getInstance() {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }

    return this.instance;
  }

}

exports.Manager = Manager;

function managerContext() {
  const manager = Manager.getInstance();
  return async (ctx, next) => {
    ctx.manager = manager;
    await next();
  };
}