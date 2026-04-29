import Joi from 'joi';
export const blogSchema = Joi.object({ title:Joi.string().required(), slug:Joi.string().required(), content:Joi.string().required(), coverImage:Joi.string().allow('',null).optional() });
