const express = require('express');
const { userRegistration } = require('./user.controller');
const router = express.Router();

//register endpoint
router.post('/register',userRegistration)
module.exports=router;