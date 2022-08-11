import { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  category: string
  currency: string
  price: number
}

export interface IProductResponse extends Document {
  name: string
  category: string
  currency: string
  price: number
  _id: Schema.Types.ObjectId
  __v?: number
}
