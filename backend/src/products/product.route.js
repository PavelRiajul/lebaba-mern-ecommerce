const express = require('express')
const { createNewProduct } = require('./product.controller')
const router = express.Router()

//create a product
router.post("/create-product",createNewProduct)

module.exports = router