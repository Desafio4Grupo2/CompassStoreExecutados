import { ISale } from '../interfaces/ISale'
import SaleSchema from '../schemas/SaleSchema'
import { PaginateResult } from 'mongoose'
import customLabels from '../utils/paginate'

class SaleRepository {
  async get (payload: any, page: any): Promise<PaginateResult<ISale>> { // any
    return SaleSchema.paginate(payload, { page, customLabels })
  }

  public async getById (ClientId: string) {
    return SaleSchema.findById(ClientId)
  }

  public async update (id: string, Payload: ISale) {
    return SaleSchema.findByIdAndUpdate(id, Payload, { returnDocument: 'after', runValidators: true })
  }
}

export default new SaleRepository()
