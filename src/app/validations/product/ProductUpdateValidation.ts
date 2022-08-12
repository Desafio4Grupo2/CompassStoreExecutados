import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      name: Joi.string().optional().trim(),
      category: Joi.string().optional().trim(),
      currency: Joi.string().optional().trim(),
      price: Joi.number().optional().greater(0),
      
    })

    const { error } = await schema.validate(req.body, { abortEarly: false })
    if (error) throw error
    return next()
  } catch (error: any) {
    console.log(error.details.message)
    return res.status(400).json(error)
  }
}