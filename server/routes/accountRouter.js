
// Express imports
var express = require("express");
var router = express.Router();

// MongoDB imports
var mongo = require("../db/index.js");

// JWT Token imports
var userAuthentication = require("./verifyUser.js");

// Model imports
var AccountModel = require("../models/account.js");
var PostModel = require("../models/post.js");

/**
Handle GET request for account information.
Endpoint : ...account/u/#username

If guest, no authorization header required.
If user is signed in, insert authorization header in the following format:

Authorization : Bearer <AUTHORIZATION TOKEN>
*/
router.get("/account/u/:username", function(req, res, next) {
    if(mongo.database == null) res.status(500).send({ message : "error connecting to database..." });
    else{
        var requestedUsername = req.params.username;
        var query = { username : requestedUsername };
        var databaseCursor = AccountModel.findOne(query);

        // if the user is authorized, do not hide information
        if(userAuthentication.verifyRequest(req, requestedUsername)){
            databaseCursor = databaseCursor.select('+password').select('+emailAddress');
        }
        databaseCursor.exec( function(db_err, db_res) {
            if (db_err || db_res == null) res.status(400).send({ message : "invalid request" });
            else res.status(202).send({
                data : db_res,
                message : "success"
            });
        });

    }
});

/**
Handle PUT request for account editing.
Endpoint: .../account/u/#username

Authorization required to edit account information.
Use the following authorization header format:

Authorization : Bearer <AUTHORIZATION TOKEN>

*/
router.put("/account/u/:username", function(req, res, next) {
    if(mongo.database == null) res.status(500).send({ message : "error connecting to database..." });
    else{
        var requestedUsername = req.params.username;

        // if the user is authorized, allow update
        if(userAuthentication.verifyRequest(req, requestedUsername)){
            var query = { username : requestedUsername };
            var update = {$set: req.body};

            AccountModel.findOneAndUpdate(query, update, function(db_err, db_res) {
                  if (db_err) res.status(422).send( db_err );
                  else res.status(202).send({
                      data : db_res,
                      message : "success"
                  });
            });

        }
        else{
            res.status(404).send({ message : "Unauthorized request" });
        }
    }
});

/**
Handle POST request for account creation.
Endpoint: .../account/u

@params Pass account information in req.body.
        firstName, lastName, username, password, emailAddress are required fields.
        username must be unique.
@return {token : <AUTHORIZATION TOKEN>, message : "success"} if created account successfully.
        HTTP Response Code 500 if error connecting to MongoDB
        HTTP Response Code 422 if invalid account information
*/
router.post("/account/u", function(req, res, next) {
    if(mongo.database == null) res.status(500).send({ message : "error connecting to database" });
    else{
        // Create JSON from POST parameters that contains account information
        var entry = {firstName : req.body.firstName,
                  lastName : req.body.lastName,
                  username : req.body.username,
                  aboutMe : req.body.aboutMe,
                  posts : [],
                  password: req.body.password,
                  emailAddress: req.body.emailAddress,
                  dateCreated : new Date(Date.now()).toISOString()};

        new AccountModel(entry).save(function(db_err, db_res) {
                if (db_err) res.status(422).send(db_err);
                else res.status(201).send({
                      token : userAuthentication.generateToken(req.body.username),
                      message : "success"
                  });
          });
    }
});

/**
Handle POST request for account signin.
Endpoint: .../account/signin

@params Pass account information in req.body
        username, password are required fields.
@return {token : <AUTHORIZATION TOKEN>, message : "success"} if signed in to account successfully.
        HTTP Response Code 500 if error connecting to MongoDB
        HTTP Response Code 400 if bad request
        HTTP Response Code 403 if incorrect password
*/
router.post("/account/signin", function(req, res, next) {
    if(mongo.database == null) res.status(500).send({ message : "error connecting to database" });
    else{
        var signInUsername = req.body.username;
        var signInPassword = req.body.password;
        var query = { username : signInUsername };

        AccountModel.findOne(query).select('+password').exec(function(db_err, db_res) {
              if (db_err) res.status(400).send({ message : "bad request" });
              else {
                  if(db_res.password === signInPassword){
                      // Correct password
                      res.status(200).send({token : userAuthentication.generateToken(signInUsername),
                                            message : "success"});
                  }
                  else {
                      // Incorrect password
                      res.status(403).send({message : "incorrect password"});
                  }
              }
        });
    }
});

/*
Handle POST request for account verification.
Endpoint: .../account/verifyuser

@params Pass account information in req.body
        username, password are required fields.
@return HTTP Response Code 200 if authorization token is valid
        HTTP Response Code 403 if token is invalid
*/
router.post("/account/verifyuser", function(req, res, next) {
    var username = req.body.username;
    var authorized = userAuthentication.verifyRequest(req, username);
    if(authorized){
        res.status(200).send({message : "verified"});
    }
    else{
        res.status(403).send({message : "failed to verify"});
    }
});

module.exports = router;