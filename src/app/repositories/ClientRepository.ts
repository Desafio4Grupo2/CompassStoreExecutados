import { IClient } from '../interfaces/IClient'
import ClientSchema from '../schemas/ClientSchema'

class ClientRepository {
  async create (payload: IClient): Promise<any> {
    return ClientSchema.create(payload)
  }
}

export default new ClientRepository()
