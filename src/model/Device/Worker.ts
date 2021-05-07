import { Violation, Device, TimeRange } from './Device'

export interface WorkerOptions {
  id: number;
  name: string;
  type: string;
  timeRange: TimeRange;
  device: number;
}

export class Worker implements Device {
  public id: number;
  public name: string;
  public type: string;
  public violation: Violation[];
  public timeRange: TimeRange;
  public device: number;

  public constructor(opts: WorkerOptions) {
    this.id = opts.id
    this.name = opts.name
    this.type = opts.type
    this.violation = []
    this.timeRange = opts.timeRange
    this.device = opts.device
  }
  pushViolation(violation: Violation): void {
    this.violation.push(violation)
  }
}