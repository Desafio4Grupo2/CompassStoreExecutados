import { Router } from 'express'
import ProductController from '../app/controllers/ProductController'
import ProductUpdateValidation from '../app/validations/product/ProductUpdateValidation'
import ProductCreateValidate from '../app/validations/product/ProductCreateValidate'

const routes = Router()

routes.post('/api/v1/product', ProductCreateValidate, ProductController.create)
routes.put('/api/v1/product/:id', ProductUpdateValidation, ProductController.updateProduct)
routes.get('/api/v1/product', ProductController.get)

export default routes
