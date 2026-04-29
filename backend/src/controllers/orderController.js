import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createOrder = catchAsync(async (req,res,next)=>{
  const cart = await Cart.findOne({ user:req.user._id }).populate('items.product','name');
  if(!cart || !cart.items.length) return next(new AppError('Cart is empty',400));
  const items = cart.items.map(i => ({ product:i.product._id, name:i.product.name, quantity:i.quantity, price:i.price }));
  const totalAmount = items.reduce((sum,i)=>sum + i.price * i.quantity, 0);
  const order = await Order.create({ user:req.user._id, items, totalAmount });
  cart.items = [];
  await cart.save();
  res.status(201).json({success:true,message:'Order created',data:{order}});
});

export const getOrderSummary = catchAsync(async (req,res,next)=>{
  const order = await Order.findById(req.params.id).populate('user','name email').populate('items.product','name');
  if(!order) return next(new AppError('Order not found',404));
  if(order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') return next(new AppError('Forbidden',403));
  res.status(200).json({success:true,data:{order}});
});

export const getOrderHistory = catchAsync(async (req,res)=>{
  const page=Number(req.query.page||1), limit=Number(req.query.limit||10), skip=(page-1)*limit;
  const query = req.user.role === 'admin' ? {} : { user:req.user._id };
  const [orders,total] = await Promise.all([Order.find(query).sort({createdAt:-1}).skip(skip).limit(limit), Order.countDocuments(query)]);
  res.status(200).json({success:true,data:{orders,pagination:{page,limit,total,pages:Math.ceil(total/limit)}}});
});
