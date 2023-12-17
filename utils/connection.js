const mongoose = require("mongoose");
const { MONGOCONNECTIONSTRING } = require("./config");

exports.connectMongo = async () => {
  await mongoose.connect(MONGOCONNECTIONSTRING);
  console.log("Mongodb connected");
};
