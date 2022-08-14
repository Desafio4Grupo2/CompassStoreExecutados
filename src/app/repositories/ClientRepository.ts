import { PaginateResult } from 'mongoose'
import { IClient } from '../interfaces/IClient'
import ClientSchema from '../schemas/ClientSchema'
import customLabels from '../utils/paginate'

class ClientRepository {
  public async get (payload: any, page: any): Promise<PaginateResult<IClient>> { // any
    return ClientSchema.paginate(payload, { page, select: ['-password', '-birthday'], customLabels })
  }

  public async getById (id: string) {
    return ClientSchema.findById(id).select('-password')
  }

  public async getByCpf (cpf: string) {
    return ClientSchema.findOne({ cpf })
  }

  public async getByEmail (email: string) {
    return ClientSchema.findOne({ email })
  }

  public async create (payload: IClient): Promise<any> {
    return ClientSchema.create(payload)
  }

  public async update (id: string, payload: IClient): Promise<any> {
    return ClientSchema.findByIdAndUpdate(id, payload, { new: true }).select('-password')
  }

  async delete (id: string): Promise<void> {
    await ClientSchema.findByIdAndDelete(id)
  }
}

export default new ClientRepository()
