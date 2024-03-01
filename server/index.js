const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./confiq/confiq')
// dotenv confiq
dotenv.config()
// Db confiq
connectDb()
// rest object
const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(morgan('dev'));
// routes
app.use("/api/items",require("./routes/itemRoutes"))
// port
const PORT = process.env.PORT || 8080
// Listen
app.listen(PORT,()=>{
    console.log("Server Started");
})