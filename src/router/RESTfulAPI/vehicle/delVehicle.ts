import { Context } from 'koa'
import { collections } from '../../../model/DB'
import { errorHandler } from '../../../util/errorHandler'
import joi from 'joi'
import { pick } from 'lodash'

// check
const paramsSchema = joi.object({
  id: joi.number().required(),
})

export async function delVehicle(ctx: Context): Promise<void> {
  try {
    const {
      value: params,
      error,
    } = paramsSchema.validate(ctx.query)

    if (error) {
      throw new Error(error.message)
    }

    await collections.Vehicle.deleteOne(pick(params, ['id']))

    ctx.manager.delVehicle(params.id)

    ctx.body = {
      code: 0,
      data: {
        deleted: { id: params.id }
      }
    }
  } catch (error) {
    errorHandler(error, ctx)
  }
}