import { IClientResponse, IClient } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'

class ClientService {
  

  async updateClient(ClientId: any, Payload: IClient){
    const result = await ClientRepository.updateClient(ClientId, Payload);
    return result;
  }
}

export default new ClientService()
