import { readdirSync, readFileSync, statSync } from 'fs'
import { resolve, parse } from 'path'

/**
 * config 结构
 */
interface ServerConfig {
  account: {
    username: string
    password: string
  }

  db: {
    name: string
    uri: string
  }
}

/**
 * 递归 read json 目录，自动跳过非 json 文件，返回对象
 * @param path 
 */
function readJsonDirRecursion(path: string): any {
  const jsonObj: Record<string, unknown> = {}
  for (const basename of readdirSync(path)) {
    const filePath = resolve(path, basename)
    const { name: objName, ext } = parse(filePath)
    if (ext !== '.json') {
      continue
    }
    if (statSync(filePath).isDirectory()) {
      jsonObj[objName] = readJsonDirRecursion(filePath)
    } else {
      try {
        jsonObj[objName] = JSON.parse(readFileSync(filePath, { encoding: 'utf-8' }))
      } catch (error) { /* 跳过 parse 失败的 json */ }
    }
  }
  return jsonObj
}

export default {
  get: (): ServerConfig => readJsonDirRecursion(resolve(__dirname)),
  set: (): void => { /* 预留 set config 接口 */ }
}
