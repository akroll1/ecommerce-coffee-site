var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');

router.get('/', function (req,res,next){
	if(req.session.username){//if they do belong here, check and see if they have prefernces set already.
		Account.findOne(
			{ username: req.session.username },
			function (err,doc){
				var currGrind = doc.grind ? doc.grind : undefined;
		});
		Account.findOne(
			{ username: req.session.username },
			function (err,doc){
				var currPounds = doc.pounds ? doc.pounds : undefined;
		});
		Account.findOne(
			{ username: req.session.username },
			function (err,doc){
				var currFreq = doc.frequency ? doc.frequency : undefined;
		});
		res.render('choices', { username: req.session.username, accessLevel: req.session.accessLevel } );

	} else {
		res.redirect('/');
	}

});

module.exports = router;






