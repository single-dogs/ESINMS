import { DeviceData, pull } from '../Data'
import { Violation } from '../Device/Device'
import { Manager } from '../Manager/Manager'

export abstract class Rule {
  public device: number;

  public constructor(device: number) {
    this.device = device
  }

  public abstract resolveData(data: DeviceData): void;

  public abstract open(): Promise<void>;
  public abstract close(): Promise<void>;
}

export enum DeviceState {
  BEFORE_WORK,
  LATE_WORK,
  AT_WORK,
  LEAVE_WORK,
  AFTER_WORK,
}

export class TimeRule extends Rule {
  public deviceState: DeviceState;
  public intervalHandle: null | ReturnType<typeof setInterval>;

  public constructor(device: number) {
    super(device)
    this.deviceState = DeviceState.BEFORE_WORK
    this.intervalHandle = null
  }

  public async open(): Promise<void> {
    this.intervalHandle = setInterval(async () => {
      const worker = Manager.getInstance().workerMap.get(this.device)
      if (worker === undefined) {
        return this.close()
      }
      this.resolveData(await pull(worker.id))
    }, 5000)
  }

  public async close(): Promise<void> {
    if (this.intervalHandle !== null) {
      clearInterval(this.intervalHandle)
    }
  }

  public resolveData(data: DeviceData | undefined): void {
    if (!data) {
      return
    }
    const worker = Manager.getInstance().workerMap.get(this.device)
    if (worker === undefined) {
      this.close()
      return
    }
    if (Date.now() <= worker.realTimeRange.start) {
      // 上班前的时间
      if (this.deviceState == DeviceState.BEFORE_WORK) {
        // 打卡
        this.deviceState = DeviceState.AT_WORK
      }
    } else if (Date.now() <= worker.realTimeRange.end) {
      // 上班中的时间
      if (data.online) {
        // 开启设备
        this.deviceState = DeviceState.AT_WORK
      } else {
        // 未开启设备
        if (this.deviceState == DeviceState.BEFORE_WORK) {
          // 迟到
          worker.pushViolation({
            time: new Date(),
            message: '迟到',
            position: data
          } as Violation)
          this.deviceState = DeviceState.LATE_WORK
        } else if (this.deviceState == DeviceState.AT_WORK) {
          // 早退
          worker.pushViolation({
            time: new Date(),
            message: '早退',
            position: data,
          } as Violation)
          this.deviceState = DeviceState.LEAVE_WORK
        }
      }
    } else {
      // 下班后的时间
      this.deviceState = DeviceState.AFTER_WORK
    }
  }
}