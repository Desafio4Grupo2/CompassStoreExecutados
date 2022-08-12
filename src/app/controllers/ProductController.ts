import ProductService from '../services/ProductService'
import { Request, Response } from 'express'

class ProductController {
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const { page, ...body } = req.query

      const result = await ProductService.get(body, page)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}

export default new ProductController()
