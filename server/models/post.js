
var mongoose = require('../db/index.js');
var Schema = mongoose.Schema;

var postSchema = new Schema({

    tags : [String],

    question : { type: String, required: true },

    description : String,

    username : String,

    choices : [Object],

    userVotes : [Object],

    dateCreated : String

});

postSchema.methods.vote = function vote(username, choice) {

    // first we check if the user has already voted
    userRecord = this.voted_already(username);

    // user has never voted for this post before
    if (userRecord === null){
        // push the user's vote into record
        this.userVotes.push({username : username, choice : choice, date : new Date(Date.now()).toISOString()});
    }
    else{
        // edit the existing user's voting record
        oldChoice = userRecord.choice;
        userRecord.choice = choice;
        userRecord.date = new Date(Date.now()).toISOString();

        // search for the user's old choice and decrement by 1 (undoing a vote)
        for (var i = 0; i < this.choices.length; i++) {
            if (this.choices[i].choice === oldChoice) {
                this.choices[i].votes = this.choices[i].votes - 1;
            }
        }
    }

    // increment the new choice the user selected by 1
    for (var i = 0; i < this.choices.length; i++) {
        if (this.choices[i].choice === choice) {
            this.choices[i].votes = this.choices[i].votes + 1;
        }
    }
    this.markModified('choices');
    this.markModified('userVotes');
};

postSchema.methods.voted_already = function voted_already() {

    for (var i = 0; i < this.userVotes; i++){
        if (this.userVotes[i].username === username){
            return this.userVotes[i];
        }
    }
    return null;

}

postSchema.methods.init_choices = function init_choices() {

    for (var i = 0; i < this.choices.length; i++) {
        this.choices[i] = {choice : this.choices[i], votes : 0};
    }
    this.markModified('choices');
};


var Post = mongoose.model('post_info', postSchema, 'post_info');
module.exports = Post;

