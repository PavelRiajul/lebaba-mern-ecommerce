const express = require('express');
const { postAReview, getUserReview, getTotalReviewsCount } = require('./review.controller');
const router = express.Router();

//post a review
router.post('/post-review', postAReview)

// review count
router.get('/total-reviews',getTotalReviewsCount)

//get review data for user
router.get('/:userId',getUserReview)



module.exports=router;