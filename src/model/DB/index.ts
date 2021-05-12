import { MongoClient, MongoError } from 'mongodb'
import config from '../../config'

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
  Worker: db.collection('worker'),
  Vehicle: db.collection('vehicle'),
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

export {
  client,
  db,
  collections,
}
