import { DeviceData } from '../Data'
import * as schedule from 'node-schedule'

export interface Violation {
  time: Date;
  position: DeviceData;
  message: string;
}

export interface TimeRange {
  start: number;
  end: number;
}

export interface DeviceOptions {
  id: number;
  timeRange: TimeRange;
}

export abstract class Device {
  public id: number;
  timeRange: TimeRange
  realTimeRange: TimeRange
  constructor({ timeRange, id }: DeviceOptions) {
    this.id = id
    this.timeRange = timeRange
    this.realTimeRange = {
      start: baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.start,
      end: baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.end,
    }

    // 凌晨更新时间
    schedule.scheduleJob('1 0 0 * * *', () => {
      this.realTimeRange.start = baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.start
      this.realTimeRange.end = baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.end
    })
  }
  abstract pushViolation(violation: Violation): void;
}

function baseTimeStamp(): number {
  return new Date(new Date().toLocaleDateString()).getTime()
}