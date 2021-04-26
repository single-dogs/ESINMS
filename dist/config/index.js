"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

/**
 * 递归 read json 目录，自动跳过非 json 文件，返回对象
 * @param path 
 */
function readJsonDirRecursion(path) {
  const jsonObj = {};

  for (const basename of (0, _fs.readdirSync)(path)) {
    const filePath = (0, _path.resolve)(path, basename);
    const {
      name: objName,
      ext
    } = (0, _path.parse)(filePath);

    if (ext !== '.json') {
      continue;
    }

    if ((0, _fs.statSync)(filePath).isDirectory()) {
      jsonObj[objName] = readJsonDirRecursion(filePath);
    } else {
      try {
        jsonObj[objName] = JSON.parse((0, _fs.readFileSync)(filePath, {
          encoding: 'utf-8'
        }));
      } catch (error) {
        /* 跳过 parse 失败的 json */
      }
    }
  }

  return jsonObj;
}

var _default = {
  get: () => readJsonDirRecursion((0, _path.resolve)(__dirname)),
  set: () => {
    /* 预留 set config 接口 */
  }
};
exports.default = _default;