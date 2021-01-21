const mongoose = require("mongoose");

const uri = "mongodb+srv://GWIM_user:kKfCfBqYfsuwRy3@cluster0.e56zs.mongodb.net/guess-where-i-am?retryWrites=true&w=majority";

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
