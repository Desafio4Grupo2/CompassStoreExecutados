import { PaginateResult, Types } from 'mongoose'
import { ISale } from '../interfaces/ISale'
import SaleRepository from '../repositories/SaleRepository'
import ClientRepository from '../repositories/ClientRepository'
import NotFoundError from '../errors/NotFoundError'
import BadRequestError from '../errors/BadRequestError'
import ProductRepository from '../repositories/ProductRepository'
import getBid from '../utils/getBid'

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

  public async create (payload: ISale): Promise<any> {
    const { clientCurrency } = payload
    payload.total = 0
    payload.totalClient = 0

    for (const item of payload.items) {
      const id = item.product.toString()
      const product = await ProductRepository.getById(id)

      if (!product) {
        throw new NotFoundError('Product not found')
      }

      item.unitValue = product.price
      payload.total += item.qtd * item.unitValue
    }

    const bid = await getBid(clientCurrency)
    payload.totalClient = bid * payload.total

    const result = await SaleRepository.create(payload)

    if (!result) throw new BadRequestError('Sale not created')

    return result
  }

  public async update (id: string, Payload: ISale) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await SaleRepository.update(id, Payload)

    if (!result) throw new BadRequestError('Sale Not Updated')

    return result
  }

  public async delete (id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Sale ID is not valid')

    const result = await SaleRepository.delete(id)

    if (!result) throw new BadRequestError('Sale Not Deleted')

    return result
  }
}

export default new SaleService()
