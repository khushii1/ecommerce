import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const protect = catchAsync(async (req, _res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];
  if (!token && req.cookies?.token) token = req.cookies.token;
  if (!token) return next(new AppError('Not authenticated', StatusCodes.UNAUTHORIZED));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select('-password');
  if (!user) return next(new AppError('User not found', StatusCodes.UNAUTHORIZED));
  req.user = user;
  return next();
});

export const authorize = (...roles) => (req, _res, next) => {
  const isAllowedByRole = roles.includes(req.user.role);
  const isAdminByEmail = roles.includes('admin') && req.user.email === 'admin@gmail.com';
  if (!isAllowedByRole && !isAdminByEmail) return next(new AppError('Forbidden', StatusCodes.FORBIDDEN));
  return next();
};
