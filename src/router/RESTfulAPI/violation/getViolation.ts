import { Context } from 'koa'
import { collections } from '../../../model/DB'
import { errorHandler } from '../../../util/errorHandler'
import joi from 'joi'
import { assign, get, has, pick, set } from 'lodash'
import { Violation } from '../../../model/Device/Device'

// check
const paramsSchema = joi.object({
  workerId: joi.number(),
  id: joi.string(),
  timeFrame: joi.object({
    lowerbound: joi.number(),
    upperbound: joi.number(),
  }),
  page: joi.number().default(1),
  limit: joi.number().default(20),
})

export async function getViolations(ctx: Context): Promise<void> {
  try {
    const {
      value: params,
      error,
    } = paramsSchema.validate(ctx.query)

    if (error) {
      throw new Error(error.message)
    }

    let condition = pick(params, ['id', 'workerId'])

    if (has(params, 'timeFrame.lowerbound')) {
      condition = assign(condition, {
        time: {
          $gte: new Date(get(params, 'timeFrame.lowerbound'))
        }
      })
    }

    if (has(params, 'timeFrame.upperbound')) {
      condition = assign(condition, {
        time: {
          $lte: new Date(get(params, 'timeFrame.upperbound'))
        }
      })
    }

    const result: Violation[] = await collections.Violation
      .find(condition)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .toArray()

    ctx.body = {
      code: 0,
      data: {
        violations:
          result.map(violation => set(
            pick(violation, ['id', 'workerId', 'lon', 'lat', 'time', 'message']),
            'time',
            violation.time.getTime()
          ))
      }
    }
  } catch (error) {
    errorHandler(error, ctx)
  }
}