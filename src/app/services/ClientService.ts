import { IClientResponse, IClient } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'

class ClientService {
  async get (payload: IClient): Promise<IClientResponse> {
    const result = await ClientRepository.create(payload)
    return result
  }
}

export default new ClientService()
