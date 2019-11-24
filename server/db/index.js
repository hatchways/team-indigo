
// MONGODB VARIABLES
var mongoClient = require('mongodb').MongoClient;
var uri = process.env.MONGODB_URI;
var db = null;
var accountsCollection = null;
var postsCollection = null;

// Connect to the MongoDB database only once
mongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if(!err){
        db = client.db("tindigo_database");
        accountsCollection = db.collection("account_info");
        postsCollection = db.collection("post_info");


        module.exports.database = db;
        module.exports.accountsCollection = accountsCollection;
        module.exports.postsCollection = postsCollection;
        console.log("Connected to database successfully.");
    }
    else{
        console.log("Error connecting to database.");
    }
});


module.exports.mongoClient = mongoClient;