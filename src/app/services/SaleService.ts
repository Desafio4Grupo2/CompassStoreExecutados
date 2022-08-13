import { PaginateResult } from 'mongoose'
import { ISale } from '../interfaces/ISale'
import SaleRepository from '../repositories/SaleRepository'
import ClientRepository from '../repositories/ClientRepository'

class SaleService {
  public async get (payload: any, page: any): Promise<PaginateResult<ISale>> { // any
    if (payload.client) {
      const client = await ClientRepository.getById(payload.client)
      if (!client) {
        throw new Error('Client não existe')
      }
    }
    console.log(payload)
    const query: {[key:string]: object | boolean} = {}
    Object.keys(payload).forEach(key => {
      if (key === 'client') {
        query[key] = payload[key]
      }

      query[key] = { $regex: payload[key] }
    })
    console.log(payload)
    const result = await SaleRepository.get(query, page || 1)

    return result
  }
}

export default new SaleService()
