const express = require('express');
const { userRegistration, userLoggedIn, userLogout, getAllUsers } = require('./user.controller');
const router = express.Router();

//register endpoint
router.post('/register',userRegistration)

//login routes/endpoints
router.post('/login',userLoggedIn)

//logout endpoint
router.post('/logout',userLogout)
//get all users endpoints (token verify and admin)
router.get('/users',getAllUsers)
module.exports=router;