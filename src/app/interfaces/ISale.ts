import { Schema, Document } from 'mongoose'

export interface ISale {
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

export interface ISaleResponse {
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
