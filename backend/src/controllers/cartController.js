import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user:userId });
  if(!cart) cart = await Cart.create({ user:userId, items:[] });
  return cart;
};

export const addToCart = catchAsync(async (req,res,next)=>{
  const product = await Product.findById(req.body.productId);
  if(!product) return next(new AppError('Product not found',404));
  const cart = await getOrCreateCart(req.user._id);
  const i = cart.items.findIndex(item => item.product.toString() === req.body.productId);
  if(i >= 0) cart.items[i].quantity += req.body.quantity;
  else cart.items.push({ product: product._id, quantity: req.body.quantity, price: product.price });
  await cart.save();
  const populated = await cart.populate('items.product','name price images');
  res.status(200).json({success:true,message:'Added to cart',data:{cart:populated}});
});

export const updateCartQuantity = catchAsync(async (req,res,next)=>{
  const cart = await getOrCreateCart(req.user._id);
  const item = cart.items.find(i => i.product.toString() === req.params.productId);
  if(!item) return next(new AppError('Product not in cart',404));
  item.quantity = req.body.quantity;
  await cart.save();
  const populated = await cart.populate('items.product','name price images');
  res.status(200).json({success:true,message:'Quantity updated',data:{cart:populated}});
});

export const removeFromCart = catchAsync(async (req,res)=>{
  const cart = await getOrCreateCart(req.user._id);
  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await cart.save();
  const populated = await cart.populate('items.product','name price images');
  res.status(200).json({success:true,message:'Removed from cart',data:{cart:populated}});
});

export const getUserCart = catchAsync(async (req,res)=>{
  const cart = await getOrCreateCart(req.user._id);
  const populated = await cart.populate('items.product','name price images');
  res.status(200).json({success:true,data:{cart:populated}});
});
