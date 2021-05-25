import { MongoClient, MongoError, ObjectId } from 'mongodb'
import config from '../../config'
import { DeviceData } from '../Data'
import { TimeRange } from '../Device/Device'

// 数据库配置
const { db: { uri, name } } = config.get()

// MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true })

// 连接 mongo 服务器
client.connect((err: MongoError) => {
  if (err) {
    return console.log('数据库连接异常', err)
  }
  console.log('数据库连接成功')
})

// 数据库
const db = client.db(name)

// 表
const collections = {
  Worker: db.collection('Worker'),
  Vehicle: db.collection('Vehicle'),
  Violation: db.collection('Violation'),
  IncId: db.collection('IncId'),
}

/**
 * 模型约束
 * - worker id 升序唯一索引
 * - vehicle id 升序唯一索引
 */
collections.Worker.createIndex({ id: 1 }, { unique: true }, (err) => {
  if (err) {
    console.log(err)
  }
})
collections.Vehicle.createIndex({ id: 1 }, { unique: true }, (err) => {
  if (err) {
    console.log(err)
  }
})

// 自增键
async function nextId(collection: string): Promise<number> {
  const find = await collections.IncId.findOneAndUpdate({ collection }, { $inc: { id: 1 } }, {})
  if (!find.value) {
    await collections.IncId.insertOne({ collection, id: 0 })
    return 0
  }
  return find.value.id + 1
}

export interface DBWorker {
  _id: ObjectId;
  id: number;
  name: string;
  type: string;
  timeRange: TimeRange;
  openTimeRule: boolean;
  device?: number;
}

export interface DBVehicle {
  _id: ObjectId;
  id: number;
  numbers: string;
  type: string;
  driverId: number;
  timeRange: TimeRange;
  openTimeRule: boolean;
  device?: number;
}

export interface DBViolation {
  _id: ObjectId;
  id: number;
  workerId: number;
  position: DeviceData;
  time: Date;
  message: string;
}

export {
  client,
  db,
  collections,
  nextId,
}
