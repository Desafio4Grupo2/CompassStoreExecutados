import { IClientResponse, IClient } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'

class ClientService {
  async get (payload: IClient): Promise<IClientResponse> {
    const result = await ClientRepository.create(payload)
    return result
  }

  async create (payload: IClient): Promise<IClientResponse> {
    try {
      // creating the client
      const result = await ClientRepository.create(payload)
      return result
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }
}

export default new ClientService()
