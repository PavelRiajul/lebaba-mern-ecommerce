const Reviews = require("../orders/review.model")
const { errorResponse, successResponse } = require("../utils/responseHandler")
const Products = require("./product.model")


//create product
const createNewProduct =async (req,res)=>{
    try {
        const newProduct = new Products({
            ...req.body
        })
        const saveProduct = await newProduct.save()
        //calculate avarage rating
        const reviews = await Reviews.find({productId:saveProduct._id})
        if(reviews.length > 0){
            const totalRating = reviews.reduce((acc,review)=> acc + review.rating, 0)
            const avarageRating = totalRating / reviews.l
            saveProduct.rating = avarageRating;
            await saveProduct.save()
        }
        return successResponse (res,200, "Product created successfully", saveProduct)
    } catch (error) {
        return errorResponse(res,500, "Failed to create new product",error)
    }
}

module.exports = {
    createNewProduct
}