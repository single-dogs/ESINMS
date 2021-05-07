import {
  collections,
} from './DB'
import { Vehicle, VehicleOptions } from './Device/Vehicle'
import { Worker, WorkerOptions } from './Device/Worker'

/**
 * 单例
 */
export class Manager {
  private static instance: Manager;
  private workers: Worker[];
  private vehicles: Vehicle[];

  private constructor() {
    this.workers = this.vehicles = []
    this._deserialization()
  }

  private _deserialization() {
    collections.Worker.find({}).toArray((err, workers) => {
      if (err) {
        return console.log(err)
      }
      this.workers = workers.map((worker: WorkerOptions) => {
        worker.timeRange.start = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * worker.timeRange.start
        worker.timeRange.end = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * worker.timeRange.end
        return new Worker(worker)
      })
    })
    collections.Vehicle.find({}).toArray((err, vehicles) => {
      if (err) {
        return console.log(err)
      }
      this.vehicles = vehicles.map((vehicle: VehicleOptions) => {
        vehicle.timeRange.start = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * vehicle.timeRange.start
        vehicle.timeRange.end = new Date(new Date().toLocaleDateString()).getTime() + 1000 * 60 * 60 * vehicle.timeRange.end
        return new Vehicle(vehicle)
      })
    })
  }

  static getInstance(): Manager {
    if (!Manager.instance) {
      Manager.instance = new Manager()
    }
    return this.instance
  }
}