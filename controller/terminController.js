var cache = require('js-cache');
const moment = require('moment');
const behandlung = require('../models/behandlungenModel');
const user = require('../models/userModel');
const termin = require('../models/terminModel');


exports.getBehandlungen = (req, res, next) => {
    behandlung.find().then((ergebnis) => {
        res.status(200).send(ergebnis)
    }).catch((fehler) => {
        res.status(500).send("Fehler : " + fehler)
    })
}
//getTerminBestätigung
exports.getTerminBestätigung = (req, res, next) => {
    const phone = req.params.phone;
    const code = Math.floor(Math.random() * 10000);
    console.log("code=", code)
    cache.set(phone, code)
    res.send(200)

}
//terminCancel

exports.terminRemove = async (req, res, next) => {
    const terminid = req.params.terminId;
    const removetermin = await termin.findByIdAndRemove(terminid)
    res.send(200)
}
//getTerminList
exports.getTerminList = async (req, res, next) => {
    const phone = req.params.phone;
	const findUser = await user.findOne({ phone: phone })

	if (!findUser) {
		return res.status(400).send("für diese telefonNummer gibt es keinen Termin!")
	}

	const terminList = await termin.find({ userId: findUser._id }).populate("userId")
	res.send(terminList)
}
//buchen
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

            userId: userfind._id
        })
        res.send(createTermin)

    }
    else
        res.send(401)
}
//getTermin
exports.getTermin = async (req, res, next) => {
    const avalableTime = []
    for (let i = 0; i < 5; i++) {
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
            const foundedHourIndex = foundeddate.hours.findIndex(hour => hour === item.time)

            foundeddate.hours.splice(foundedHourIndex, 1)
        }
    })
    res.send(avalableTime)
}