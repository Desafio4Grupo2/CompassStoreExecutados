import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      client: Joi.string()
        .optional()
        .trim(),
      date: Joi.string()
        .optional()
        .trim(),
      items: Joi.array()
        .items(
          Joi.object({
            product: Joi.string()
              .optional()
              .trim(),
            qtd: Joi.number()
              .optional(),
            unitValue: Joi.number()
              .optional()
          })
        ),
      clientCurrency: Joi.string()
        .optional()
        .trim(),
      total: Joi.number()
        .optional(),
      totalClient: Joi.number()
        .optional()
    })

    const { error } = await schema.validate(req.body, { abortEarly: false })
    if (error) throw error
    return next()
  } catch (error: any) {
    return res.status(400).json({
      message: 'Bad Request Error',
      details: [
        { message: error.details }
      ]
    })
  }
}
