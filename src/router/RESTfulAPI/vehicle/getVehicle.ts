import { Context } from 'koa'
import { collections, DBVehicle } from '../../../model/DB'
import { errorHandler } from '../../../util/errorHandler'
import joi from 'joi'
import { pick } from 'lodash'

// check
const paramsSchema = joi.object({
  id: joi.string(),
  numbers: joi.string(),
  driverId: joi.number(),
  type: joi.string(),
  device: joi.number(),
  page: joi.number().default(1),
  limit: joi.number().default(20),
})

export async function getVehicle(ctx: Context): Promise<void> {
  try {
    const {
      value: params,
      error,
    } = paramsSchema.validate(ctx.query)

    if (error) {
      throw new Error(error.message)
    }

    const condition = pick(params, ['id', 'numbers', 'driverId', 'type', 'device'])

    const result: DBVehicle[] = await collections.Violation
      .find(condition)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .toArray()

    ctx.body = {
      code: 0,
      data: {
        violations:
          result.map(violation =>
            pick(violation, ['id', 'numbers', 'type', 'driverId', 'timeRange', 'openTimeRule', 'device']),
          )
      }
    }
  } catch (error) {
    errorHandler(error, ctx)
  }
}