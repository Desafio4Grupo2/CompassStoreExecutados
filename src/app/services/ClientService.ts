import { PaginateResult } from 'mongoose'

import { IClient } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'

class ClientService {
  async get (payload: any): Promise<PaginateResult<IClient>> { // any
    const query: {[key:string]: object | boolean} = {}
    Object.keys(payload).forEach(key => {
      query[key] = { $regex: payload[key] }
    })

    const result = await ClientRepository.get(query)

    return result
  }
}

export default new ClientService()
