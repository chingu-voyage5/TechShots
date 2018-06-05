const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = { mongoose };