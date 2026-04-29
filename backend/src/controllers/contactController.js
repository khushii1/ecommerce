import Contact from '../models/Contact.js';
import catchAsync from '../utils/catchAsync.js';

export const submitContactForm = catchAsync(async (req,res)=>{ const contact = await Contact.create(req.body); res.status(201).json({success:true,message:'Message submitted',data:{contact}}); });
export const getMessages = catchAsync(async (req,res)=>{ const page=Number(req.query.page||1), limit=Number(req.query.limit||10), skip=(page-1)*limit; const [messages,total]=await Promise.all([Contact.find().sort({createdAt:-1}).skip(skip).limit(limit), Contact.countDocuments()]); res.status(200).json({success:true,data:{messages,pagination:{page,limit,total,pages:Math.ceil(total/limit)}}}); });
