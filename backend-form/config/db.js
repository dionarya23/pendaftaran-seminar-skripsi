const { connect, Schema, model } = require("mongoose");

const dbConnection = connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) throw err;
    console.log("Successfully connected to MongoDB");
  }
);

module.exports = {
  Schema,
  model,
  db: dbConnection,
};
