const express = require('express');
const userRouter = express.Router();
const auth = require('../Middleware/auth')
const { userlogin, usersignup, savelogin ,resetpassword , sendresetpassword,checkadmin } = require('../controller/admin')

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

userRouter.post('/login', asyncHandler(userlogin))
userRouter.post("/signup", asyncHandler(usersignup));
userRouter.get("/loggedIn", auth, asyncHandler(savelogin));
userRouter.post('/userResetPassword/:id/:token',auth , asyncHandler(resetpassword))
userRouter.post('/sendResetPassword', auth, asyncHandler(sendresetpassword))
userRouter.post('/checkadmin', auth, asyncHandler(checkadmin))


module.exports = userRouter;