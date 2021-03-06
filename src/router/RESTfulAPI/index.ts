import { Context, DefaultState } from 'koa'
import koaRouter from 'koa-router'
import { getDeviceData } from './deviceData/getDeviceData'
import { addVehicle } from './vehicle/addVehicle'
import { delVehicle } from './vehicle/delVehicle'
import { getVehicle } from './vehicle/getVehicle'
import { getViolations } from './violation/getViolation'
import { addWorker } from './worker/addWorker'
import { delWorker } from './worker/delWorker'
import { getWorkers } from './worker/getWorker'
import { updateWorker } from './worker/updateWorker'

const rest = new koaRouter<DefaultState, Context>()

rest.post('/worker', addWorker)
rest.del('/worker', delWorker)
rest.put('/worker', updateWorker)
rest.get('/worker', getWorkers)

rest.post('/vehicle', addVehicle)
rest.del('/vehicle', delVehicle)
rest.put('/vehicle', updateWorker)
rest.get('/vehicle', getVehicle)

rest.get('/violation', getViolations)
rest.del('/violation', getViolations)

rest.get('/deviceData', getDeviceData)


export {
  rest,
}