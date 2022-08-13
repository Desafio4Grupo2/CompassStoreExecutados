import { IClientResponse, IClient } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'

class ClientService {
  // async get (payload: IClient): Promise<IClientResponse> {
  //   const result = await ClientRepository.create(payload)
  //   return result
  // }

  async delete (id: any) {
    const result = await ClientRepository.delete(id)
    return result
  }
}

export default new ClientService()
