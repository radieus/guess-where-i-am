const mongoose = require("mongoose");
const config = require('config');

const uri = config.get("MONGODB_URI");

async function InitiateMongoServer() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB!");
    console.log("[database] guess-where-i-am");
    exports.dbObj = mongoose.connection.client.db('guess-where-i-am');
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.db = mongoose;
exports.InitiateMongoServer = InitiateMongoServer;
