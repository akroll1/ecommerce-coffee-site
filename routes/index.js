var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//this is where you come if you jsut come to the page.
router.get('/register', function (req,res,next){
	res.render('register');
});
//this is where you come if you submit a form
router.post('/register', function (req,res,next){
	Account.register(new Account({username: req.body.username}),
	req.body.password,
	function (err,account){
		if(err){
			console.log(err);
			return res.render('index');
		}else{
			passport.authenticate('local')(req,res,function(){
				res.redirect('/');
			});
		}
	}
	)
})
router.get('/login', function (req,res,next){
	res.render('login');
});
module.exports = router;
