import { StatusCodes } from 'http-status-codes';
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) return next();
  return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Validation failed', errors: error.details.map((d) => d.message) });
};
export default validate;
