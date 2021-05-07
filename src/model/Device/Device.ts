import { DeviceData } from '../Data'
import * as schedule from 'node-schedule'

export interface Violation {
  timestamp: number;
  position: DeviceData;
  message: string;
}

export interface TimeRange {
  start: number;
  end: number;
}

export abstract class Device {
  timeRange: TimeRange
  realTimeRange: TimeRange
  constructor(timeRange: TimeRange) {
    this.timeRange = timeRange
    this.realTimeRange = {
      start: baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.start,
      end: baseTimeStamp() + 1000 * 60 * 60 * this.timeRange.end,
    }

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