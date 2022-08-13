import { Router } from 'express'
import ClientController from '../app/controllers/ClientController'
import ClientCreateValidate from '../app/validations/client/ClientCreateValidate'
import ClientUpdateValidate from '../app/validations/client/ClientUpdateValidate'

const routes = Router()

routes.get('/api/v1/client/:id', ClientController.getById)
routes.get('/api/v1/client', ClientController.get)
routes.post('/api/v1/client', ClientCreateValidate, ClientController.create)
routes.put('/api/v1/client/:id', ClientUpdateValidate, ClientController.updateClient)
routes.delete('/api/v1/client/:id', ClientController.delete)

export default routes
