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
//get all products
const getAllProducts =async(req,res)=>{
    try {
        const {category,color,minPrice,maxPrice,page=1,limit=10}=req.query;
        const filter = {}
        if(category && category !== 'all'){
            filter.category = category;
        }
        if(color && color !== 'all'){
            filter.color = color;
        }
        if( minPrice && maxPrice){
            const min = parseFloat(minPrice)
            const max = parseFloat(maxPrice)
            if(!isNaN(min) && !isNaN(max)){
                filter.price = {$gte:min, $lte:max}
            }
        }
        const skip =(parseInt(page)-1) * parseInt(limit);
        const totalProducts= await Products.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit))


        const products = await Products.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('author','email username')
        return successResponse(res,200,"Products fetched successfully",data={
            products,
            totalProducts,
            totalPages,

        })
    } catch (error) {
        return errorResponse(res,500,"Failed to get all products",error)
    }
}
//gets single product
const getSingleProduct =async (req,res)=>{
    const {id} = req.params;
    try {
        const  product = await Products.findById(id).populate('author','username,email')
        if(!product){
            return errorResponse(res,404,"Product not found")
        }
        const reviews = await Reviews.find({productId:id}).populate('userId','username email')
        return successResponse(res,200 ,"Single Product and reviews",{product ,reviews})
    } catch (error) {
        return errorResponse(res,500,"Failed to get single product",error)

    }
}

// update product (admin only)
const updateProductById= async(req,res)=>{
    const productId = req.params.id;
    try {
        const updateProduct = await Products.findByIdAndUpdate(productId,{...req.body},{
              new:true
        })
        if(!updateProduct){
            return errorResponse(res,404,"Product not found")
        }
        return successResponse(res,200,"Product update successfully!",updateProduct)
    } catch (error) {
        return errorResponse(res,500,"Failed to update",error)
    }        

}

//delete product
const deleteProductById=async(req,res)=>{
       const productId = req.params.id;
       try {
        const deleteProduct = await Products.findByIdAndDelete(productId)

        if(!deleteProduct){
            return errorResponse(res,404,"Product not found")
        }
        await Reviews.deleteOne({productId:productId})
        return successResponse(res,200,"Product deleted successfully!")

       } catch (error) {
        return errorResponse(res,500,"Failed to delete",error)

       }
}


module.exports = {
    createNewProduct,
    getAllProducts,
    getSingleProduct,
    updateProductById,
    deleteProductById
}






