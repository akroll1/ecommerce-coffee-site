var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');
var stripe = require("stripe")(
  "sk_test_y3k4sojVm0pBR0hiBh78Kctr"
);

// ===============PAYMENT GET ROUTE=================
router.post('/', function (req,res,next){
		
		var fullName = req.body.fullname,
			address1 = req.body.address1,
			address2 = req.body.address2,
			city = req.body.city,
			state = req.body.state,
			zip = req.body.zip,
			firstDelivery = req.body.firstdelivery;
			query = {username: req.session.username},
			update = {
				fullname: fullName,
				address1: address1,
				address2: address2,
				city: city,
				state: state,
				zip: zip,
				firstdelivery: firstDelivery
			},
			option = {upsert: true};
	Account.findOneAndUpdate(query, update, option, function (err, doc){
				if(err){
					console.log('There is an error in your code' + err);
				}else{
					console.log('All is good in payment post route');
				}
			});
		res.redirect('/payment');
});


router.get('/', function (req,res,next){
	var grind;
	Account.findOne({username: req.session.username}, function(err,doc){
		console.log('Doc info is.... ' + doc);
	var grind = doc.grind;
	res.render('payment', {username: req.session.username,
						grind: doc.grind,
						frequency: doc.frequency,
						pounds: doc.pounds,
						fullName: doc.fullname,
						address1: doc.address1,
						address2: doc.address2,
						firstDelivery: doc.firstdelivery,
						city: doc.city,
						state: doc.state,
						zip: doc.zip,
						accessLevel: req.session.accessLevel});
	});

});

module.exports = router;
