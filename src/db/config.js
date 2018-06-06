const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI).catch(console.log);
mongoose.Promise = global.Promise;

module.exports = { mongoose };