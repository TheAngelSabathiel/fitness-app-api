const Workout = require("../models/Workout");
const { errorHandler } = require("../auth");

module.exports.addWorkout = (req, res) => {
	const workout = new Workout({
		userId : req.user.id,
		name : req.body.name,
		duration : req.body.duration
	});

	workout.save()
	.then(savedWorkout => {
		return res.status(201).send(savedWorkout);
	})
	.catch(error => errorHandler(error, req, res));
}

       // "getMyWorkouts":"/getMyWorkouts"

module.exports.getMyWorkouts = (req, res) => {
	Workout.find({ userId : req.user.id })
	.then(workouts => {
		if (workouts.length === 0) {
			return res.status(200).send({
				message : "No workouts"
			});
		}

		return res.status(200).send({workouts});
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.updateWorkout = (req, res) => {

	Workout.findByIdAndUpdate( req.params.workoutId , req.body, { new : true })
	.then(workout =>{
		if (!workout) {
			return res.status(404).send({
				message : "No workout found"
			});
		}

		return res.status(200).send({
			message : "Workout updated successfully",
			updatedWorkout : workout
		});
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.deleteWorkout = (req, res) => {

	Workout.findByIdAndDelete( req.params.workoutId )
	.then(result => {
		if (!result) {
			return res.status(404).send({
				message : "No workout found"
			});
		}

		return res.status(200).send({
			message : "Workout deleted successfully"
		});
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.completeWorkout = (req, res) => {

	Workout.findByIdAndUpdate( req.params.workoutId , { status : "Completed" })
	.then(workout =>{
		if (!workout) {
			return res.status(404).send({
				message : "No workout found"
			});
		}

		if (workout.status === "Completed") {
			return res.status(200).send({
				message : "Workout was already completed",
				workout : workout
			});
		}

		workout.status = "Completed";

		return res.status(200).send({
			message : "Workout status updated successfully",
			updatedWorkout : workout
		});
	})
	.catch(error => errorHandler(error, req, res));
}