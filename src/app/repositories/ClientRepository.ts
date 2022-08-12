import { PaginateResult } from 'mongoose'

import { IClient } from '../interfaces/IClient'
import ClientSchema from '../schemas/ClientSchema'

class ClientRepository {
  public async get (payload: any): Promise<PaginateResult<IClient>> { // any
    console.log(payload)
    return ClientSchema.paginate(payload,
      {
        page: 1,
        select: [
          'name',
          'cpf',
          'email',
          'cep',
          'uf',
          'city',
          'address',
          'number',
          'complement',
          'neighborhood'
        ],
        customLabels: {
          docs: 'Client',
          page: 'currentPage',
          totalPages: 'totalPages',
          limit: 'pageSize',
          totalDocs: 'totalCount',
          offset: false,
          pagingCounter: false,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: false,
          nextPage: false
        }
      }
    )
  }

  public async updateClient (ClientId: string, Payload: IClient) {
    return ClientSchema.findByIdAndUpdate(ClientId, Payload, { new: true }).select('-password')
  }
}

export default new ClientRepository()
