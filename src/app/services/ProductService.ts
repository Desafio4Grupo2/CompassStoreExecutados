import { PaginateResult } from 'mongoose'
import { IProduct } from '../interfaces/IProduct'
import ProductRepository from '../repositories/ProductRepository'

class ProductService {
  public async get (payload: any, page: any): Promise<PaginateResult<IProduct>> { // any
    const query: {[key:string]: object | boolean} = {}
    Object.keys(payload).forEach(key => {
      if (key === 'maxPrice') {
        query.price = { $lt: payload[key] }
        return
      }
      if (key === 'minPrice') {
        query.price = { $gt: payload[key] }
        return
      }
      query[key] = { $regex: payload[key] }
    })

    const result = await ProductRepository.get(query, page || 1)

    return result
  }
}

export default new ProductService()
