import { IProductResponse, IProduct } from '../interfaces/IProduct'
import ProductRepository from '../repositories/ProductRepository'

class ProductService {

  public async updateProduct (ProductId: any, Payload: IProduct) {
    const result = await ProductRepository.updateProduct(ProductId, Payload)
    return result
  }
}

export default new ProductService()
