// koa
import Koa from 'koa'
import koaLogger from 'koa-logger'
import koaConditionalGet from 'koa-conditional-get'
import koaEtag from 'koa-etag'
import koaSession from 'koa-session'
import koaStatic from 'koa-static'
import koaRouter from 'koa-router'
import koaBodyParser from 'koa-bodyparser'

// rest router
import { router } from './router'

// util
import path from 'path'

// manager
import { managerContext } from './model/Manager/Manager'

// app
const server: Koa = new Koa()


// main
server
  // manager
  .use(managerContext())

  // dev logger
  .use(koaLogger())

  // 304 res
  .use(koaConditionalGet())
  .use(koaEtag())

  // static
  .use(koaStatic(path.resolve(__dirname, 'public'), { defer: false }))

  // session
  .use(koaSession({ key: 'sk', }, server))

  // bodyparser
  .use(koaBodyParser())

  // router
  .use(router.routes())
  .use(new koaRouter().allowedMethods())

  // listen
  .listen(8080)