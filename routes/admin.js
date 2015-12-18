var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');



router.get('/', function (req,res,next){
	console.log('=================================');
	if(req.session.accessLevel == "Admin"){
		Account.find({}, function (err,doc,next){
			console.log(doc);
			res.render('admin', {accounts: doc, username: req.session.username, accessLevel: req.session.accessLevel});

		});

	}else{
		res.redirect('/');
	}
});

module.exports = router;