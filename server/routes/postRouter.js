
// ROUTING VARIABLES
var express = require("express");
var router = express.Router();
var mongo = require("../db/index.js");

// JWT TOKEN
var userAuthentication = require("./verifyUser.js");

/**
Create post using POST method
curl --data "tags=gaming&question=my-question&description=mydescription&username=johnsmith123" http://localhost:3001/post/id
*/
router.post("/post/id", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "Error connecting to database..." });
    else{
        var username = req.body.username;

        if(userAuthentication.verifyRequest(req, username)){
            // Create JSON from POST parameters that contains account information
            var entry = {tags : req.body.tags,
                      question : req.body.question,
                      description : req.body.description,
                      username : req.body.username,
                      choices : [],
                      choiceStatus : [],
                      votes : []};

            // Add the post to the post_info collection
            mongo.postsCollection.insertOne(entry, function(db_err, db_res) {
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
        else{
            res.status(404).send({ message : "Unauthorized request" });
        }
    }
});

/**
Handle GET request for account information.
*/
router.get("/post/id/:postid", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "Error connecting to database..." });
    else{
        var requestedPostID = req.params.postid;
        var query = { _id : requestedPostID };
        mongo.postsCollection.findOne(query, function(db_err, db_res) {
                                        if (db_err) res.status(400).send({ message : "Invalid request" });
                                        else res.status(201).send({
                                              data : db_res,
                                              message : "success"
                                          });
                                  });
    }
});

module.exports = router;