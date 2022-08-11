import { Schema, model, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { IProduct } from '../interfaces/IProduct'

const schema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  currency: { type: String, required: true },
  price: { type: Number, required: true }
})

schema.plugin(paginate)

const Product = model<IProduct, PaginateModel<IProduct>>('Product', schema)

export default Product
