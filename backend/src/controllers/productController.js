import Product from '../models/Product.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const normalizeProductPayload = (payload) => {
  const data = { ...payload };
  if (data.price !== undefined) data.price = Number(data.price);
  if (data.oldPrice !== undefined && data.oldPrice !== '') data.oldPrice = Number(data.oldPrice);
  if (data.quantity !== undefined) data.quantity = Number(data.quantity);
  if (data.stock !== undefined) data.stock = Number(data.stock);
  if (data.quantity !== undefined && data.stock === undefined) data.stock = data.quantity;
  if (data.stock !== undefined && data.quantity === undefined) data.quantity = data.stock;
  return data;
};

export const createProduct = catchAsync(async (req,res)=>{
  const images = req.files?.map((f) => `/uploads/${f.filename}`) || [];
  const data = normalizeProductPayload(req.body);
  const product = await Product.create({ ...data, images });
  res.status(201).json({success:true,message:'Product created',data:{product}});
});

export const updateProduct = catchAsync(async (req,res,next)=>{
  const data = normalizeProductPayload(req.body);
  if(req.files?.length) data.images = req.files.map((f) => `/uploads/${f.filename}`);
  const product = await Product.findByIdAndUpdate(req.params.id,data,{new:true,runValidators:true});
  if(!product) return next(new AppError('Product not found',404));
  res.status(200).json({success:true,message:'Product updated',data:{product}});
});
export const deleteProduct = catchAsync(async (req,res,next)=>{ const product = await Product.findByIdAndDelete(req.params.id); if(!product) return next(new AppError('Product not found',404)); res.status(200).json({success:true,message:'Product deleted'}); });
export const getProducts = catchAsync(async (req,res)=>{ const page=Number(req.query.page||1), limit=Number(req.query.limit||10), skip=(page-1)*limit; const filter={}; if(req.query.category) filter.category=req.query.category; if(req.query.minPrice||req.query.maxPrice){ filter.price={}; if(req.query.minPrice) filter.price.$gte=Number(req.query.minPrice); if(req.query.maxPrice) filter.price.$lte=Number(req.query.maxPrice);} if(req.query.search) filter.$text={$search:req.query.search}; const [products,total]=await Promise.all([Product.find(filter).populate('category','name slug').sort(req.query.sort||'-createdAt').skip(skip).limit(limit), Product.countDocuments(filter)]); res.status(200).json({success:true,data:{products,pagination:{page,limit,total,pages:Math.ceil(total/limit)}}}); });
export const getProductById = catchAsync(async (req,res,next)=>{ const product = await Product.findById(req.params.id).populate('category','name slug'); if(!product) return next(new AppError('Product not found',404)); res.status(200).json({success:true,data:{product}}); });
