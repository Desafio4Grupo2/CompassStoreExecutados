import { Schema, Document } from 'mongoose'

export interface IProduct {
  name: string
  category: string
  currency: string
  price: number
}

export interface IProductResponse {
  name: string
  category: string
  currency: string
  price: number
  _id: Schema.Types.ObjectId
  __v?: number
}
