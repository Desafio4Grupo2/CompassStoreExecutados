import { PaginateResult, Types } from 'mongoose'
import { ISale } from '../interfaces/ISale'
import SaleRepository from '../repositories/SaleRepository'
import ClientRepository from '../repositories/ClientRepository'
import NotFoundError from '../errors/NotFoundError'
import BadRequestError from '../errors/BadRequestError'

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

  public async getById (Id: string) {
    if (!Types.ObjectId.isValid(Id)) throw new BadRequestError('Id not valid')

    const result = await SaleRepository.getById(Id)

    if (!result) throw new NotFoundError('Sale Not Found')

    return result
  }
}

export default new SaleService()
