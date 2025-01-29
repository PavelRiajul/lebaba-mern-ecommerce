const express = require('express')
const { createNewProduct, getAllProducts, getSingleProduct, updateProductById, deleteProductById } = require('./product.controller')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const router = express.Router()

//create a product (admin)
router.post("/create-product",createNewProduct)

//router all products
router.get('/',getAllProducts)

//get single product
router.get('/:id',getSingleProduct)

//update product (admin only)
router.patch("/update-product/:id",verifyToken,verifyAdmin,updateProductById)

//delete product (admin only)
router.delete("/:id",verifyToken,verifyAdmin,deleteProductById)

module.exports = router




