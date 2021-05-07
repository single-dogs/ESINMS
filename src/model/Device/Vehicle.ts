import { Device, TimeRange, Violation } from './Device'
import { Worker } from './Worker'

export interface VehicleOptions {
  id: number;
  numbers: string;
  type: string;
  driver: Worker;
  timeRange: TimeRange;
  device: number;
}

export class Vehicle extends Device {
  public id: number;
  public numbers: string;
  public type: string;
  public driver: Worker;
  public device: number;

  public constructor(opts: VehicleOptions) {
    super(opts.timeRange)
    this.id = opts.id
    this.numbers = opts.numbers
    this.type = opts.type
    this.driver = opts.driver
    this.device = opts.device
  }
  pushViolation(violation: Violation): void {
    this.driver.pushViolation(violation)
  }
}