var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI);


module.exports.mongoose = mongoose;