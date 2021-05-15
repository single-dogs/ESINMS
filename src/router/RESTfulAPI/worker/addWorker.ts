import { Context } from 'koa'
import { assign, pick } from 'lodash'
import { collections, nextId } from '../../../model/DB'
import { errorHandler } from '../../../util/errorHandler'
import joi from 'joi'

// check
const paramsSchema = joi.object({
  name: joi.string().required(),
  type: joi.string().default(''),
  timeRange: joi.object({
    start: joi.number().required(),
    end: joi.number().required(),
  }).required(),
  openTimeRule: joi.bool().default(false),
  device: joi.number().required(),
})

export async function addWorker(ctx: Context): Promise<void> {
  try {
    const {
      value: params,
      error,
    } = paramsSchema.validate(ctx.request.body)

    if (error) {
      throw new Error(error.message)
    }

    const result = await collections.Worker.insertOne(
      pick(
        // 添加其他属性
        assign(params, { id: await nextId('Worker') }),
        // picked
        ['id', 'name', 'type', 'timeRange', 'openTimeRule', 'device']
      )
    )

    ctx.manager.addWorker(result.ops[0] as WorkerOptions)

    ctx.body = {
      code: 0,
      data: {
        inserted:
          pick(result.ops[0], ['id', 'name', 'type', 'timeRange', 'openTimeRule', 'device'])
      }
    }
  } catch (error) {
    errorHandler(error, ctx)
  }
}