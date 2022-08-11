import { ISale } from '../interfaces/ISale'
import SaleSchema from '../schemas/SaleSchema'

class SaleRepository {
  async create (payload: ISale): Promise<ISale> {
    return SaleSchema.create(payload)
  }
}

export default new SaleRepository()
