const mongoose = require('mongoose');
require('dotenv').config();

const defaultConnectionString = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`

mongoose.connect(process.env.mySecret || 'mongodb://127.0.0.1:27017/techmatchup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
