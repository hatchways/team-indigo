
// ROUTING VARIABLES
var express = require("express");
var router = express.Router();
var mongo = require("../db/index.js");
var ObjectId = require('mongodb').ObjectID;

// JWT TOKEN
var userAuthentication = require("./verifyUser.js");

// MODELS
var AccountModel = require("../models/account.js");
var PostModel = require("../models/post.js");

/*

>curl --data "username=johnsmith123&choice=gaming" http://localhost:3001/post/id/5ddb1bc56a7aec499c272d60/vote
*/
router.post("/post/id/:postid/vote", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "Error connecting to database..." });
    else{
        var requestedPostID = req.params.postid;
        var username = req.body.username;
        var choice = req.body.choice;
        var query = { _id : ObjectId(requestedPostID) };
        PostModel.findById(requestedPostID, function(db_err, db_res) {
              if (db_err) res.status(400).send({ message : "Invalid request" });
              else {
                    db_res.vote(username, choice);
                    db_res.save(function(db_err, db_res) {
                          if (db_err) res.status(400).send({ message : "Invalid request" });
                          else {
                                res.status(201).send({
                                      data : db_res,
                                      message : "success"
                                });
                          }

                    });

              }
        });

    }
});

/**
Create post using POST method
curl --data "tags=2019&username=johnsmith123&choices=gaming&choices=league" http://localhost:3001/post/id
*/
router.post("/post/id", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "Error connecting to database..." });
    else{
        var username = req.body.username;

        //if(userAuthentication.verifyRequest(req, username)){
            // Create JSON from POST parameters that contains account information
            var entry = {tags : req.body.tags,
                      question : req.body.question,
                      description : req.body.description,
                      username : req.body.username,
                      choices : req.body.choices,
                      userVotes : [],
                      dateCreated : new Date(Date.now()).toISOString()};

            // Add the post to the post_info collection
            newPost = new PostModel(entry);
            newPost.init_choices();
            newPost.save(function(db_err, db_res) {
                      if (db_err) res.status(400).send({ message : "Invalid request" });
                      else {
                          var postID = db_res._id;
                          var query = {username : req.body.username};
                          var update = {$addToSet: { "posts" : postID.toString()}};

                          AccountModel.findOneAndUpdate(query, update, function(accounts_db_err, accounts_db_res) {
                                         if (accounts_db_err) res.status(400).send({ message : "Invalid request" });
                                         else res.status(200).send({
                                             data : {_id : postID},
                                             message : "success"
                                         });
                                   });
                      }
                  });
            /*
        }
        else{
            res.status(404).send({ message : "Unauthorized request" });
        }*/
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

        PostModel.findOne(query, function(db_err, db_res) {
            if (db_err) res.status(400).send({ message : "Invalid request" });
            else res.status(201).send({
                 data : db_res,
                 message : "success"
             });
        });
    }
});


router.get("/post/search", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "Error connecting to database..." });
    else{
        var searchTag = req.query.tag;
        var query = {tags: { "$in": searchTag  }};
        var beginIndex = 0;
        var limit = 10;

        if(req.query.begIndex){
            beginIndex = parseInt(req.query.begIndex);
            if(isNaN(beginIndex) || beginIndex < 0){
                res.status(400).send({ message : "Begin index is not an integer." });
            }
        }
        if(req.query.limit) {
            limit = parseInt(req.query.limit);
            if(isNaN(limit) || limit < 0){
                res.status(400).send({ message : "Limit is not an integer." });
            }
        }

        PostModel.find(query).skip(beginIndex).limit(limit).sort({dateCreated : 1}).exec(function(db_err, db_res) {
              if (db_err) res.status(400).send({ message : "Invalid request" });
              else res.status(201).send({
                    data : db_res,
                    size : db_res.length,
                    message : "success"
                });
        });

    }
});

module.exports = router;