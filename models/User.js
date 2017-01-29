var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    	score: {
        type: Number
    }
});

var User = mongoose.model('scores', userSchema);
module.exports = User;