import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
});