import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { sendAuthResponse } from '../services/authService.js';

export const signup = catchAsync(async (req, res, next) => {
  if (await User.findOne({ email: req.body.email })) return next(new AppError('Email already in use', StatusCodes.CONFLICT));
  const user = await User.create(req.body);
  sendAuthResponse(res, user, 'Signup successful', StatusCodes.CREATED);
});
export const login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) return next(new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED));
  sendAuthResponse(res, user, 'Login successful');
});
export const logout = catchAsync(async (_req, res) => { res.clearCookie('token'); res.status(200).json({ success:true, message:'Logout successful' }); });
export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('User not found', StatusCodes.NOT_FOUND));
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  res.status(200).json({ success:true, message:'Reset token generated', resetToken });
});
export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() } });
  if (!user) return next(new AppError('Invalid or expired token', StatusCodes.BAD_REQUEST));
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendAuthResponse(res, user, 'Password reset successful');
});
