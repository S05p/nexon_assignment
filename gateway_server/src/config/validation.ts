import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  USER_SERVICE_PORT: Joi.number().required(),
  EVENT_SERVICE_PORT: Joi.number().required(),
});