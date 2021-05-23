import { ObjectId } from 'bson'
import { assign, pick } from 'lodash'
import { collections, DBWorker, nextId } from '../DB'
import { TimeRule } from '../Rule/Rule'
import { Violation, Device } from './Device'

export class Worker extends Device {
  public objectId: ObjectId;
  public name: string;
  public type: string;
  public device?: number;
  public timeRule?: TimeRule;


  private constructor(opts: DBWorker) {
    super({ id: opts.id, timeRange: opts.timeRange })
    this.objectId = opts._id
    this.name = opts.name
    this.type = opts.type
    this.device = opts.device
    if (opts.openTimeRule && this.device) {
      this.timeRule = new TimeRule(this.id)
      this.timeRule?.open()
    }
  }

  async pushViolation(violation: Violation): Promise<void> {
    collections.Violation.insertOne(
      assign(
        { id: await nextId('Violation'), time: new Date() },
        pick(violation, ['position', 'message'])
      )
    )
  }

  public static isActivable(opts: DBWorker): boolean {
    return opts.device !== undefined && opts.timeRange !== undefined
  }

  public static deserialize(opts: DBWorker): Worker {
    return new Worker(opts)
  }
}