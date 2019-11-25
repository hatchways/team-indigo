
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

    this.userVotes.push({username : username, choice : choice});

    for (var i = 0; i < this.choices.length; i++) {
        if (this.choices[i].choice === choice) {
            this.choices[i].votes = this.choices[i].votes + 1;
        }
    }
    this.markModified('choices');
};

postSchema.methods.init_choices = function init_choices() {

    for (var i = 0; i < this.choices.length; i++) {
        this.choices[i] = {choice : this.choices[i], votes : 0};
    }

};


var Post = mongoose.model('post_info', postSchema, 'post_info');
module.exports = Post;

