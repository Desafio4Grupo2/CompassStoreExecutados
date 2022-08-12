import { ISale } from '../interfaces/ISale'
import SaleSchema from '../schemas/SaleSchema'
import { PaginateResult } from 'mongoose'

class SaleRepository {
  async get (payload: any, page: any): Promise<PaginateResult<ISale>> { // any
    return SaleSchema.paginate(payload,
      {
        page,
        customLabels: {
          docs: 'Sales',
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
}

export default new SaleRepository()
