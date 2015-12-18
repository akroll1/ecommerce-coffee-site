var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');
//Above is for email. Add vars.json to gitignore file!!!
var stripe = require("stripe")(
  "sk_test_y3k4sojVm0pBR0hiBh78Kctr"
);

// =================DELIVERY PAGE GET==================
router.get('/', function (req,res,next){
	res.render('delivery', {username: req.session.username,accessLevel: req.session.accessLevel});
});

// ===================DELIVERY PAGE POST================
router.post('/', function (req,res,next){
var newGrind = req.body.grind,
	newPounds = req.body.pounds,
	newFrequency = req.body.frequency;

var query = { username: req.session.username },
	update = {
		grind: newGrind, 
		pounds: newPounds, 
		frequency: newFrequency
	},
	options = {upsert: true};

Account.findOneAndUpdate(
	query, 
	update, 
	options, 
	function(err, doc) {
if (err) {
  return console.log('There was an error saving your preferences. Please send this error to our help team: ' + err );
}
});	
	console.log('I am now in post delivery page');
	res.redirect('/delivery');
});

module.exports = router;