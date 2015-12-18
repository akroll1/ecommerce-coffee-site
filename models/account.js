var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	grind: String,
	frequency: String,
	pounds: Number,
	fullname: String,
	address1: String,
	address2: String,
	city: String,
	state: String,
	zip: Number,
	firstdelivery: String,
	accessLevel: Number
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);
//the 'Account' collection and the Account schema.
