import { PaginateResult } from 'mongoose'
import { IClient, IClientResponse } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'
import bcrypt from 'bcryptjs'
import BadRequestError from '../errors/BadRequestError'

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
    const salt = await bcrypt.genSalt(10)
    payload.password = await bcrypt.hash(payload.password, salt)

    const result = await ClientRepository.create(payload)

    if (result) {
      throw new BadRequestError('Client not created')
    }

    result.cpf = result.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    return result
  }
}

export default new ClientService()
