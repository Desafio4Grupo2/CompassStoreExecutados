import { PaginateResult, Types } from 'mongoose'
import { IClient, IClientResponse, IViaCepResponse } from '../interfaces/IClient'
import ClientRepository from '../repositories/ClientRepository'
import bcrypt from 'bcryptjs'
import BadRequestError from '../errors/BadRequestError'
import NotFoundError from '../errors/NotFoundError'
import getAddress from '../utils/viacep'

class ClientService {
  public async get (payload: any, page: any): Promise<PaginateResult<IClient>> { // any
    const query: {[key:string]: object | boolean} = {}
    Object.keys(payload).forEach(key => {
      query[key] = { $regex: payload[key] }
    })

    const result = await ClientRepository.get(query, page || 1)

    if (!result) throw new NotFoundError('Sale Not Found')

    return result
  }

  public async updateClient (ClientId: string, payload: IClient) {
    const { cep } = payload
    const viacepResponse: IViaCepResponse = await getAddress(cep)

    const { uf, localidade, logradouro, complemento, bairro } = viacepResponse

    payload.uf = uf
    payload.city = localidade
    payload.address = logradouro
    payload.neighborhood = bairro
    payload.complement = complemento

    if (!Types.ObjectId.isValid(ClientId)) throw new BadRequestError('ClientId is not valid')

    const findedClient = await ClientRepository.getById(ClientId)
    if (!findedClient) {
      throw new NotFoundError('Client not found')
    }
    const result = await ClientRepository.updateClient(ClientId, payload)
    return result
  }

  public async getById (Id: any) {
    const result = await ClientRepository.getById(Id)

    return result
  }

  public async create (payload: IClient): Promise<IClientResponse> {
    const { cpf, email, cep } = payload

    const findedWithCpfClient = await ClientRepository.getByCpf(cpf)
    if (findedWithCpfClient) throw new BadRequestError('Client with this cpf already exists')

    const findedWithEmailClient = await ClientRepository.getByEmail(email)
    if (findedWithEmailClient) throw new BadRequestError('Client with this email already exists')

    const viacepResponse: IViaCepResponse = await getAddress(cep)

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

  public async delete (id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestError('Client Id is not valid')
    const findedClient = await ClientRepository.getById(id)
    if (!findedClient) {
      throw new NotFoundError('Client not found')
    }
    await ClientRepository.delete(id)
  }
}

export default new ClientService()
