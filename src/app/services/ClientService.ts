import { PaginateResult } from 'mongoose'

import { IClient } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'

class ClientService {
  async get (payload: any): Promise<PaginateResult<IClient>> {
    const result = await ClientRepository.get(payload)
    return result
  }
}

export default new ClientService()
