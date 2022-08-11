import { Schema, Document } from 'mongoose'

export interface ISale extends Document {
  client_id: Schema.Types.ObjectId
  clientCurrency: string
  date: string
  items: Array<[{
    product: string
    qtd: number
    unitValue: number
  }]>
  total: number
  totalClient: number
}

export interface ISaleResponse extends Document {
  client: Schema.Types.ObjectId
  clientCurrency: string
  date: string
  items: Array<[{
    product: string
    qtd: number
    unitValue: number
  }]>
  total: number
  totalClient: number
  _id: Schema.Types.ObjectId
  __v?: number
}
