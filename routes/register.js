var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');

//============REGISTER PAGE==============
router.get('/', function (req,res,next){
	res.render('register');
});

router.post('/', function (req,res,next){
	Account.register(new Account( {username: req.body.username} ),
	req.body.password,
	function (err, account){
		if(err){
			console.log(err);
			return res.render('index');
		}else{
			passport.authenticate('local')(req,res,function(){ //the STRATEGY is 'local'
				req.session.username = req.body.username;//now req.session is available anywhere.
				res.render('index', {username: req.session.username});
			});
		}
	});
})

module.exports = router;