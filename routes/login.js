var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');

router.get('/', function (req,res,next){
	if(req.session.username){
		res.redirect('/choices');
	}
	if (req.query.failedlogin){
		res.render('login', {failed: "Your username or password is incorrect."} );
	}
	res.render('login');
});

//=============LOG IN POST===================
router.post('/', function (req,res,next){
	passport.authenticate('local', function (err,user,info) {//passport does its thing.
		if(err){
			return next(err);
		}
		if(!user){
			return res.redirect('/login?failedlogin=1');
		}
		if(user){
			if(user.accessLevel == 5) {
				req.session.accessLevel = "Admin";
			}
			req.session.username= user.username;
		}

		return res.redirect('/choices');
	})(req,res,next);
});


module.exports = router;