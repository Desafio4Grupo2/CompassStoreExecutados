import { PaginateResult } from 'mongoose'
import { IClient } from '../interfaces/IClient'
import ClientSchema from '../schemas/ClientSchema'
import customLabels from '../utils/paginate'

class ClientRepository {
  public async get (payload: any, page: any): Promise<PaginateResult<IClient>> { // any
    return ClientSchema.paginate(payload, { page, select: ['-password', '-birthday'], customLabels })
  }

  public async updateClient (ClientId: string, Payload: IClient) {
    return ClientSchema.findByIdAndUpdate(ClientId, Payload, { new: true }).select('-password')
  }

  public async getById (ClientId: string) {
    return ClientSchema.findById(ClientId).select('-password')
  }

  public async create (payload: IClient): Promise<any> {
    return ClientSchema.create(payload)
  }

  public async getByCpf (cpf: string) {
    return ClientSchema.findOne({ cpf })
  }

  public async getByEmail (email: string) {
    return ClientSchema.findOne({ email })
  }

  async delete (id: string): Promise<void> {
    await ClientSchema.findByIdAndDelete(id)
  }
}

export default new ClientRepository()
