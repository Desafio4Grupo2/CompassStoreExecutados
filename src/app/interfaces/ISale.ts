import { Schema } from 'mongoose'

export interface ISale {
  client: Schema.Types.ObjectId
  clientCurrency: string
  date: string
  items: Array<{
    product: Schema.Types.ObjectId
    qtd: number
    unitValue: number
  }>
  total: number
  totalClient: number
}

export interface ISaleResponse {
  client: Schema.Types.ObjectId
  clientCurrency: string
  date: string
  items: Array<{
    product: Schema.Types.ObjectId
    qtd: number
    unitValue: number
  }>
  total: number
  totalClient: number
  _id: Schema.Types.ObjectId
  __v?: number
}

export interface ISaleItem {
  product: Schema.Types.ObjectId
  qtd: number
  unitValue: number
}
