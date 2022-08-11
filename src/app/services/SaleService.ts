import { ISaleResponse, ISale } from '../interfaces/ISale'
import SaleRepository from '../repositories/SaleRepository'

class SaleService {
  async create (payload: ISale): Promise<ISaleResponse> {
    const result = await SaleRepository.create(payload)
    return result
  }
}

export default new SaleService()
