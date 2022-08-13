import { IClient, IClientResponse } from '../interfaces/IClient'
import ClientSchema from '../schemas/ClientSchema'

class ClientRepository {
//   async create (payload: IClient): Promise<IClientResponse> {
//     return ClientSchema.create(payload)
//  }

  async delete (id: any): Promise<void> {
    await ClientSchema.findByIdAndDelete(id);
  }
}

export default new ClientRepository()