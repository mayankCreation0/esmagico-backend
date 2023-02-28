const mongoose = require('mongoose')
// mongoose.set('strictQuery', true);
require('dotenv').config();

async function connect() {
    console.log("app",process.env.DB)
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DB )
    })
}
module.exports = connect;