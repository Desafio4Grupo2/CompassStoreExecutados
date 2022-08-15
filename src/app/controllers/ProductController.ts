import { IProduct } from 'app/interfaces/IProduct'
import { Request, Response } from 'express'
import ProductService from '../services/ProductService'

class ProductController {
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

  public async getById (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const body = await ProductService.getById(id)
      return res.status(200).json(body)
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

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const _id = req.params.id
      const payload: IProduct = req.body
      const result = await ProductService.update(_id, payload)
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

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const _id = req.params.id
      await ProductService.delete(_id)
      return res.status(204).json({ message: `Product ${_id} successfully deleted` })
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

export default new ProductController()
