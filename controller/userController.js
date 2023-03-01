
const userModel =require('../models/userModel');

const bcrypt =require('bcrypt');

const jwt = require('jsonwebtoken');


 const getAllUser= async(req,res)=>{
    try{
 const users = await userModel.find().sort("-createdAt");
 res.status(200).send({
    "status":"success",
    "data": users
 })
    }catch(e){
        res.status(404).send({
            "status":"failed",
            "data": e.message
         })
    }
 }
const userRegister = async (req,res)=>{
    const data=req.body;
    const user =await userModel.findOne({email:data.email});

    if(user){
        res.status(404).send({
            "status": "failed",
            "message": 'Email already exists'
        })
    }
    else{
        if(data.name && data.email && data.password && data.role){
            try{
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(data.password, salt);
                const newUser= new userModel({
                    name: data.name,
                    email: data.email,
                    password:hashPassword,
                    role:data.role,
                    
                   })
                 const temp=  await userModel.create(newUser);
                 console.log(temp);
                 const registeredUser= userModel.findOne({email:data.email})
                 
                //  Generate JWT token

                const token  = jwt.sign({userId:registeredUser._id},process.env.SECRET_KEY,{expiresIn:'5d'})
                 
                 res.status(200).send ({
                    "status": "success",
                    "message": 'User Registered Successfully',
                    "token": token
                })
            }catch(e){
                res.status(404).send({
                    "status": "failed",
                    "message": e.message
                })
            }
          
        }else{
            res.send(404).send ({
                "status": "failed",
                "message": 'All fields are required'
            })
        }
    
}
}

const userLogin =async(req,res)=>{
    try{
 const {email,password}=req.body;
 if(email && password){
    const user = await userModel.findOne({ email: email});
    const token  = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'5d'})
    if(user !=null){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch && (user.email === email)){
            res.status(200).send ({
                "status": "success",
                "message": 'Login Successfull',
                "token": token
            })
        }else{
            res.status(404).send({
                "status": "failed",
                "message": 'Email or password is incorrect',
            })
        }
    }else{
        res.status(404).send({
            "status": "failed",
            "message": 'User is not Registered',
        })

    }
 }else{
    res.status(404).send({
        "status": "failed",
        "message": 'All fields are required'
    })
 }
    }catch(e){
        res.status(404).send ({
            "status": "failed",
            "message": 'User is not Registered',

        })
    }
}

const resetLink=async(req,res)=>{
      
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
              res.status(404).send({
                "status":"failed",
                "message":err.message,
            });
            }
           
        }else{
            res.status(404).send({
                "status":"failed",
                "message":"User does not exist",
            })
        }
    }else{
        res.status(404).send({
            "status":"failed",
            "message":"Email is required",
        })
    }


}


const changePassword=async(req,res)=>{
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
   
   }
const loggedInUser = async (req,res)=>{
    const data= req.user;
    if(data.role==='user'){
        res.status(200).send({
            "user":data
         })
    }
    const users = await userModel.find().sort("-createdAt");
res.status(200).send( {
    "user":data,
    "data":users
 })
}




module.exports={
    userRegister,
    userLogin,
    changePassword,
    loggedInUser,
    getAllUser,
    resetLink
}