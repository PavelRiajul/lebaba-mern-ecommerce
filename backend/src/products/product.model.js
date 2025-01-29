const mongoose = require('mongoose')

//schema create
const productSchema = new mongoose.Schema({
    name:{ type:String,required:true },
    category:String,
    description:String,
    price:{type:Number, required:true},
    oldPrice:Number,
    image:{type:String,required:true},
    color:String,
    rating:{type:Number, default:0},
    author: { type:mongoose.Schema.Types.ObjectId, ref:"User",required:true}

}, {
    timestamps:true  //product kokhon update hoise kokhon create hoise
})
//model create
const Products = mongoose.model("Product",productSchema)
module.exports=Products;



