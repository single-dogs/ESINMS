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

export class Vehicle implements Device {
  public id: number;
  public numbers: string;
  public type: string;
  public driver: Worker;
  public timeRange: TimeRange;
  public device: number;

  public constructor(opts: VehicleOptions) {
    this.id = opts.id
    this.numbers = opts.numbers
    this.type = opts.type
    this.driver = opts.driver
    this.timeRange = opts.timeRange
    this.device = opts.device
  }
  pushViolation(violation: Violation): void {
    this.driver.pushViolation(violation)
  }
}