import { IProduct, IProductResponse } from '../interfaces/IProduct'
import ProductSchema from '../schemas/ProductSchema'

class ProductRepository {
  async create (payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload)
  }
}

export default new ProductRepository()
