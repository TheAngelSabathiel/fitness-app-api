const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
	userId :{
		type : mongoose.Schema.Types.ObjectId,
		ref : "User"
	},
	name : {
		type : String,
		required : [true, "Workout Name is required"]
	},
	duration : {
		type : String,
		required : [true, "Workout duration is required"]
	},
	dateAdded : {
		type : Date,
		default : Date.now()
	},
	status :{
		type : String,
		enum : ["pending", "in progress", "completed"],
		default : "pending"
	}
});

module.exports = mongoose.model("Workout", workoutSchema);