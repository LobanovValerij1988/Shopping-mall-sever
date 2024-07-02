const mongoose = require("mongoose");
const {logEvents} = require("./logger");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
  logEvents(`${err.code}\t${err.syscall}
                       \t${err.hostname}`, 'mongoErrorLog.log')
});
async function connectToMongo() {
  try {
    await mongoose.connect(MONGO_URL);
  }
  catch (err){
    console.log(err)

  }
}

module.exports = {
  connectToMongo,
};
