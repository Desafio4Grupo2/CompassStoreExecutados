import { IProduct } from 'app/interfaces/IProduct'
import { Request, Response } from 'express'
import ProductService from '../services/ProductService'

class ProductController {
  public async updateProduct (req: Request, res: Response) {
    try {
      const _id = req.params.id
      const { name, category, currency, price } = req.body
      const result = await ProductService.updateProduct(_id, { name, category, currency, price })
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

  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const { page, ...body } = req.query

      const result = await ProductService.get(body, page || 1)
      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const payload: IProduct = req.body
      const result = await ProductService.create(payload)
      return res.status(201).json(result)
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  public async getProductId (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const body = await ProductService.getProductByID(id)
      return res.status(201).json(body)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  public async getProductId (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const body = await ProductService.getProductByID(id)
      return res.status(201).json(body)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}

export default new ProductController()
