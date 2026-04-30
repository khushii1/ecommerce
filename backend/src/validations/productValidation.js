import Joi from 'joi';
export const productSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  description: Joi.string().allow('', null),
  price: Joi.number().min(0).required(),
  oldPrice: Joi.number().min(0).allow(null).optional(),
  quantity: Joi.number().min(0).required(),
  stock: Joi.number().min(0).optional(),
  badge: Joi.string().allow('', null).optional(),
  category: Joi.string().required(),
  isFeatured: Joi.boolean().optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  description: Joi.string().allow('', null).optional(),
  price: Joi.number().min(0).optional(),
  oldPrice: Joi.number().min(0).allow(null).optional(),
  quantity: Joi.number().min(0).optional(),
  stock: Joi.number().min(0).optional(),
  badge: Joi.string().allow('', null).optional(),
  category: Joi.string().optional(),
  isFeatured: Joi.boolean().optional(),
});
