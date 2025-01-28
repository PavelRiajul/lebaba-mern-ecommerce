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
            if(!isNAN(min) && !isNAN(max)){
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
module.exports = {
    createNewProduct,
    getAllProducts
}