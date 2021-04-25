import Koa, { Context } from 'koa';

const server: Koa = new Koa();

server.use((ctx: Context) => {
  ctx.body = 'hello';
});

server.listen(80);