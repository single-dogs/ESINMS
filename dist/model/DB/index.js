"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collections = exports.db = exports.client = void 0;

var _mongodb = require("mongodb");

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 数据库配置
const {
  db: {
    uri,
    name
  }
} = _config.default.get(); // MongoClient


const client = new _mongodb.MongoClient(uri, {
  useUnifiedTopology: true
}); // 连接 mongo 服务器

exports.client = client;
client.connect(err => {
  if (err) {
    return console.log('数据库连接异常', err);
  }

  console.log('数据库连接成功');
}); // 数据库

const db = client.db(name); // 表

exports.db = db;
const collections = {
  Worker: db.collection('worker'),
  Vehicle: db.collection('vehicle')
};
/**
 * 模型约束
 * - worker id 升序唯一索引
 * - vehicle id 升序唯一索引
 */

exports.collections = collections;
collections.Worker.createIndex({
  id: 1
}, {
  unique: true
}, err => {
  if (err) {
    console.log(err);
  }
});
collections.Vehicle.createIndex({
  id: 1
}, {
  unique: true
}, err => {
  if (err) {
    console.log(err);
  }
});