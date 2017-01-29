var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('underscore');
var User = require('../models/User');


router.get('/', function(req, res, next){
	res.render('index');
})

router.post('/input_score', function(req, res, next){
	var score = req.body.score;
	console.log(score);
		var new_user = new User();
			new_user.score = score;

			new_user.save(function(err, newuser){
				if(err){
					console.log(err);
					return res.status(500).send(JSON.stringify({'msg':'servererror'}));
				}
				else{
					console.log('score sent from index');
					res.send(JSON.stringify({'msg':'success'}));
				}
			});

});

module.exports = router;
