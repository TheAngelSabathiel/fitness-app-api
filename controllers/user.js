const User = require("../models/User");
const { errorHandler, createAccessToken } = require("../auth");
const bcrypt = require("bcryptjs");

module.exports.registerUser = (req, res) => {
	const emailRegex = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

	if (!emailRegex.test(req.body.email)) {
		return res.status(400).send({error : "Email Invalid"});
	}
	if (req.body.password.length < 8) {
		return res.status(400).send({error : "Password must be at least 8 characters"});
	}

	User.findOne({ email : req.body.email })
	.then(foundUser => {
		if (foundUser) {
			res.status(409).send({
				message : "Email already in use"
			})
			return null;
		}

		return bcrypt.hash(req.body.password, 12);
	})
	.then(pass => {
		if (pass == null) {
			return null
		}

		const user = new User({	
			email : req.body.email,
			password : pass,
			firstName : req.body.firstName,
			lastName : req.body.lastName
		});

		return user.save();
	})
	.then(registeredUser => {
		if (!registeredUser) return;

		return res.status(201).send({
				message : "Registered Successfully"
			});
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.loginUser = (req, res) => {

	User.findOne({ email : req.body.email })
    .then(foundUser => {
    	if (!foundUser) {
    		res.status(404).send({
    			error : "User not found"
    		})
    		return null;
    	}

    	return bcrypt.compare(req.body.password, foundUser.password)
    	.then(isPasswordCorrect => {
    		return {
    			user : foundUser,
    			isPasswordCorrect : isPasswordCorrect
    		};
    	})
    })
    .then(verifiedUser => {
    	if (verifiedUser === null) {
    		return;
    	}

    	if (!verifiedUser.isPasswordCorrect) {
    		return res.status(401).send({
    			error : "Invalid credentials"
    		});
    	}

    	return res.status(200).send({
    		access : createAccessToken(verifiedUser.user)
    	});
    })
    .catch(error => errorHandler(error, req, res));

}

module.exports.getUserDetails = (req, res) => {
	User.findById(req.user.id).select("-password")
	.then(user => {
		if (!user) {
			return res.status(404).send({
				message : "No user found"
			})
		}

		return res.status(200).send({
			user : user
		});
	})
	.catch(error => errorHandler(error, req, res));
}