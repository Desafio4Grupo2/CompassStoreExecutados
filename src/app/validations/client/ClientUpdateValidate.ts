import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      name: Joi.string().optional().trim(),
      birthday: Joi.date().optional(),
      password: Joi.string().optional().trim().min(6),
      cep: Joi.number().optional(),
      address: Joi.string().optional().trim(),
      number: Joi.number().optional(),
      complement: Joi.string().optional()
    })

    const { error } = await schema.validate(req.body, { abortEarly: false })
    if (error) throw error
    return next()
  } catch (error: any) {
    console.log(error.details.message)
    return res.status(400).json(error)
  }
}
