var cache = require('js-cache');
const moment = require('moment');
const behandlung = require('../models/behandlungenModel');
const user = require('../models/userModel');
const termin = require('../models/terminModel');
const jwt = require("jsonwebtoken");

exports.getBehandlungen = (req, res, next) => {
    behandlung.find().then((ergebnis) => {
        res.status(200).send(ergebnis)
    }).catch((fehler) => {
        res.status(500).send("Fehler : " + fehler)
    })
}

//terminCancel

exports.terminRemove = async (req, res, next) => {
    const terminid = req.params.terminId;
    const removetermin = await termin.findByIdAndRemove(terminid)
    res.send(200)
}
//getTerminList
exports.getTerminList = async (req, res, next) => {
    console.log(req.user)
    const terminList = await termin.find({ userId: req.user.userId }).populate("behandlungen")
    console.log("terminList=", terminList)
    res.send(terminList)
}
//getTerminBestätigung
exports.getTerminBestätigung = (req, res, next) => {
    const phone = req.params.phone;
    const code = Math.floor(Math.random() * 10000);
    console.log("code=", code)
    cache.set(phone, code)
    res.send(200)

}
//buchen noch nicht eingeloggt
exports.buchen = async (req, res, next) => {
    const phone = req.params.phone;
    const code = req.params.code;
    const existCode = cache.get(phone);
    console.log("existCode=", existCode);
    if (code == existCode) {
        let userfind = await user.findOne({ phone: phone })
        console.log("userfind=", userfind)
        if (!userfind) {
            userfind = await user.create({ name: req.body.name, phone })

        }
        const createTermin = await termin.create({
            time: req.body.time,
            date: req.body.date,
            behandlungen: req.body.behandlungen,
            userId: userfind._id
        })
        let token = jwt.sign({
            email: userfind.email,
            userId: userfind._id,
        }, process.env.JWT || 'secret', { expiresIn: '2h' })
        res.status(200).json({
            message: 'You are log it',
            token: token,
            name: userfind.name
        })
    }
    else
        res.send(401)
}
//buchen user eingelogt
exports.bucheneingelogt = async (req, res, next) => {
    console.log("body1=",req.body)
    const createTermin = await termin.create({
        time: req.body.time,
        date: req.body.date,
        userId: req.user.userId,
        behandlungen: req.body.behandlungen
    })
    res.send(createTermin)
}
//getTermin
exports.getTermin = async (req, res, next) => {
    const avalableTime = []
    const page=req.query.page || 1;
	console.log("page=",req.query)
	for (let i = (10 * page) - 10; i < 10 * page; i++) {

        const date = {
            date: moment().add("days", i).format("YYYY-MM-DD"),
            hours: [10, 11, 12, 13, 14, 15, 16]
        }
        avalableTime.push(date)
    }
    const terminsData = await termin.find();
    terminsData.forEach(item => {
        const foundeddate = avalableTime.find(dateItem => dateItem.date === item.date)
        if (foundeddate) {

            const foundedHourIndex = foundeddate.hours.findIndex(hour => hour == item.time)
            console.log("foundedHourIndex=", foundedHourIndex)
            foundeddate.hours.splice(foundedHourIndex, 1)
        }
    })
    res.send(avalableTime)
}