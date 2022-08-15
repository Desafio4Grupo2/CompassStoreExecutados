import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const isValidDate = (value: string, helpers: any) => { // any
  const trimDate = value.trim()
  const isValidDate = trimDate.match(/^\d{2}\/\d{2}\/\d{4}$/)

  if (!isValidDate) return helpers.message('Date format is not valid (DD/MM/YYYY)')

  const date = trimDate.split('/')

  const numberday = parseInt(date[0])
  const numbermonth = parseInt(date[1])
  const numberyear = parseInt(date[2])

  if (numberday < 1 || numberday > 31) {
    return helpers.message('Day need to be between 1 and 31')
  }

  if (numbermonth < 1 || numbermonth > 12) {
    return helpers.message('Month need to be between 1 and 12')
  }

  if (numberyear < 1900 || numberyear >= new Date().getFullYear()) {
    return helpers.message('Year need to be between 1900 and current year')
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      client: Joi.string()
        .optional()
        .trim(),
      date: Joi.string()
        .custom(isValidDate)
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
        { message: error.message }
      ]
    })
  }
}
