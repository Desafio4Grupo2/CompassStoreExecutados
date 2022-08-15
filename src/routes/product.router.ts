import { Router } from 'express'
import ProductController from '../app/controllers/ProductController'
import ProductUpdateValidation from '../app/validations/product/ProductUpdateValidation'
import ProductCreateValidate from '../app/validations/product/ProductCreateValidate'

const routes = Router()

routes.get('/api/v1/product', ProductController.get)
routes.get('/api/v1/product/:id', ProductController.getById)
routes.post('/api/v1/product', ProductCreateValidate, ProductController.create)
routes.put('/api/v1/product/:id', ProductUpdateValidation, ProductController.update)
routes.delete('/api/v1/product/:id', ProductController.delete)

export default routes
