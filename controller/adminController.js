
const termin = require('../models/terminModel');
const moment = require('moment');
//getTermin

exports.getTermin = async (req, res, next) => {
    const avalableTime = []
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    if (startDate && endDate) {
        let lastDate = moment(startDate, "DD-MM-YYYY").format("DD-MM-YYYY")
        while (lastDate !== moment(endDate, "DD-MM-YYYY").add(1, "days").format("DD-MM-YYYY")) {
            const date = {
                date: lastDate,
                hours: [{ hour: 10, free: "free" }, { hour: 11, free: "free" }, { hour: 12, free: "free" }, { hour: 13, free: "free" }, { hour: 14, free: "free" }, { hour: 15, free: "free" }, { hour: 16, free: "free" }]
            }
            avalableTime.push(date)
            lastDate = moment(lastDate, "DD-MM-YYYY").add(1, "days").format("DD-MM-YYYY")
        }
    }
    else {
        const page = req.query.page || 1;
        console.log("pageAdmin=", req.query)
        for (let i = (5 * page) - 5; i < 5 * page; i++) {

            const date = {
                date: moment().add("days", i).format("YYYY-MM-DD"),
                hours: [{ hour: 10, free: "free" }, { hour: 11, free: "free" }, { hour: 12, free: "free" }, { hour: 13, free: "free" }, { hour: 14, free: "free" }, { hour: 15, free: "free" }, { hour: 16, free: "free" }]
            }

            avalableTime.push(date)
        }
    }

    const terminsData = await termin.find();
    terminsData.forEach(item => {


        const foundeddate = avalableTime.find(dateItem => {

            return dateItem.date === item.date
        })
        console.log(foundeddate)


        if (foundeddate) {

            const foundedHour = foundeddate.hours.find(hourItem => {
                console.log("compate time", hourItem.hour, item.time)
                return hourItem.hour == item.time
            })
            console.log("foundedHour=", foundedHour)
            if (item.userId && foundedHour) {
                foundedHour.krank = item.userId.name;
                foundedHour.behandlungenTitle = item.behandlung?.title;
                foundedHour.free = "reserved";

            }
            else if (foundedHour) {
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

