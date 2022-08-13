import { PaginateResult } from 'mongoose'
import { ISale } from '../interfaces/ISale'
import SaleRepository from '../repositories/SaleRepository'
// import ClientRepository from '../repositories/ClientRepository'

class SaleService {
  public async get (payload: any, page: any): Promise<PaginateResult<ISale>> { // any
    const query: {[key:string]: object | boolean} = {}
    Object.keys(payload).forEach(key => {
      query[key] = { $regex: payload[key] }
    })

    if (query.client) {
      // const client = await ClientRepository.getById({ _id: query.client })
      // if (!client) {
      //  throw new Error('Client não existe')
      // }
    }

    const result = await SaleRepository.get(query, page || 1)

    return result
  }
}

export default new SaleService()
