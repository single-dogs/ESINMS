import { Context } from 'koa'
import { assign, pick } from 'lodash'
import { collections, nextId } from '../../../model/DB'
import { errorHandler } from '../../../util/errorHandler'
import joi from 'joi'

// check
const paramsSchema = joi.object({
  numbers: joi.string().required(),
  driverId: joi.number(),
  type: joi.string().default(''),
  timeRange: joi.object({
    start: joi.number().required(),
    end: joi.number().required(),
  }).required(),
  openTimeRule: joi.bool().default(false),
  device: joi.number(),
})

export async function addVehicle(ctx: Context): Promise<void> {
  try {
    const {
      value: params,
      error,
    } = paramsSchema.validate(ctx.request.body)

    if (error) {
      throw new Error(error.message)
    }

    const result = await collections.Vehicle.insertOne(
      pick(
        // 添加其他属性
        assign(params, { id: await nextId('Vehicle') }),
        // picked
        ['id', 'numbers', 'driverId', 'type', 'timeRange', 'openTimeRule', 'device']
      )
    )

    ctx.manager.addVehicle(result.ops[0])

    ctx.body = {
      code: 0,
      data: {
        inserted:
          pick(result.ops[0], ['id', 'numbers', 'driverId', 'type', 'timeRange', 'openTimeRule', 'device'])
      }
    }
  } catch (error) {
    errorHandler(error, ctx)
  }
}