import { Context } from 'koa'

export function errorHandler(error: Error, ctx: Context): void {
  ctx.body = { code: 1, message: error.message }
}