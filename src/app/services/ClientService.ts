import { PaginateResult } from 'mongoose'
import { IClient, IClientResponse, IViaCepResponse } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'
import bcrypt from 'bcryptjs'
import BadRequestError from '../errors/BadRequestError'
import axios from 'axios'
import NotFoundError from '../errors/NotFoundError'

class ClientService {
  public async get (payload: any, page: any): Promise<PaginateResult<IClient>> { // any
    const query: {[key:string]: object | boolean} = {}
    Object.keys(payload).forEach(key => {
      query[key] = { $regex: payload[key] }
    })

    const result = await ClientRepository.get(query, page || 1)

    return result
  }

  public async updateClient (ClientId: string, Payload: IClient) {
    const findedClient = await ClientRepository.getClient(ClientId)
    if (!findedClient) {
      throw new NotFoundError('Client not found')
    }
    const result = await ClientRepository.updateClient(ClientId, Payload)
    return result
  }

  public async getClient (Id: any) {
    const result = await ClientRepository.getClient(Id)
    return result
  }

  public async create (payload: IClient): Promise<IClientResponse> {
    const { cep } = payload

    const viacepResponse: IViaCepResponse = await axios
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error.message)
      })

    if (viacepResponse.erro) throw new BadRequestError('Cep is not valid')

    const { uf, localidade, logradouro, complemento, bairro } = viacepResponse

    payload.uf = uf
    payload.city = localidade
    payload.address = logradouro
    payload.neighborhood = bairro
    payload.complement = complemento

    if (payload.uf === '') throw new BadRequestError('Uf can not be empty')
    if (payload.city === '') throw new BadRequestError('City can not be empty')
    if (payload.address === '') throw new BadRequestError('Address can not be empty')
    if (payload.neighborhood === '') throw new BadRequestError('Neighborhood can not be empty')

    const salt = await bcrypt.genSalt(10)
    payload.password = await bcrypt.hash(payload.password, salt)

    const result = await ClientRepository.create(payload)
    if (!result) throw new BadRequestError('Client not created')

    result.cpf = result.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    return result
  }
}

export default new ClientService()
