import { Violation, Device, TimeRange } from './Device'

export interface WorkerOptions {
  id: number;
  name: string;
  type: string;
  timeRange: TimeRange;
  device: number;
}

export class Worker extends Device {
  public id: number;
  public name: string;
  public type: string;
  public violation: Violation[];
  public device: number;

  public constructor(opts: WorkerOptions) {
    super(opts.timeRange)
    this.id = opts.id
    this.name = opts.name
    this.type = opts.type
    this.violation = []
    this.device = opts.device
  }
  pushViolation(violation: Violation): void {
    this.violation.push(violation)
  }
}