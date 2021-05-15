import joi from 'joi'
import { Context } from 'koa'
import { pull } from '../../../model/Data'
import { errorHandler } from '../../../util/errorHandler'

// check
const paramsSchema = joi.object({
  device: joi.number().required(),
})

export async function getDeviceData(ctx: Context): Promise<void> {
  try {
    const {
      value: params,
      error,
    } = paramsSchema.validate(ctx.query)

    if (error) {
      throw new Error(error.message)
    }

    const deviceData = await pull(params.device)
    if (deviceData !== undefined) {
      ctx.body = {
        code: 0,
        data: {
          device: deviceData
        }
      }
    } else {
      throw new Error('device 不存在')
    }
  } catch (error) {
    errorHandler(error, ctx)
  }
}