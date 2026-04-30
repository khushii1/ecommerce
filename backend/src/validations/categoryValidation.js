import Joi from 'joi';
export const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().allow('', null),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string(),
  image: Joi.string(),
  description: Joi.string().allow('', null),
}).min(1);
