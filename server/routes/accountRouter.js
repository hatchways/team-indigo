
// ROUTING VARIABLES
var express = require("express");
var router = express.Router();
var mongo = require("../db/index.js");

// JWT TOKEN
var userAuthentication = require("./verifyUser.js");

/**
Handle GET request for account information.
*/
router.get("/account/u/:username", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "error connecting to database..." });
    else{
        var requestedUsername = req.params.username;
        var query = { username : requestedUsername };
        var hidden = {projection : {_id : 0,
                                 password : 0,
                                 emailAddress : 0}};

        // if the user is authorized, do not hide information
        if(userAuthentication.verifyRequest(req, requestedUsername)){
            hidden = {_id : 0}
        }

        mongo.accountsCollection.findOne(query, hidden, function(db_err, db_res) {
                                        if (db_err) res.status(400).send({ message : "invalid request" });
                                        else res.status(201).send({
                                            data : db_res,
                                            message : "success"
                                        });
                                  });
    }
});

/**
Handle PUT request for account information.
curl -H "Authorization: Bearer <ACCESS_TOKEN>" -X GET http://localhost:3001/account/u/johnsmith123
*/
router.put("/account/u/:username", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "error connecting to database..." });
    else{
        var requestedUsername = req.params.username;

        // if the user is authorized, allow update
        if(userAuthentication.verifyRequest(req, requestedUsername)){
            var query = { username : requestedUsername };
            var update = {$set: req.body};

            mongo.accountsCollection.updateOne(query, update, function(db_err, db_res) {
                                            if (db_err) res.status(400).send({ message : "invalid request" });
                                            else res.status(201).send({
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
CURL COMMAND : curl --data "firstName=John&lastName=Smith&username=johnsmith123&aboutMe=hi-im-john" http://localhost:3001/account/u
*/
router.post("/account/u", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "error connecting to database..." });
    else{
        // Create JSON from POST parameters that contains account information
        var entry = {firstName : req.body.firstName,
                  lastName : req.body.lastName,
                  username : req.body.username,
                  aboutMe : req.body.aboutMe,
                  posts : [],
                  password: req.body.password,
                  emailAddress: req.body.emailAddress};

        mongo.accountsCollection.insertOne(entry, function(db_err, db_res) {
                        if (db_err) res.status(400).send({ message : "invalid request" });
                        else res.status(201).send({
                              token : userAuthentication.generateToken(req.body.username),
                              message : "success"
                          });
                  });
    }
});

/**
Tests a signin by the user.

curl --data "username=johnsmith123&password=yellow1235" http://localhost:3001/account/signin
*/
router.post("/account/signin", function(req, res, next) {
    if(mongo.database == null) res.status(400).send({ message : "error connecting to database..." });
    else{
        var signInUsername = req.body.username;
        var signInPassword = req.body.password;
        var query = { username : signInUsername }

        mongo.accountsCollection.findOne(query, function(db_err, db_res) {
                    if (db_err) res.status(400).send({ message : "invalid request" });
                    else {
                        if(db_res.password === signInPassword){
                            // Correct password
                            res.status(200).send({token : userAuthentication.generateToken(signInUsername),
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

/*
Testing verification:
curl -H "Authorization: Bearer <ACCESS_TOKEN>" --data "username=johnsmith123" http://localhost:3001/account/verifyuser
*/
router.post("/account/verifyuser", function(req, res, next) {
    var username = req.body.username;
    var authorized = userAuthentication.verifyRequest(req, username);
    if(authorized){
        res.status(200).send({message : "verified"});
    }
    else{
        res.status(200).send({message : "failed to verify"});
    }
});

module.exports = router;