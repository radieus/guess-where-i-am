const mongoose = require("mongoose");

const uri = "notsoquickmyfriend";

async function InitiateMongoServer() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB!");
    console.log("[database] guess-where-i-am");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.InitiateMongoServer = InitiateMongoServer;