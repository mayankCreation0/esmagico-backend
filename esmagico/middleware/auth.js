const jwt = require('jsonwebtoken')
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (token) {
            console.log(token)
            token = token.split(" ")[1];
            let user = jwt.verify(token, process.env.SECRET_KEY);
            req.user = user;
        }
        else {
            console.log("Unauthorized user");
            res.status(400).json({ message: 'Unauthorized user' })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Something went Wrong' })
    }
}
module.exports = auth;