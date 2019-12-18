

// JWT TOKEN VARIABLES
var jwt = require('jsonwebtoken');
var privateKey = process.env.PRIVATE_KEY;
var publicKey = process.env.PUBLIC_KEY;

// EXPIRATION VARIABLES
var POST_EXPIRATION_DATE = 30;
var secondsToExpire = POST_EXPIRATION_DATE*86400;


/**
Returns JWT Token if successful sign in.
Returns null if invalid credentials.
*/
function generateToken(username) {
    var payload = {
        account : username
    };
    return jwt.sign(payload, privateKey, generateSignAndVerifyOptions(username));
}

function generateSignAndVerifyOptions(username){
    return {
            issuer:  "www.tindigo.com",
            subject:  "teamindigo54@gmail.com",
            audience:  username,
            expiresIn:  "24h",
            algorithm:  "RS256"
           };
}

function verifyToken(username, token) {
    if (!username) return false;
    return jwt.verify(token, publicKey, generateSignAndVerifyOptions(username));
}

function verifyRequest(req, username) {
    if(req.headers.authorization != null){
        var token = req.headers.authorization.split(' ')[1];
        return verifyToken(username, token);
    }
    return false;
}


module.exports.generateToken = generateToken;
module.exports.generateSignAndVerifyOptions = generateSignAndVerifyOptions;
module.exports.verifyToken = verifyToken;
module.exports.verifyRequest = verifyRequest;