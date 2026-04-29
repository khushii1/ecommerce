import Joi from 'joi';
export const signupSchema = Joi.object({ name:Joi.string().min(2).required(), email:Joi.string().email().required(), password:Joi.string().min(6).required(), role:Joi.string().valid('user','admin').optional(), phone:Joi.string().allow('',null), address:Joi.string().allow('',null) });
export const loginSchema = Joi.object({ email:Joi.string().email().required(), password:Joi.string().required() });
export const forgotPasswordSchema = Joi.object({ email:Joi.string().email().required() });
export const resetPasswordSchema = Joi.object({ password:Joi.string().min(6).required() });
