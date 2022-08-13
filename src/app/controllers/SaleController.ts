import SaleService from '../services/SaleService'
import { Request, Response } from 'express'

class SaleController {
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const { page, ...body } = req.query

      const result = await SaleService.get(body, page)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}

export default new SaleController()
