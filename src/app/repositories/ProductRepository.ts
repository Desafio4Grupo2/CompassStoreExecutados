import { IProduct } from '../interfaces/IProduct'
import ProductSchema from '../schemas/ProductSchema'
import { PaginateResult } from 'mongoose'
import customLabels from '../utils/paginate/product'

class ProductRepository {
  async get (payload: any, page: any): Promise<PaginateResult<IProduct>> {
    return ProductSchema.paginate(payload, { page, customLabels })
  }

  async create (payload: IProduct) {
    return ProductSchema.create(payload)
  }

  public async updateProduct (ProductId: string, Payload: IProduct) {
    return ProductSchema.findByIdAndUpdate(ProductId, Payload, { new: true })
  }

  public async getById (id: string) {
    return ProductSchema.findById(id)
  }

  public async delete (id: string): Promise<void> {
    await ProductSchema.findByIdAndDelete(id)
  }
}

export default new ProductRepository()
