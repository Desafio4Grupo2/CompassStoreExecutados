import { Router } from 'express'
import SaleController from '../app/controllers/SaleController'
import SaleCreateValidation from '../app/validations/sale/SaleCreateValidate'
import updateValidation from '../app/validations/sale/SaleUpdateValidate'

const routes = Router()

routes.get('/api/v1/sale', SaleController.get)
routes.get('/api/v1/sale/:id', SaleController.getById)
routes.post('/api/v1/sale', SaleCreateValidation, SaleController.create)
routes.put('/api/v1/sale/:id', updateValidation, SaleController.update)
routes.delete('/api/v1/sale/:id', SaleController.delete)

export default routes
