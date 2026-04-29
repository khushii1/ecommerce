import Joi from 'joi';
export const categorySchema = Joi.object({ name:Joi.string().required(), slug:Joi.string().required(), description:Joi.string().allow('',null) });
