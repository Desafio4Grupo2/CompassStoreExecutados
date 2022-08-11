import { Request, Response } from 'express'

import ClientService from '../services/ClientService'

class ClientController {
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const body = req.query

      const result = await ClientService.get(body)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new ClientController()
