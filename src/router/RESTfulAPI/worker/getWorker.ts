import { Context } from 'koa'
import { pick } from 'lodash'
import { collections } from '../../../model/DB'
import { errorHandler } from '../../../util/errorHandler'
import joi from 'joi'

/*interface Params {
  id?: number;
  name?: string;
  type?: string;
  device?: number;
  page?: number;
  limit?: number;
}
*/

interface Condition {
  id?: number;
  name?: string;
  type?: string;
  device?: number;
}

// check
const paramsSchema = joi.object({
  id: joi.string(),
  name: joi.string(),
  type: joi.string(),
  device: joi.number(),
  page: joi.number().default(1),
  limit: joi.number().default(20),
})

export async function getWorkers(ctx: Context): Promise<void> {
  try {
    const {
      value: params,
      error,
    } = paramsSchema.validate(ctx.request.body)

    if (error) {
      throw new Error(error.message)
    }

    const condition = pick(ctx.query, ['id', 'name', 'type', 'device'])
    const result = await collections.Worker
      .find(condition as Condition)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .toArray()

    ctx.body = {
      code: 0,
      data: {
        workers:
          result.map(worker => pick(worker, ['id', 'name', 'type', 'timeRange', 'openTimeRule', 'device']))
      }
    }
  } catch (error) {
    errorHandler(error, ctx)
  }
}