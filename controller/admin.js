const models = require('../models/admin');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const usersignup = async (req, res) => {
    const { username, email, password,role } = req.body;
    try {
        const existingUser = await models.findOne({
            email: email,
        });
        if (existingUser) {
            return res.status(400).json("User Already Registered");
        }
        const hashedPassword = await bcrypt.hash(password, 11);
        const result = await models.create({
            name: name,
            email: email,
            password: hashedPassword,
            role:role,
        });
        res.status(201).json({ user: result });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong" });
    }
};
const userlogin = async (req, res) => {
    const { email, password  } = req.body;
    try {
        const existingUser = await models.findOne({ email: email });
        if (!existingUser) {
            return res.status(500).json({ message: "User not found" });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(500).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.SECRET_KEY
        );
        res.status(201).json({ user: existingUser, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong" });
    }
};
route.post('/userResetPassword/:id/:token', async(req, res)=>{
    const {password, confirm_password} =req.body;
     console.log(password,confirm_password);
     const {id,token}=req.params;
   console.log(id)
     const temp =await user.findById(id);
     
     console.log(temp)
   const secretId= temp._id.toString();;
     const new_secret=secretId + "ayush";
     try{
       jwt.verify(token, new_secret);
        if(password && confirm_password){
          if(password !== confirm_password){
           res.send({
               "status":"failed",
               "message":"Password does not match",
           })
          }else{
            console.log("password",password,confirm_password);
            const salt =await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            await user.findByIdAndUpdate(req.params._id,{ $set:{
               password : password
            }})
            res.send({
               "status":"success",
               "message":"Password Reset successfully",
           })
          }
        }else{
           res.send({
               "status":"failed",
               "message":"All Fields are Required",
           })
   
        }
     }catch(e){
      console.log(e);
       res.send({
        
           "status":"failed",
           "message":"Invalid Token",
       })
     }
   
   })

route.post('/sendResetPassword',async(req,res)=>{
    
    const {email} =req.body;
    if(email){
        const temp =await user.findOne({email : email});
    
        if(temp){
            const  secret= temp._id + "ayush"
            const token = jwt.sign({userID : temp._id},secret,{
                expiresIn :'5d'
            })
            const link =`https://frankbody.netlify.app/user/reset/${temp._id}/${token}`
            // console.log(link);
             try {
            let info =await transporter.sendMail({
             from: 'frankbody123@gmail.com',
             to :temp.email,
             subject : "FrankBody - Password Reset Link",
             html: `<a href=${link} >Click Here</a> to Reset Your Password`
            })
            res.send({
              "status":"success",
              "message":"Password Reset Email sent successfully  Please check your Mail",
              "info": info,
          })
          }catch(err){
              res.send(err);
            }
           
        }else{
            res.send({
                "status":"failed",
                "message":"User does not exist",
            })
        }
    }else{
        res.send({
            "status":"failed",
            "message":"Email is required",
        })
    }


})

const checkadmin = (req,res) =>{
    try {

    } catch (error) {
        
    }
}
const savelogin = async (req, res) => {
    const id = req.userid;
    console.log(id)
    const user = await models.findOne({ _id: id });
    console.log(user)
    res.status(201).send(user);
}

module.exports = {
    userlogin, usersignup, savelogin
};
