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
