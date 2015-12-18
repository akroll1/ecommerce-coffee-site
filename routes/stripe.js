var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');
var stripe = require("stripe")(
  "sk_test_y3k4sojVm0pBR0hiBh78Kctr"
);

router.post('/', function (req,res,next){

	stripe.charges.create({
	  amount: 400,
	  currency: "usd",
	  source: req.body.stripeToken, // obtained with Stripe.js
	  description: "Charge for test@example.com"
	}, function(err, charge) {
	  if(err){
	  	console.log('Your error is ' + err);
	  }else{
	  	console.log('Your charge is ' + charge);
	  }
	});

	res.redirect('/thankyou', {username: req.session.username});

});

router.get('/', function (req,res,next){
	res.redirect('/thankyou');
});
module.exports = router;