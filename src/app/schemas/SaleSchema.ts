import { Schema, model, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { ISale } from '../interfaces/ISale'

const schema = new Schema<ISale>({
  client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
  clientCurrency: { type: String, required: true },
  date: { type: String, required: true },
  items: [{
    product: { type: String, required: true },
    qtd: { type: Number, required: true },
    unitValue: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  totalClient: { type: Number, required: true }
})

schema.plugin(paginate)

const Sale = model<ISale, PaginateModel<ISale>>('Sale', schema)

export default Sale
