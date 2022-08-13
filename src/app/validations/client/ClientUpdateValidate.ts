import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      name: Joi.string().optional().trim(),
      birthday: Joi.date().optional(),
      password: Joi.string().optional().trim().min(6),
      cep: Joi.string().optional().trim().min(8).max(8),
      address: Joi.string().optional().trim(),
      number: Joi.number().optional(),
      complement: Joi.string().optional()
    })

    const { error } = await schema.validate(req.body, { abortEarly: false })
    if (error) throw error
    return next()
  } catch (error: any) {
    return res.status(400).json({
      message: 'Bad Request Error',
      details: [
        { message: error.message }
      ]
    })
  }
}
