import { Router } from 'express'
import ClientController from '../app/controllers/ClientController'
// import createValidation from '../app/validations/client/create'
import updateValidation from '../app/validations/client/UpdateCreateValidate'

const routes = Router()

//routes.post('api/v1/client', createValidation, ClientController.post)
//routes.get('/api/v1/client', ClientController.get)
routes.put('/api/v1/client/:id', updateValidation, ClientController.updateClient)
// routes.delete('/api/v1/client/:id', ClientController.delete)

export default routes
