import { Router } from 'express'
import ClientController from '../app/controllers/ClientController'
import ClientCreateValidate from '../app/validations/client/ClientCreateValidate'
import ClientUpdateValidate from '../app/validations/client/ClientUpdateValidate'
import ClientGetValidate from '../app/validations/client/ClientGetValidate'

const routes = Router()
routes.get('/api/v1/client/:id', ClientController.getById)
routes.get('/api/v1/client', ClientGetValidate, ClientController.get)
routes.post('/api/v1/client', ClientCreateValidate, ClientController.create)
routes.put('/api/v1/client/:id', ClientUpdateValidate, ClientController.updateClient)


export default routes
