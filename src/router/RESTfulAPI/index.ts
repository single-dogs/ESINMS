import koaRouter from 'koa-router'

const rest = new koaRouter()

rest.get('/test', (ctx) => {
  ctx.body = 'hello'
})

export {
  rest,
}