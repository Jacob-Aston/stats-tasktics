const mongoose = require("mongoose");

//https://stackoverflow.com/questions/31414852/process-env-pwd-vs-process-cwd
const defaultConnectionString = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;

mongoose.connect(
  process.env.mySecret || "mongodb://127.0.0.1:27017/techmatchup",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
