import { Schema, Document } from 'mongoose'

export interface IClient extends Document {
  name: string
  cpf: string
  birthday: string
  email: string
  password: string
  cep: string
  uf: string
  city: string
  address: string
  number: string
  complement: string
  neighborhood: string
}

export interface IClientResponse extends Document {
  name: string
  cpf: string
  birthday: string
  email: string
  password: string
  cep: string
  uf: string
  city: string
  address: string
  number: string
  complement: string
  neighborhood: string
  _id: Schema.Types.ObjectId
  __v?: number
}
