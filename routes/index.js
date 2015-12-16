var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

//===========LANDING PAGE===============
router.get('/', function (req, res, next) {
  	res.render('index', { username: req.session.username });
});
//============REGISTER PAGE==============
router.get('/register', function (req,res,next){
	res.render('register', { });//don't have to put { }, but technically correct.
});

router.post('/register', function (req,res,next){
	Account.register(new Account( {username: req.body.username} ),//.register method comes from mongoose-local-passport
	req.body.password,//body is available to us from body parser.
	//passport is going to bring in 3 fields, uses the hash and salt to create a password.
	function (err, account){
		if(err){
			console.log(err);
			return res.render('index');
		}else{
			passport.authenticate('local')(req,res,function(){ //the STRATEGY is 'local'
				req.session.username = req.body.username;//now req.session is available anywhere.
				res.render('index', {username: req.session.username});
			});
		}
	}
	)
})
//============LOG IN GET======================
router.get('/login', function (req,res,next){
	if(req.session.username){
		res.redirect('/choices');
	}
	if (req.query.failedlogin){
		res.render('login', {failed: "Your username or password is incorrect."} );
	}
	res.render('login', { });
});

//=============LOG IN POST===================
router.post('/login', function (req,res,next){
	passport.authenticate('local', function (err,user,info) {//passport does its thing.
		if(err){
			return next(err);
		}
		if(!user){
			return res.redirect('/login?failedlogin=1');
		}
		if(user){
			// passport.serializeUser(function (user,done){
			// 	console.log("serializing"+user.username);
			// 	done(null,user);
			// });

			// passport.deserializeUser(function (obj,done){
			// 	console.log('Deserializing'+obj);
			// 	done(null,obj);
			// });

			req.session.username= user.username;
		
		}

		return res.redirect('/choices');
	})(req,res,next);
});

//=============CHOICES PAGE================
router.get('/choices', function (req,res,next){
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
		res.render('choices', { username: req.session.username});

	} else {
		res.redirect('/');
	}

});

//===============DELIVERY POST ROUTE=====================

router.post('/delivery', function (req,res,next){
	if(req.session.username){

		var newGrind = req.body.grind;
		var newFrequency = req.body.frequency;
		var newPounds = req.body.pounds;

		Account.findOneAndUpdate(
			{ username: req.session.username },
			{ grind: newGrind },
			{ upsert: true },
			function (err,account){//account comes from mongoose.
				if(err){
					res.send("There was an error saving your preferences.");
				}else{
					account.save;
				}
			});
		
		Account.findOneAndUpdate(
			{ username: req.session.username },
			{ frequency: newFrequency },
			{ upsert: true},
			function (err,account){
				if(err){
					res.send("There was an error saving your preferences.");
				}else{
					account.save;
				}
			});

		Account.findOneAndUpdate(
			{ username: req.session.username },
			{ pounds: newPounds },
			{ upsert: true },
			function (err,account){
				if(err){
					res.send("There was an error saving your preferences.");
				}else{
					account.save;
				}
			});
		res.redirect('/delivery');
	}	
});




//==============DELIVERY GET ROUTE=======================
router.get('/delivery', function (req,res,next){
	res.render('delivery', {username: req.session.username} );
});




//================LOGOUT ROUTE======================
router.get('/logout', function (req,res,next){
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;












