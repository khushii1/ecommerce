import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getUsers = catchAsync(async (req, res) => {
  const page = Number(req.query.page || 1); const limit = Number(req.query.limit || 10); const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([User.find().select('-password').sort({createdAt:-1}).skip(skip).limit(limit), User.countDocuments()]);
  res.status(StatusCodes.OK).json({ success:true, data:{ users, pagination:{ page,limit,total,pages:Math.ceil(total/limit) } } });
});
export const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  if(!user) return next(new AppError('User not found', StatusCodes.NOT_FOUND));
  res.status(200).json({ success:true, data:{ user } });
});
export const updateUserRole = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role:req.body.role }, { new:true }).select('-password');
  if(!user) return next(new AppError('User not found', StatusCodes.NOT_FOUND));
  res.status(200).json({ success:true, message:'Role updated', data:{ user } });
});
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if(!user) return next(new AppError('User not found', StatusCodes.NOT_FOUND));
  res.status(200).json({ success:true, message:'User deleted' });
});
