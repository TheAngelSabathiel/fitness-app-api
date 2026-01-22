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
		type : Number,
		required : [true, "Workout duration is required"]
	},
	dateAdded : {
		type : Date,
		default : Date.now()
	},
	status :{
		type : String,
		enum : ["Pending", "In Progress", "Completed"],
		default : "In Progress"
	}
});

module.exports = mongoose.model("Workout", workoutSchema);