import { PaginateResult } from 'mongoose'
import { IClient, IClientResponse } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'
import bcrypt from 'bcryptjs'

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

  async create (payload: IClient): Promise<IClientResponse> {
    try {
      // hashing the password
      const salt = await bcrypt.genSalt(10)
      payload.password = await bcrypt.hash(payload.password, salt)

      // creating the client
      const result = await ClientRepository.create(payload)

      // formatting cpf
      result.cpf = result.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      return result
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }
}

export default new ClientService()
