const express=require('express');
const { getAllUser, userRegister, userLogin, resetLink, changePassword, loggedInUser } = require('../controller/userController');

const router= express.Router();

const auth= require('../middleware/auth')

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/',asyncHandler(getAllUser));

router.post('/register',asyncHandler(userRegister));

router.post('/login',asyncHandler(userLogin));

router.post('/sendResetPassword',asyncHandler(resetLink));

router.post('/userResetPassword/:id/:token',asyncHandler(changePassword));

router.get('/loggedIn',auth,asyncHandler(loggedInUser));


module.exports= router;