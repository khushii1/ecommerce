import Joi from 'joi';
export const contactSchema = Joi.object({ name:Joi.string().required(), email:Joi.string().email().required(), message:Joi.string().min(5).required() });
