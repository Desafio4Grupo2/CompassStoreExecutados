import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const isValidBirthday = (value: string, helpers: any) => { // any
  const birthday = value.trim()
  const isValidDate = birthday.match(/^\d{2}\/\d{2}\/\d{4}$/)
  if (!isValidDate) return helpers.message('Birthday format is not valid (DD/MM/YYYY)')

  const date = birthday.split('/')

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
      name: Joi.string().optional().trim(),
      birthday: Joi.string().optional().custom(isValidBirthday),
      password: Joi.string().optional().trim().min(6),
      cep: Joi.string().optional().min(8).max(8),
      address: Joi.string().optional().trim(),
      number: Joi.string().optional(),
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
