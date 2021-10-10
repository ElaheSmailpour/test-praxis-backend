const user = require("../models/userModel")

const bcrypt = require("bcrypt");
exports.signup = async (req, res, next) => {
    try {
        const newuser = req.body
        let alreadyUser = await user.find({ $or: [{ email: newuser.email }, { phone: newuser.phone }] })
        if (alreadyUser.length >= 1) {
            return res.status(409).send('There is already a user with this email or phone')
        }
        let passwordgehasched = await bcrypt.hash(newuser.password, 10)
        let createuser = await user.create({ ...newuser, password: passwordgehasched })
        res.status(201).send(createuser)

    }
    catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')
    }
}
exports.userLogin = async (req, res, next) => {
	let loginuser = req.body
	try {
		let userfind = await user.findOne({ email: loginuser.email })
		console.log(userfind);
		if (userfind === null) {
			return res.status(401).send('No user')
		}
		let comparePasswort = await bcrypt.compare(loginuser.password, userfind.password)
		if (comparePasswort) {
			let token = jwt.sign({
				email: userfind.email,
				_id: userfind._id,
			}, process.env.JWT,{expiresIn:"2h"})
			res.status(200).json({
				message: 'You are log it',
				token: token,
				email: userfind.email
			})
		} else {
			res.status(401).send('You are  not log it')
		}
	} catch (error) {
		res.status(401).send('Du konntest nicht eingeloggt werden')
	}
}



