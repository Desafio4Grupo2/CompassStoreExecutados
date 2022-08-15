import NotFoundError from '../errors/NotFoundError'
import { PaginateResult, Types } from 'mongoose'
import { IProduct } from '../interfaces/IProduct'
import ProductRepository from '../repositories/ProductRepository'
import BadRequestError from '../errors/BadRequestError'

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
    const Client: any = result.Client // any is required because the Client is not accepting the type Client[]

    if (Client.length === 0) throw new NotFoundError('Product not Found')

    return result
  }

  public async getById (id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Product id is not valid')
    const result = await ProductRepository.getById(id)

    if (!result) throw new NotFoundError('Product not found')

    return result
  }

  public async create (payload: IProduct): Promise<IProduct> {
    const result = await ProductRepository.create(payload)

    if (!result) throw new BadRequestError('Product not created')

    return result
  }

  public async update (id: string, payload: IProduct) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Product id is not valid')

    if (Object.keys(payload).length === 0) throw new BadRequestError('No body')

    const foundProduct = await ProductRepository.getById(id)
    if (!foundProduct) {
      throw new NotFoundError('Product not found')
    }
    const result = await ProductRepository.updateProduct(id, payload)

    if (!result) throw new BadRequestError('Product not updated')

    return result
  }

  public async delete (id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Product id is not valid')

    const findedProduct = await ProductRepository.getById(id)
    if (!findedProduct) throw new NotFoundError('Product not found')

    await ProductRepository.delete(id)
  }
}

export default new ProductService()
