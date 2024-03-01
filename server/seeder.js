const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./confiq/confiq.js");
const itemModel = require("./models/itemModel.js");
const items = require("./utils/data");
require("colors");
//config
dotenv.config();
connectDb();

//function seeder
const importData = async () => {
  try {
    await itemModel.deleteMany();
    const itemsData = await itemModel.insertMany(items);
    console.log("ALL Iten Added");
    // console.log("All Items Added".bgGreen);
    // process.exit();
  } catch (error) {
    console.log("Seeder Error");
    // console.log(`${error}`.bgRed.inverse);
    // process.exit(1);
  }
};

importData();