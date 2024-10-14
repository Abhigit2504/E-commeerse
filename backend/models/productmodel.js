import mongoose from "mongoose";

const productShema = new mongoose.Schema({
    name :{type:String,required:true},
    description :{type:String,required:true},
    price:{type:Number,required:true},
    images: [{ type: String }],
    category:{type:String,required:true},
    subcategory:{type:String,required:true},
    sizes:{type:Array,required:true},
    bestseller:{type:Boolean}, 
    date :{type:Number,required:true}

})

const producrModel = mongoose.models.product|| mongoose.model("product",productShema)



export default producrModel