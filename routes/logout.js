var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');
var vars = require('../config/vars.json');

router.get('/', function (req,res,next){
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;