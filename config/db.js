require('dotenv').config()
const mongoose = require("mongoose");

async function connect() {
    try {
      await mongoose.connect(process.env.DB);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }

// const mongoose = require('mongoose')
// require('dotenv').config();
// async function connect(){
//  return new Promise((resolve,reject)=>{
//     mongoose.connect(process.env.DB,(err)=>{
//         if(err){
//             reject(err);
//         }
//         resolve();
//     })
//  })
// }

module.exports=connect;

