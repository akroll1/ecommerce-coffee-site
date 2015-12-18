//db.accounts.update({username: "a"},{$set: {accessLevel:5}})

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

//===========LANDING PAGE===============
router.get('/', function (req, res, next) {
  	console.log(req.body);

  	res.render('index', { username: req.session.username,accessLevel: req.session.accessLevel });
});

module.exports = router;












