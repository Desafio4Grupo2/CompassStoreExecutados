import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      _id: Joi.string()
        .optional(),
      name: Joi.string()
        .min(3)
        .max(100)
        .optional(),
      cpf: Joi.string()
        .optional()
        .min(11)
        .max(11)
        .pattern(/^[0-9]+$/),
      birthday: Joi.date()
        .iso()
        .max('now'),
      email: Joi.string()
        .optional()
        .email(),
      password: Joi.string()
        .optional()
        .min(6)
        .max(20),
      cep: Joi.string()
        .min(8)
        .max(8)
        .optional()
        .pattern(/^[0-9]+$/),
      uf: Joi.string()
        .min(2)
        .max(2)
        .optional()
        .pattern(/^[a-zA-Z]+$/),
      city: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .pattern(/^[a-zA-Z]+$/),
      address: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .pattern(/^[a-zA-Z]+$/),
      number: Joi.string()
        .min(1)
        .optional()
        .max(10),
      complement: Joi.string()
        .optional()
        .min(3)
        .max(50),
      neighborhood: Joi.string()
        .optional()
        .min(3)
        .max(50)
    })
    const { error } = await schema.validateAsync(req.body, { abortEarly: true })
    if (error) throw error.message
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
