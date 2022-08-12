import { IProduct, IProductResponse } from '../interfaces/IProduct'
import ProductSchema from '../schemas/ProductSchema'

class ProductRepository {
  //async create (payload: IProduct): Promise<IProductResponse> {
    //return ProductSchema.create(payload)
  //}

  public async updateProduct (ProductId: string, Payload: IProduct) {
    return ProductSchema.findByIdAndUpdate(ProductId, Payload, { new: true })
  }
}

export default new ProductRepository()
