import { Schema } from 'mongoose'

export interface IClient {
  name: string
  cpf: string
  birthday: String
  email: string
  password: string
  cep: string
  uf: string
  city: string
  address: string
  number: number
  complement: string
  neighborhood: string
}

export interface IClientResponse {
  name: string
  cpf: string
  birthday: Date
  email: string
  password?: string
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

export interface IViaCepResponse {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}
