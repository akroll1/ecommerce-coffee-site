var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');


// =================THANK YOU POST PAGE=============

router.post('/', function (req,res,next){
	console.log('Im in thank you post page.');
	res.redirect('/thankyou', {username: req.session.username});
});

// ===============THANK YOU GET PAGE================

router.get('/', function (req,res,next){
	res.render('thankyou', {username: req.session.username,accessLevel: req.session.accessLevel});
});

module.exports = router;