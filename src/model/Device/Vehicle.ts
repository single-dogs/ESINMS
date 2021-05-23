import { ObjectId } from 'mongodb'
import { DBVehicle } from '../DB'
import { Manager } from '../Manager/Manager'
import { TimeRule } from '../Rule/Rule'
import { Device, Violation } from './Device'

export class Vehicle extends Device {
  public objectId: ObjectId;
  public numbers: string;
  public type: string;
  public driverId: number;
  public device?: number;
  public timeRule?: TimeRule;

  private constructor(opts: DBVehicle) {
    super({ id: opts.id, timeRange: opts.timeRange })
    this.objectId = opts._id
    this.numbers = opts.numbers
    this.type = opts.type
    this.driverId = opts.driverId
    this.device = opts.device
    if (opts.openTimeRule && this.device) {
      this.timeRule = new TimeRule(this.id)
      this.timeRule?.open()
    }
  }

  pushViolation(violation: Violation): void {
    Manager.getInstance().workerMap.get(this.driverId)?.pushViolation(violation)
  }

  public async destory(): Promise<void> {
    await this.timeRule?.close()
  }

  public static isActivable(opts: DBVehicle): boolean {
    return opts.device !== undefined && opts.driverId !== undefined && opts.timeRange !== undefined
  }

  public static deserialize(opts: DBVehicle): Vehicle {
    return new Vehicle(opts)
  }
}