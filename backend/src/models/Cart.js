import mongoose from 'mongoose';
const item = new mongoose.Schema({ product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true}, quantity:{type:Number,min:1,default:1}, price:{type:Number,required:true} },{_id:false});
const schema = new mongoose.Schema({ user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,unique:true}, items:[item] },{timestamps:true});
export default mongoose.model('Cart', schema);
