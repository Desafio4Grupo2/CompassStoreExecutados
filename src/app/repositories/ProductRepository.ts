import { IProduct } from '../interfaces/IProduct'
import ProductSchema from '../schemas/ProductSchema'
import { PaginateResult } from 'mongoose'

class ProductRepository {
  // async create (payload: IProduct): Promise<IProductResponse> {
  // return ProductSchema.create(payload)
  // }

  public async updateProduct (ProductId: string, Payload: IProduct) {
    const findedProduct = findByID(ProductId)
    return ProductSchema.findByIdAndUpdate(ProductId, Payload, { new: true })
  } 

  //Temporário até função getByID ser implementada por quem puxa-la
  public async getProductByID (ProductId: string) {
    return ProductSchema.findById(ProductId)
  }

  async get (payload: any, page: any): Promise<PaginateResult<IProduct>> { // any
    return ProductSchema.paginate(payload,
      {
        page,
        customLabels: {
          docs: 'Products',
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

export default new ProductRepository()
function findByID(ProductId: string): any {
  throw new Error('Function not implemented.')
}

