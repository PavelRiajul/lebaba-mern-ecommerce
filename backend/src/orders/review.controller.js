const Products = require("../products/product.model");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const Reviews = require("./review.model");


const postAReview= async(req,res)=>{
       try {
        const {comment,rating,userId,productId} = req.body;

        if(!comment || !rating || !userId || !productId){
            return errorResponse(res,400,'Missing required fields')
        }
        const existingReview = await Reviews.findOne({productId,userId});
        if(existingReview){
             existingReview.comment=comment;
             existingReview.rating=rating;
             await existingReview.save()
        }else{
            const newReview = new Reviews({
                comment,rating,userId,productId
            })
            await newReview.save()
        }
         const reviews = await Reviews.find({productId});

         if(reviews.length > 0){
            const totalRating = reviews.reduce((acc,review)=> acc + review.rating, 0);
            const averageRating =  totalRating / reviews.length;

            const product = await Products.findById(productId);

            if(product){
                product.rating = averageRating;
                await product.save({validateBeforeSave:false})
            }else{
                return errorResponse(res,404,'Product not found')
            }
         }

        return successResponse(res,200,'Review posted successfully',reviews)
       } catch (error) {
        return errorResponse(res,500,"Failed to post a review")
       }
}
// get review data for user
const getUserReview= async(req,res)=>{
    const {userId}= req.params;
    try {
        if(!userId){
            return errorResponse(res,400,'Missing user ID')
        }
        const reviews = await Reviews.find({userId:userId}).sort({createAt: -1})
        if(reviews.length === 0){
            return errorResponse(re,400,'No reviews found for this user')
        }
        return successResponse(res,200,'Reviews fetched successfully',reviews)
    } catch (error) {
        return errorResponse(res,500,'Failed to get users review',error)
    }
}
//total review count
const getTotalReviewsCount =async(req,res)=>{
          try {
            const totalReviews = await Reviews.countDocuments({})
            return successResponse(res,200,'Reviews count fetched successfully',totalReviews)

          } catch (error) {
            return errorResponse(res,500,'Failed to get users review',error)
          }
}
module.exports={
    postAReview,
    getUserReview,
    getTotalReviewsCount
}