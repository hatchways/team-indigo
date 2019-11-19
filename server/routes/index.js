
// ROUTING VARIABLES
var express = require("express");
var router = express.Router();

// MONGODB VARIABLES
var mongoClient = require('mongodb').MongoClient;
var uri = process.env.MONGODB_URI;
var db = null;
var accountsCollection = null;
var postsCollection = null;

// JWT TOKEN VARIABLES
var jwt = require('jsonwebtoken');
var privateKey = process.env.PRIVATE_KEY;
var publicKey = process.env.PUBLIC_KEY;

console.log(privateKey);

// EXPIRATION VARIABLES
var POST_EXPIRATION_DATE = 30;
var secondsToExpire = POST_EXPIRATION_DATE*86400;


// Connect to the MongoDB database only once
mongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if(!err){
        db = client.db("tindigo_database");
        accountsCollection = db.collection("account_info");
        postsCollection = db.collection("post_info");
        console.log("Connected to database successfully.");
    }
    else{
        console.log("Error connecting to database.");
    }
});

/**
Handle GET request for account information.
*/
router.get("/account/:username", function(req, res, next) {
    if(db == null) res.status(400).send({ message : "error connecting to database..." });
    else{
        var requestedUsername = req.params.username;
        var query = { username : requestedUsername }
        var hidden = {projection : {_id : 0,
                                 password : 0,
                                 emailAddress : 0}}
        accountsCollection.findOne(query, hidden, function(db_err, db_res) {
                                        if (db_err) res.status(400).send({ message : "invalid request" });
                                        else res.status(201).send({
                                            data : db_res,
                                            message : "success"
                                        });
                                  });
    }
});

/**
CURL COMMAND : curl --data "firstName=John&lastName=Smith&username=johnsmith123&aboutMe=hi-im-john" http://localhost:3001/account

*/
router.post("/account", function(req, res, next) {
    if(db == null) res.status(400).send({ message : "error connecting to database..." });
    else{
        // Create JSON from POST parameters that contains account information
        var entry = {firstName : req.body.firstName,
                  lastName : req.body.lastName,
                  username : req.body.username,
                  aboutMe : req.body.aboutMe,
                  posts : [],
                  password: req.body.password,
                  emailAddress: req.body.emailAddress};

        accountsCollection.insertOne(entry, function(db_err, db_res) {
                        if (db_err) res.status(400).send({ message : "invalid request" });
                        else res.status(201).send({
                              data : null,
                              message : "success"
                          });
                  });
    }
});

/**
Create post using POST method
curl --data "tags=gaming&question=my-question&description=mydescription&username=johnsmith123" http://localhost:3001/post/id
*/
router.post("/post/id", function(req, res, next) {
    if(db == null) res.status(400).send({ message : "Error connecting to database..." });
    else{
        // Create JSON from POST parameters that contains account information
        var entry = {tags : req.body.tags,
                  question : req.body.question,
                  description : req.body.description,
                  username : req.body.username,
                  choices : [],
                  choiceStatus : [],
                  votes : []};

        // Add the post to the post_info collection
        postsCollection.insertOne(entry, function(db_err, db_res) {
            if (db_err) res.status(400).send({ message : "Invalid request" });
            else {
                var postID = entry._id;
                var query = {username : req.body.username};
                var update = {$addToSet: { "posts" : postID}};
                accountsCollection.updateOne(query, update, function(accounts_db_err, accounts_db_res) {
                                if (accounts_db_err) res.status(400).send({ message : "Invalid request" });
                                else res.status(200).send({
                                    data : {_id : postID},
                                    message : "success"
                                });
                          });
            }
        });
    }
});

/**
Handle GET request for account information.
*/
router.get("/post/id/:postid", function(req, res, next) {
    if(db == null) res.status(400).send({ message : "Error connecting to database..." });
    else{
        var requestedPostID = req.params.postid;
        var query = { _id : requestedPostID }
        var hidden = {projection : {_id : 0}}
        postsCollection.findOne(query, hidden, function(db_err, db_res) {
                                        if (db_err) res.status(400).send({ message : "Invalid request" });
                                        else res.status(201).send({
                                              data : db_res,
                                              message : "success"
                                          });
                                  });
    }
});

/**
Tests a signin by the user.
*/
router.post("/signin", function(req, res, next) {
    if(db == null) res.status(400).send({ message : "error connecting to database..." });
    else{
        var signInUsername = req.body.username;
        var signInPassword = req.body.password;
        var query = { username : signInUsername }

        accountsCollection.findOne(query, function(db_err, db_res) {
                    if (db_err) res.status(400).send({ message : "invalid request" });
                    else {
                        if(db_res.password === signInPassword){
                            // Correct password
                            res.status(200).send({token : generateToken(signInUsername),
                                                  message : "success"});
                        }
                        else {
                            // Incorrect password
                            res.status(200).send({message : "incorrect password"});
                        }
                    }
              });
    }
});

router.post("/verifyuser", function(req, res, next) {
    var username = req.body.username;
    console.log(req.headers.authorization);
    var token = req.headers.authorization.split(' ')[1];
    //var token = req.body.token;
    if(verifyToken(username, token)){
        res.status(200).send({message : "verified"});
    }
    else{
        res.status(200).send({message : "failed to verify"});
    }
});

/**
Returns JWT Token if successful sign in.
Returns null if invalid credentials.
*/
function generateToken(username) {
    var payload = {
        account : username
    };
    console.log(username);
    return jwt.sign(payload, privateKey, generateSignAndVerifyOptions(username));
}

function generateSignAndVerifyOptions(username){
    return {
            issuer:  "www.tindigo.com",
            subject:  "teamindigo54@gmail.com",
            audience:  username,
            expiresIn:  "30d",
            algorithm:  "RS256"
           };
}

function verifyToken(username, token) {
    return jwt.verify(token, publicKey, generateSignAndVerifyOptions(username));
}

router.get("/welcome", function(req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

module.exports = router;
