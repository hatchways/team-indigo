
// MongoDB package imports
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;

// connect to database
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
        console.log('mongodb started.');
        module.exports.database = mongoose.connection;
    }).catch(() => {
        console.log('mongodb connection failed');
        module.exports.database = null;
    });

// export database resources
module.exports = mongoose;
module.exports.database = mongoose.connection;
module.exports.accountsCollection = null;
module.exports.postsCollection = null;