const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName : {
		type : String,
		default : ""
	},
	lastName : {
		type : String,
		default : ""
	},
	email : {
		type : String,
		required : [true, "Email is required"]
	},
	password : {
		type : String,
		required : [true, "Password is required"]
	},
	createdAt : {
		type : Date,
		default : Date.now()
	}
});

module.exports = mongoose.model("User", userSchema);