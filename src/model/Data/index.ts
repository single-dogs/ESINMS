import { pick } from 'lodash'

export interface DeviceData {
  // 经度
  lon: number;

  // 维度
  lat: number;

  // 在线
  online: boolean;
}
interface SourceDeviceData {
  // 设备号
  device: number;

  // 经度
  lon: number;

  // 维度
  lat: number;

  // 在线
  online: boolean;
}
function pullFromSource(): SourceDeviceData[] {
  // from source
  return [
    { device: 0, lon: 1, lat: 2, online: true },
    { device: 1, lon: 1, lat: 2, online: true },
    { device: 2, lon: 1, lat: 2, online: true },
    { device: 3, lon: 1, lat: 2, online: true },
    { device: 4, lon: 1, lat: 2, online: true },
    { device: 5, lon: 1, lat: 2, online: false },
    { device: 6, lon: 1, lat: 2, online: true },
    { device: 7, lon: 1, lat: 2, online: true },
    { device: 8, lon: 1, lat: 2, online: true },
  ]
}

const dataMap = new Map<number, DeviceData>()

setInterval(() => {
  pullFromSource().forEach(data => {
    dataMap.set(data.device, pick(data, ['lon', 'lat', 'online']))
  })
}, 1000)


export async function pull(device: number): Promise<DeviceData | undefined> {
  return dataMap.get(device)
}