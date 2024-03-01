const mongoose = require('mongoose')
// connect DB function
const connectDb = async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDb Connected");
} catch (error) {
    console.log(error);
}
}
module.exports= connectDb;