var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    	username:{
    		type: String,
    		unique: true
    	},

    	score: {
        type: Number
        },

        counts:{
        	type: Number,
        	default: 0
        }
});

var User = mongoose.model('scores', userSchema);
module.exports = User;