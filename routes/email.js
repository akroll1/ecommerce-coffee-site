var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');

router.get('/', function (req, res, next){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: vars.email,
			pass: vars.password
		}
	});
	var text = "This is a test email sent from my node server";
	var mailOptions = {
		from: req.body.name + '<' + req.body.email + '>',
		to: 'Andrew Kroll <andrew.d.kroll@gmail.com>',
		subject: 'This is a test subject',
		text: req.body.message + ' this email is from: '
	}

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.json({response: error});
		}else{
			console.log("Message was successfully sent. Response was " + info.response);
			res.json({response: "success"});
		}
	})

});
module.exports = router;