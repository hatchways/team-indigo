
var mongoose = require('../db/index.js');
var Schema = mongoose.Schema;

var accountSchema = new Schema({

   firstName : String,

   lastName : String,

   username : { type: String, required: true, unique: true },

   aboutMe : String,

   posts : [],

   password: { type: String, required: true, select: false},

   emailAddress: { type: String, required: true, select: false },

   dateCreated : String

});

var Account = mongoose.model('account_info', accountSchema, 'account_info');
module.exports = Account;

