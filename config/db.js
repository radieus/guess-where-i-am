const mongoose = require("mongoose");
const mongo = require('mongodb').MongoClient

const uri = "mongodb+srv://GWIM_user:kKfCfBqYfsuwRy3@cluster0.e56zs.mongodb.net/guess-where-i-am?retryWrites=true&w=majority";

async function InitiateMongoServer() {
  mongo.connect(uri, (err, client) => {
    // client returned
    exports.dbObj = client.db('guess-where-i-am');
    console.log('Successfully connected to the database!');
  });
}

exports.InitiateMongoServer = InitiateMongoServer;