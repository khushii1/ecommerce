import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';

export const getProfile = catchAsync(async (req, res) => res.status(StatusCodes.OK).json({ success:true, data:{ user:req.user } }));
export const updateProfile = catchAsync(async (req, res) => {
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => ['name','phone','address'].includes(k)));
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new:true, runValidators:true }).select('-password');
  res.status(StatusCodes.OK).json({ success:true, message:'Profile updated', data:{ user } });
});
