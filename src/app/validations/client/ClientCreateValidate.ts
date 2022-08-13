import { NextFunction, Request, Response } from 'express'
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
      birthday: Joi.string()
        .custom(isValidBirthday)
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
        .optional()
        .min(2)
        .max(2)
        .pattern(/^[a-zA-Z]+$/),
      city: Joi.string()
        .optional()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z]+$/),
      address: Joi.string()
        .optional()
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
        .optional()
        .min(3)
        .max(50)
    })
    const { error } = await schema.validate(req.body, { abortEarly: true })
    if (error) throw error.message
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
