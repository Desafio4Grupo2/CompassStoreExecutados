import { Schema, model, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { IClient } from '../interfaces/IClient'

const schema = new Schema<IClient>({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  birthday: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cep: { type: String, required: true },
  uf: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  number: { type: Number, required: true },
  complement: { type: String },
  neighborhood: { type: String, required: true }
})

schema.plugin(paginate)

const Client = model<IClient, PaginateModel<IClient>>('Client', schema)

export default Client
