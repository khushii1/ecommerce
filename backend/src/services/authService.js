import { StatusCodes } from 'http-status-codes';
import { signToken } from '../utils/jwt.js';

export const sendAuthResponse = (res, user, message, statusCode = StatusCodes.OK) => {
  const token = signToken({ id: user._id, role: user.role });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: Number(process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000,
  });
  res.status(statusCode).json({ success: true, message, token, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, address: user.address } } });
};
