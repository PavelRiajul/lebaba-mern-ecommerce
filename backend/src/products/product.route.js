const express = require('express')
const { createNewProduct, getAllProducts } = require('./product.controller')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const router = express.Router()

//create a product (admin)
router.post("/create-product",createNewProduct)

//router all products
router.get('/',getAllProducts)

module.exports = router