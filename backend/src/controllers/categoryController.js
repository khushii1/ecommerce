import Category from '../models/Category.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createCategory = catchAsync(async (req,res)=>{ const category = await Category.create(req.body); res.status(201).json({success:true,message:'Category created',data:{category}}); });
export const updateCategory = catchAsync(async (req,res,next)=>{ const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true}); if(!category) return next(new AppError('Category not found',404)); res.status(200).json({success:true,message:'Category updated',data:{category}}); });
export const deleteCategory = catchAsync(async (req,res,next)=>{ const category = await Category.findByIdAndDelete(req.params.id); if(!category) return next(new AppError('Category not found',404)); res.status(200).json({success:true,message:'Category deleted'}); });
export const getCategories = catchAsync(async (_req,res)=>{ const categories = await Category.find().sort({createdAt:-1}); res.status(200).json({success:true,data:{categories}}); });
