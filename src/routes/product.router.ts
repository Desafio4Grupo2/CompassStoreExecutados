import { Router } from 'express'
import ProductController from '../app/controllers/ProductController'
import ProductUpdateValidation from '../app/validations/product/ProductUpdateValidation'

const routes = Router()

routes.put('/api/v1/product/:id', ProductUpdateValidation, ProductController.updateProduct)
routes.get('/api/v1/product', ProductController.get)

export default routes
