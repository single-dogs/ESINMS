// koa
import Koa from 'koa'
import koaLogger from 'koa-logger'
import koaConditionalGet from 'koa-conditional-get'
import koaEtag from 'koa-etag'
import koaSession from 'koa-session'
import koaStatic from 'koa-static'
import koaRouter from 'koa-router'

// rest router
import { router } from './router'

// util
import path from 'path'

// app
const server: Koa = new Koa()

// main
server
  // dev logger
  .use(koaLogger())

  // 304 res
  .use(koaConditionalGet())
  .use(koaEtag())

  // static
  .use(koaStatic(path.resolve(__dirname, 'public'), { defer: false }))

  // session
  .use(koaSession({ key: 'sk', }, server))

  // router
  .use(router.routes())
  .use(new koaRouter().allowedMethods())

  // listen
  .listen(80)

// 异步主控制流

// import 
// (async () => {

// })()