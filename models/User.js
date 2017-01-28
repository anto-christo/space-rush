var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    	score:{
        type: Number
    }
});

var User = mongoose.model('space_db', userSchema);
module.exports = User;