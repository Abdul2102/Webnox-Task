const mongoose = require("mongoose");

const connection =  () => {
  mongoose
    .connect("mongodb+srv://alkalam456:QU8kYxqFbuKAz4wu@cluster0.fsa4p.mongodb.net/")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(`Connection Error ${err}`);
    });
};

module.exports = connection;
