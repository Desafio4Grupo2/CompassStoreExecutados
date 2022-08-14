import { IProduct } from '../interfaces/IProduct'
import ProductSchema from '../schemas/ProductSchema'
import { PaginateResult } from 'mongoose'
import customLabels from '../utils/paginate'

class ProductRepository {
  async create (payload: IProduct) {
    return ProductSchema.create(payload)
  }

  public async updateProduct (ProductId: string, Payload: IProduct) {
    return ProductSchema.findByIdAndUpdate(ProductId, Payload, { new: true })
  }

  // Temporário até função getByID ser implementada por quem puxa-la
  public async getProductByID (ProductId: string) {
    return ProductSchema.findById(ProductId)
  }

  async get (payload: any, page: any): Promise<PaginateResult<IProduct>> { // any
    return ProductSchema.paginate(payload, { page, customLabels })
  }
  public async deleteProduct (id: string): Promise<void> {
    await ProductSchema.findByIdAndDelete(id)
  }
}

export default new ProductRepository()
