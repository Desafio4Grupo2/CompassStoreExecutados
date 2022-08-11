import { PaginateResult } from 'mongoose'

import { IClient } from '../interfaces/IClient'
import ClientSchema from '../schemas/ClientSchema'

class ClientRepository {
  async get (payload: IClient): Promise<PaginateResult<IClient>> {
    return ClientSchema.paginate(payload, {
      page: 1,
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
    })
  }
}

export default new ClientRepository()
