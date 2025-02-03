const express = require('express');
const { postAReview, getUserReview, getTotalReviewsCount } = require('./review.controller');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

//post a review
router.post('/post-review',verifyToken, postAReview)

// review count
router.get('/total-reviews',getTotalReviewsCount)

//get review data for user
router.get('/:userId',getUserReview)



module.exports=router;