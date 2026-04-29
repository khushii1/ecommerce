import Joi from 'joi';
export const updateProfileSchema = Joi.object({ name:Joi.string().min(2).optional(), phone:Joi.string().allow('',null).optional(), address:Joi.string().allow('',null).optional() });
