import { Router } from 'express'
import ClientCreateValidate from '../app/validations/client/ClientCreateValidate'
import ClientController from '../app/controllers/ClientController'
import updateValidation from '../app/validations/client/UpdateCreateValidate'

const routes = Router()

routes.get('/api/v1/client', ClientController.get)
routes.post('/api/v1/client', ClientCreateValidate, ClientController.create)
routes.put('/api/v1/client/:id', updateValidation, ClientController.updateClient)
// routes.delete('/api/v1/client/:id', ClientController.delete)

export default routes
