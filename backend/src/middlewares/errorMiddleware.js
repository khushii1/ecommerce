import { StatusCodes } from 'http-status-codes';
export const notFound = (req, res) => res.status(StatusCodes.NOT_FOUND).json({ success: false, message: `Route not found: ${req.originalUrl}` });
export const errorHandler = (err, _req, res, _next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
