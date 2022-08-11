import { IClient, IClientResponse } from '../interfaces/IClient'
import ClientSchema from '../schemas/ClientSchema'

class ClientRepository {
  async create (payload: IClient): Promise<IClientResponse> {
    return ClientSchema.create(payload)
  }
}

export default new ClientRepository()
