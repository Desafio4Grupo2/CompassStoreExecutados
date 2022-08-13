import ClientService from '../services/ClientService'

import { Request, Response } from 'express'
class ClientController {
  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const _id = req.params.id

      const request = ClientService.delete(_id)

      return res.status(204).json(request)
    } catch (error) {
      return res.status(404).json({ error })
    }
  }
}

export default new ClientController()
