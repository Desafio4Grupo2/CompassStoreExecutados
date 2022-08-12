import { IClient } from 'app/interfaces/IClient'
import { Request, Response } from 'express'

import ClientService from '../services/ClientService'

class ClientController {
  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const payload: IClient = req.body
      const result = await ClientService.create(payload)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new ClientController()
