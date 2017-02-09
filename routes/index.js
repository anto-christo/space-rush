var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('underscore');
var User = require('../models/User');
var request = require('./request');

// router.get('/', function(req, res, next){
// 	if(req.sess && req.sess.username)
// 	res.render('index');

//     else
//     {
//     	res.redirect('www.facebook.com');
//     }
// });

router.get('/', function(req, res ,next){
	res.render('index');
});


router.get('/ret_score', function(req, res, next){
	User.find({},"score username counts",{sort:{'score':'desc'}},function(err, score){
		res.send(score);
	});
});


router.post('/input_count', function(req, res, next){
	var username = req.body.username;
	var counts = req.body.counts;
	console.log(counts);
	console.log(username);
		
		User.count({username:username}, function(err,count){

			if(err)
			   throw err;

			else if(count>0){
				//username='Anto';
				//username=req.sess.username;
				User.update({username:username},{$set:{counts : counts}},{multi :true}, function(err,user){
					if(err)
						throw err;
				});

                   res.send(JSON.stringify({'msg':'success'}));

				
			}

			else
			{
				var new_user = new User();
				new_user.username = username;
				new_user.counts = counts;

				new_user.save(function(err, newuser){
				  if(err){
					console.log(err);
					return res.status(500).send(JSON.stringify({'msg':'servererror'}));
				}
				else{
					console.log('count sent from index');
					res.send(JSON.stringify({'msg':'success'}));
				}
			});

				
			}


		});				

});


router.post('/input_mega', function(req, res, next){
	var username = req.body.username;
	var point = req.body.point;
	console.log(point);
	console.log(username);
	

			request.updateMega(username,point,function(result){
					console.log("Mega update Done?:"+result);

		});				

});
		

router.post('/input_score', function(req, res, next){
	var score = req.body.score;
	var username = req.body.username;
	console.log(score);
	console.log(username);
		
		User.count({username:username}, function(err,count){

			if(err)
			   throw err;

			if(count>0){
				//username='Anto';
				//username=req.sess.username;
				User.update({username:username},{$set:{score : score}},{multi :true}, function(err,user){
					if(err)
						throw err;

					request.updateScore("spaceRush",score,username,function(result){
					console.log("score update Done?:"+result);
					});

                   console.log(user);
                   res.send(JSON.stringify({'msg':'success'}));
                
				
				
			});
		 }		

			else
			{
				var new_user = new User();
				new_user.username = username;
				new_user.score = score;

				new_user.save(function(err, newuser){
				  if(err){
					console.log(err);
					return res.status(500).send(JSON.stringify({'msg':'servererror'}));
				}
				else{
					console.log('score sent from index');

					request.updateScore("spaceRush",score,username,function(result){
					console.log("score update Done?:"+result);
				     });
					res.send(JSON.stringify({'msg':'success'}));
				}
			});

				
			}
		});				

});

module.exports = router;
