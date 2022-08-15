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
      if (!client) throw new NotFoundError('Client not found')
    }
    const query: {[key:string]: object | boolean} = {}
    Object.keys(payload).forEach(key => {
      if (key === 'client') {
        query[key] = payload[key]
      }

      query[key] = { $regex: payload[key] }
    })
    const result = await SaleRepository.get(query, page || 1)
    const Sale: any = result.Client // any is required because the Sale is not accepting the type Client[]

    if (Sale.length === 0) throw new NotFoundError('Product not Found')

    return result
  }

  public async getById (id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Id not valid')

    const result = await SaleRepository.getById(id)

    if (!result) throw new NotFoundError('Sale Not Found')

    return result
  }

  public async create (payload: ISale): Promise<ISale> {
    const { clientCurrency, client } = payload
    const clientId = client.toString()

    payload.total = 0
    payload.totalClient = 0

    const foundClient = await ClientRepository.getById(clientId)
    if (!foundClient) throw new NotFoundError('Client not found')

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

  public async update (id: string, payload: ISale): Promise<ISale> {
    const { client, clientCurrency } = payload
    if (client) {
      const clientId = client.toString()
      if (!Types.ObjectId.isValid(clientId)) throw new BadRequestError('Client id is not valid')

      const foundClient: any = ClientRepository.getById(clientId)
      if (!foundClient) throw new NotFoundError('Client not found')
    }

    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Sale id not valid')

    const foundSale = await SaleRepository.getById(id)
    if (!foundSale) throw new NotFoundError('Sale not found')

    if (payload.items && payload.items.length > 0) {
      payload.total = 0
      payload.totalClient = 0

      for (const item of payload.items) {
        if (!item.product) throw new BadRequestError('Need a product id to update')

        const id = item.product.toString()
        const product = await ProductRepository.getById(id)

        if (!product) {
          throw new NotFoundError('Product not found')
        }

        item.unitValue = product.price
        payload.total += item.qtd * item.unitValue
      }

      const bid = await getBid(clientCurrency || foundSale.clientCurrency)
      payload.totalClient = bid * payload.total
    }

    const result = await SaleRepository.update(id, payload)
    if (!result) throw new BadRequestError('Sale not updated')

    return result
  }

  public async delete (id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Sale id is not valid')

    const foundSale = await SaleRepository.getById(id)
    if (!foundSale) throw new NotFoundError('Sale not found')

    const result = await SaleRepository.delete(id)

    if (!result) throw new BadRequestError('Sale not deleted')
  }
}

export default new SaleService()
