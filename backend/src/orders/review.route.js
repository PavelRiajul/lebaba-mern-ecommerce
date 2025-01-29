const express = require('express');
const { postAReview } = require('./review.controller');
const router = express.Router();

//post a review
router.post('/post-review', postAReview)

module.exports=router;