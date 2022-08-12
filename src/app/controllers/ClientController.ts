import { Request, Response } from 'express'
import ClientService from '../services/ClientService'

class ClientController {
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const { page, ...body } = req.query

      const result = await ClientService.get(body, page)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  public async getById (req: Request, res: Response): Promise<Response> {
    try {

      const id = req.params.id
      const { name, cpf, birthday, email, cep, uf, city, address, number, complement, neighborhood } = req.body
      const body = await ClientService.getClient(id, { name, cpf, birthday, email, cep, uf, city, address, number, complement, neighborhood })
      return res.status(201).json(body)

    } catch (error) {
      return res.status(400).json({error})
    }
  }
 
  public async updateClient (req: Request, res: Response) {
    try {
      const _id = req.params.id
      const { name, cpf, birthday, email, password, cep, uf, city, address, number, complement, neighborhood } = req.body
      const result = await ClientService.updateClient(_id, { name, cpf, birthday, email, password, cep, uf, city, address, number, complement, neighborhood })
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}

export default new ClientController()
