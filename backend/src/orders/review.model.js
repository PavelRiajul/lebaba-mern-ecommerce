const mongoose = require('mongoose')

//schema create
const ReviewSchema = new mongoose.Schema({
    comment:{type:String, required:true},
    rating:{type:Number, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product',required:true}
}, {
    timestamps:true  //product kokhon update hoise kokhon create hoise
})
//model create
const Reviews = mongoose.model("Review",ReviewSchema)
module.exports=Reviews;