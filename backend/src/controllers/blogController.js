import Blog from '../models/Blog.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createBlog = catchAsync(async (req,res)=>{ const blog = await Blog.create({ ...req.body, author:req.user._id }); res.status(201).json({success:true,message:'Blog created',data:{blog}}); });
export const updateBlog = catchAsync(async (req,res,next)=>{ const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true}); if(!blog) return next(new AppError('Blog not found',404)); res.status(200).json({success:true,message:'Blog updated',data:{blog}}); });
export const deleteBlog = catchAsync(async (req,res,next)=>{ const blog = await Blog.findByIdAndDelete(req.params.id); if(!blog) return next(new AppError('Blog not found',404)); res.status(200).json({success:true,message:'Blog deleted'}); });
export const getBlogs = catchAsync(async (req,res)=>{ const page=Number(req.query.page||1), limit=Number(req.query.limit||10), skip=(page-1)*limit; const [blogs,total]=await Promise.all([Blog.find().populate('author','name email').sort({createdAt:-1}).skip(skip).limit(limit), Blog.countDocuments()]); res.status(200).json({success:true,data:{blogs,pagination:{page,limit,total,pages:Math.ceil(total/limit)}}}); });
export const getBlogById = catchAsync(async (req,res,next)=>{ const blog = await Blog.findById(req.params.id).populate('author','name email'); if(!blog) return next(new AppError('Blog not found',404)); res.status(200).json({success:true,data:{blog}}); });
