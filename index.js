const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connect = require('./config/db');
const userRoutes= require('./routes/user')
const cors = require('cors')
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.get('/', (req, res) => {
    res.send("Todo App is Live Now")
})
connect()
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
})