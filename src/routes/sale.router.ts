import { Router } from 'express'
import SaleController from '../app/controllers/SaleController'
// import createValidation from '../app/validations/sale/create'
import updateValidation from '../app/validations/sale/SaleUpdateValidate'

const routes = Router()

// routes.post('api/v1/sale', createValidation, SaleController.post)
routes.get('/api/v1/sale', SaleController.get)
routes.get('/api/v1/sale/:id', SaleController.getById)
routes.put('/api/v1/sale/:id', updateValidation, SaleController.update)
// routes.delete('/api/v1/sale/:id', SaleController.delete)

export default routes
