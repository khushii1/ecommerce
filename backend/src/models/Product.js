import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name:{type:String,required:true}, slug:{type:String,required:true,unique:true}, description:{type:String,default:''},
  price:{type:Number,required:true,min:0},
  oldPrice:{type:Number,default:null},
  quantity:{type:Number,default:0,min:0},
  stock:{type:Number,default:0,min:0},
  badge:{type:String,default:''},
  images:[String],
  category:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true}, isFeatured:{type:Boolean,default:false}
},{timestamps:true});
schema.index({ name:'text', description:'text' });
export default mongoose.model('Product', schema);
