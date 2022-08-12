import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      _id: Joi.string()
        .forbidden(),
      name: Joi.string()
        .required()
        .min(3)
        .max(100),
      cpf: Joi.string()
        .required()
        .min(11)
        .max(11)
        .pattern(/^[0-9]+$/),
      birthday: Joi.date()
        .iso()
        .max('now')
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(20),
      cep: Joi.string()
        .required()
        .min(8)
        .max(8)
        .pattern(/^[0-9]+$/),
      uf: Joi.string()
        .required()
        .min(2)
        .max(2)
        .pattern(/^[a-zA-Z]+$/),
      city: Joi.string()
        .required()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z]+$/),
      address: Joi.string()
        .required()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z]+$/),
      number: Joi.string()
        .required()
        .min(1)
        .max(10),
      complement: Joi.string()
        .optional()
        .min(3)
        .max(50),
      neighborhood: Joi.string()
        .required()
        .min(3)
        .max(50)
    })
    const { error } = await schema.validate(req.body, { abortEarly: true })
    if (error) throw error.message
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
