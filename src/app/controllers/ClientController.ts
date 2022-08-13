import { IClient } from 'app/interfaces/IClient'
import { Request, Response } from 'express'
import ClientService from '../services/ClientService'

class ClientController {
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const { page, ...body } = req.query

      const result = await ClientService.get(body, page)

      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  public async getById (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id

      const body = await ClientService.getById(id)

      return res.status(200).json(body)
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  public async updateClient (req: Request, res: Response) {
    try {
      const _id = req.params.id
      const { name, cpf, birthday, email, password, cep, uf, city, address, number, complement, neighborhood } = req.body
      const result = await ClientService.updateClient(_id, { name, cpf, birthday, email, password, cep, uf, city, address, number, complement, neighborhood })
      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const payload: IClient = req.body
      const result = await ClientService.create(payload)
      return res.status(201).json(result)
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const _id = req.params.id
      const request = ClientService.delete(_id)

      return res.status(204).json({message: `Client ${_id} successfully deleted`})
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }
}

export default new ClientController()