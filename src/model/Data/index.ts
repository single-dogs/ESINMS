export interface DeviceData {
  // 经度
  lon: number;

  // 维度
  lat: number;

  // 在线
  online: boolean;
}

export async function pull(device: number): Promise<DeviceData> {
  device
  return { lon: 0, lat: 0, online: true } as DeviceData
}