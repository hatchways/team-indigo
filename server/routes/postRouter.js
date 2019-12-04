
// Express imports
var express = require("express");
var router = express.Router();

// MongoDB imports
var mongo = require("../db/index.js");
var ObjectId = require('mongodb').ObjectID;

// JWT Token imports
var userAuthentication = require("./verifyUser.js");

// Model imports
var AccountModel = require("../models/account.js");
var PostModel = require("../models/post.js");

/**
Handle POST request for voting
Endpoint: .../post/id/#postid/vote
REQUIRES AUTHORIZATION TOKEN IN HEADER

@params Pass username and choice in req.body
        username, choice are required fields
@return {data : <POST RESOURCE>, message : "success"} if voted successfully.
        HTTP Response Code 500 if error connecting to MongoDB
        HTTP Response Code 400 if bad request
        HTTP Response Code 404 if user is unauthorized
*/
router.post("/post/id/:postid/vote", function(req, res, next) {
    if(mongo.database == null) res.status(500).send({ message : "error connecting to database" });
    else{
        var username = req.body.username;

        if(userAuthentication.verifyRequest(req, username)){
            var requestedPostID = req.params.postid;
            var choice = req.body.choice;
            var query = { _id : ObjectId(requestedPostID) };

            // Query for post ID
            PostModel.findById(requestedPostID, function(db_err, db_res) {
                  if (db_err) res.status(400).send({ message : "Bad request" });
                  else {
                        // Register username and choice to post
                        db_res.vote(username, choice);
                        db_res.save(function(db_err, db_res) {
                              if (db_err || db_res == null) res.status(400).send({ message : "Invalid request" });
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
        else{
            res.status(404).send({ message : "Unauthorized request" });
        }
    }
});

/**
Handle POST request for post creation
Endpoint: .../post/id
REQUIRES AUTHORIZATION TOKEN IN HEADER

@params Pass post information in req.body
        question are required fields
@return {data : <POST RESOURCE>, message : "success"} if created post successfully.
        HTTP Response Code 500 if error connecting to MongoDB
        HTTP Response Code 400 if bad request
        HTTP Response Code 402 if user is unauthorized
*/
router.post("/post/id", function(req, res, next) {
    if(mongo.database == null) res.status(500).send({ message : "Error connecting to database" });
    else{
        var username = req.body.username;

        if(userAuthentication.verifyRequest(req, username)){
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
                             if (accounts_db_err || db_res == null) res.status(400).send({ message : "Invalid request" });
                             else res.status(200).send({
                                 data : db_res,
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
Handle GET request for post access
Endpoint: .../post/id/#postid

@return {data : <POST RESOURCE>, message : "success"} if retrieved post successfully.
        HTTP Response Code 500 if error connecting to MongoDB
        HTTP Response Code 400 if bad request
*/
router.get("/post/id/:postid", function(req, res, next) {
    if(mongo.database == null) res.status(500).send({ message : "Error connecting to database" });
    else{
        var requestedPostID = req.params.postid;
        var query = { _id : requestedPostID };

        PostModel.findOne(query, function(db_err, db_res) {
            if (db_err || db_res == null) res.status(400).send({ message : "Invalid request" });
            else {
                var owner_username = db_res.username;
                if(userAuthentication.verifyRequest(req, owner_username)){
                    var update = {$set: req.body};
                    AccountModel.findOneAndUpdate(query, update, function(post_err, post_res) {
                          if (post_err) res.status(422).send( post_err );
                          else res.status(202).send({
                              data : post_res,
                              message : "success"
                          });
                    });
                }
                else{
                    res.status(404).send({ message : "Unauthorized request : You are not the owner of this post." });
                }

            }
        });
    }
});

/**
Handle PUT request for post access
Endpoint: .../post/id/#postid

@return {data : null, message : "success"} if retrieved post successfully.
        HTTP Response Code 500 if error connecting to MongoDB
        HTTP Response Code 400 if bad request
*/
router.put("/post/id/:postid", function(req, res, next) {
    if(mongo.database == null) res.status(500).send({ message : "Error connecting to database" });
    else{
        var requestedPostID = req.params.postid;
        var query = { _id : requestedPostID };

        PostModel.findOne(query, function(db_err, db_res) {
            if (db_err || db_res == null) res.status(400).send({ message : "Invalid request" });
            else res.status(201).send({
                 data : db_res,
                 message : "success"
             });
        });
    }
});

/**
Handle GET request for post search
Endpoint: .../post/search

@params Include tag, begIndex, and limit in URL query
        ex) .../post/search?tag=league&begIndex=10&limit=10

        tag             tag to search for in posts
        begIndex        index of where to return
        limit           number of posts to return

        NOTE: For posts 1-10, use .../post/search?tag=<tag>&begIndex=1&limit=10
              For posts 10-20, use .../post/search?tag=<tag>&begIndex=10&limit=10

@return {data : <POST RESOURCE>, size : <RESULT SIZE>, message : "success"} if searched successfully.
        HTTP Response Code 500 if error connecting to MongoDB
        HTTP Response Code 400 if bad request
*/
router.get("/post/search", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "Error connecting to database..." });
    else{
        var searchTag = req.query.tag;
        var query = {tags: { "$in": searchTag  }};
        var beginIndex = 0;
        var limit = 10;

        // Parse begIndex
        if(req.query.begIndex){
            beginIndex = parseInt(req.query.begIndex);

            // begIndex is not a valid number
            if(isNaN(beginIndex) || beginIndex < 0){
                res.status(400).send({ message : "Begin index is not an integer." });
            }
        }

        // Parse limit
        if(req.query.limit) {
            limit = parseInt(req.query.limit);

            // limit is not a valid number
            if(isNaN(limit) || limit < 0){
                res.status(400).send({ message : "Limit is not an integer." });
            }
        }

        // Query for tags at the interval begIndex to begIndex + limit
        PostModel.find(query).skip(beginIndex).limit(limit).sort({dateCreated : 1}).exec(function(db_err, db_res) {
              if (db_err || db_res == null) res.status(400).send({ message : "Bad request" });
              else res.status(201).send({
                    data : db_res,
                    size : db_res.length,
                    message : "success"
                });
        });
    }
});

module.exports = router;