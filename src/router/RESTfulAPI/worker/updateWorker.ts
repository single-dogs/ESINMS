import { Context } from 'koa'
import { pick } from 'lodash'
import { collections } from '../../../model/DB'
import { errorHandler } from '../../../util/errorHandler'
import joi from 'joi'

// check
const paramsSchema = joi.object({
  id: joi.number().required(),
  name: joi.string(),
  type: joi.string(),
  TimeRange: joi.object({
    start: joi.number(),
    end: joi.number(),
  }),
  openTimeRule: joi.bool(),
  device: joi.number(),
})

export async function updateWorker(ctx: Context): Promise<void> {
  try {
    const {
      value: params,
      error,
    } = paramsSchema.validate(ctx.request.body)

    if (error) {
      throw new Error(error.message)
    }

    const result = await collections.Worker.updateOne(
      { id: params.id },
      pick(params, ['name', 'type', 'timeRange', 'openTimeRule', 'device'])
    )

    // reload obj
    const updated = (await collections.Worker.findOne({ _id: result.upsertedId._id }))

    ctx.manager.reloadWorker(params.id, updated)

    ctx.body = {
      code: 0,
      data: {
        updated:
          pick(updated, ['id', 'name', 'type', 'timeRange', 'openTimeRule', 'device'])
      }
    }
  } catch (error) {
    errorHandler(error, ctx)
  }
}