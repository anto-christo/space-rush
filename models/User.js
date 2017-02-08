var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    	username:{
    		type: String,
    		unique: true
    	},

    	score: {
        type: Number
        }
});

var User = mongoose.model('scores', userSchema);
module.exports = User;