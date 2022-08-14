import { ISale } from './../interfaces/ISale'
import SaleService from '../services/SaleService'
import { Request, Response } from 'express'

class SaleController {
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const { page, ...body } = req.query

      const result = await SaleService.get(body, page)
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

      const body = await SaleService.getById(id)

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

  public async update (req: Request, res: Response) {
    try {
      const _id = req.params.id
      const body = req.body
      const result = await SaleService.update(_id, body)
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

  public async deleteSale (req: Request, res: Response) {
    try {
      const _id = req.params.id
      await SaleService.deleteSale(_id)
      return res.status(204).json()
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  public async createSale (req: Request, res: Response): Promise<Response> {
    try {
      const payload: ISale = req.body
      const result = await SaleService.createSale(payload)
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
}

export default new SaleController()
