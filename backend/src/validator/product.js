import ResponseHandler from '../helpers/responseHandler.js'
import Joi from 'joi'

const schema = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  handle: Joi.string().required(),
  price: Joi.number().required(),
  publish: Joi.boolean(),
  status: Joi.any(),
  thumbnail: Joi.any(),
  images: Joi.any(),
  vendorId: Joi.any(),
}

let createSchema = {}
Array.from([
  'title',
  'description',
  'handle',
  'price',
  'publish',
  'status',
  'thumbnail',
  'images',
  'vendorId',
]).forEach((key) => (createSchema[key] = schema[key]))
createSchema = Joi.object(createSchema)

let updateSchema = {}
Array.from([
  'title',
  'description',
  'handle',
  'price',
  'publish',
  'status',
  'thumbnail',
  'images',
  'vendorId',
]).forEach((key) => (updateSchema[key] = schema[key]))
updateSchema = Joi.object(updateSchema)

export default {
  create: async (req, res, next) => {
    try {
      await createSchema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res, next) => {
    try {
      await updateSchema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
