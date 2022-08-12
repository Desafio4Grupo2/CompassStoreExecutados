import { PaginateResult } from 'mongoose'
import { IClient } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'

class ClientService {
  public async get (payload: any, page: any): Promise<PaginateResult<IClient>> { // any
    const query: {[key:string]: object | boolean} = {}
    Object.keys(payload).forEach(key => {
      query[key] = { $regex: payload[key] }
    })

    const result = await ClientRepository.get(query, page || 1)

    return result
  }

  public async updateClient (ClientId: any, Payload: IClient) {
    const result = await ClientRepository.updateClient(ClientId, Payload)
    return result
  }
}

export default new ClientService()
