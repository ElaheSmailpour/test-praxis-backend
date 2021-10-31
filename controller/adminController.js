
const termin = require('../models/terminModel');
const moment = require('moment');
//getTermin

exports.getTermin = async (req, res, next) => {
    const avalableTime = []
    for (let i = 0; i < 5; i++) {

        const date = {
            date: moment().add("days", i).format("DD-MM-YYYY"),
            hours: [{ hour: 10, free: "free" }, { hour: 11, free: "free" }, { hour: 12, free: "free" }, { hour: 13, free: "free" }, { hour: 14, free: "free" }, { hour: 15, free: "free" }, { hour: 16, free: "free" }]
        }

        avalableTime.push(date)
    }
    const terminsData = await termin.find().populate("userId").populate("behandlungen");
    terminsData.forEach(item => {
        const foundeddate = avalableTime.find(dateItem => dateItem.date === item.date)
        if (foundeddate) {

            const foundedHour = foundeddate.hours.findIndex(hourItem => hourItem.hour == item.time)
            if (item.userId) {
                foundedHour.krank = item.userId.name;
                foundedHour.behandlungenTitle = item.behandlung?.title;
                foundedHour.free = "reserved";
            }
            else {
                foundedHour.free = "block";
            }

        }
    })
    res.send(avalableTime)
}

//removeHour
exports.removeHour = async (req, res, next) => {

    await termin.create({ time: req.body.time, date: req.body.date })
    res.send("")

}
//makeFreeHour
exports.makeFreeHour = async (req, res, next) => {
    await termin.findOneAndRemove({ time: req.body.time, date: req.body.date })
	res.send("")

}

