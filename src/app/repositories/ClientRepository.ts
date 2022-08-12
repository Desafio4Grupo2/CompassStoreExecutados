import { IClient, IClientResponse } from '../interfaces/IClient'
import ClientSchema from '../schemas/ClientSchema'

class ClientRepository {
  

  async updateClient (ClientId: string, Payload: IClient){
    return ClientSchema.findByIdAndUpdate(ClientId, Payload, { new: true }).select('-password');
  }
}

export default new ClientRepository()
