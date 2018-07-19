const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).catch(console.log);
mongoose.Promise = global.Promise;

module.exports = { mongoose };