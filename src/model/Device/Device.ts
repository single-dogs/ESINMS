import { DeviceData } from '../Data'

export interface Violation {
  timestamp: number;
  position: DeviceData;
  message: string;
}

export interface TimeRange {
  start: number;
  end: number;
}

export interface Device {
  timeRange: TimeRange;
  pushViolation(violation: Violation): void;
}