import { PaginateResult, Types } from 'mongoose'
import { ISale, ISaleItem, ISaleResponse } from '../interfaces/ISale'
import SaleRepository from '../repositories/SaleRepository'
import ClientRepository from '../repositories/ClientRepository'
import NotFoundError from '../errors/NotFoundError'
import BadRequestError from '../errors/BadRequestError'
import ProductRepository from '../repositories/ProductRepository'

class SaleService {
  public async get (payload: any, page: any): Promise<PaginateResult<ISale>> { // any
    if (payload.client) {
      const client = await ClientRepository.getById(payload.client)
      if (!client) {
        throw new Error('Client não existe')
      }
    }
    const query: {[key:string]: object | boolean} = {}
    Object.keys(payload).forEach(key => {
      if (key === 'client') {
        query[key] = payload[key]
      }

      query[key] = { $regex: payload[key] }
    })
    const result = await SaleRepository.get(query, page || 1)

    if (!result) throw new NotFoundError('Sale Not Found')

    return result
  }

  public async getById (id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await SaleRepository.getById(id)

    if (!result) throw new NotFoundError('Sale Not Found')

    return result
  }

  public async update (id: string, Payload: ISale) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await SaleRepository.update(id, Payload)

    if (!result) throw new NotFoundError('Sale Not Found')

    return result
  }

  public async deleteSale (id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Sale ID is not valid')

    const result = await SaleRepository.deleteSale(id)

    if (!result) throw new NotFoundError('Sale Not Found')

    return result
  }

  public async createSale (payload: ISale): Promise<ISaleResponse> {
    payload.items.forEach(async (item: ISaleItem) => {
      const productId = new Types.ObjectId(item.product)
      const product = await ProductRepository.getProductByID(productId)

      if (!product) {
        throw new Error('Product not found')
      }

      item.unitValue = product.price
    })

    const result = await SaleRepository.createSale(payload)

    return result
  }
}

export default new SaleService()
