import { Router } from 'express'
import ProductController from '../app/controllers/ProductController'
import ProductUpdateValidation from '../app/validations/product/ProductUpdateValidation'
// import createValidation from '../app/validations/product/create'
// import updateValidation from '../app/validations/product/update'

const routes = Router()

// routes.post('api/v1/product', createValidation, ProductController.post)
// routes.get('/api/v1/product', ProductController.get)
routes.put('/api/v1/product/:id', ProductUpdateValidation, ProductController.updateProduct)
// routes.delete('/api/v1/product/:id', ProductController.delete)

export default routes
