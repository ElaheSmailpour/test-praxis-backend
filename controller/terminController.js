const moment = require('moment');
const behandlung = require('../models/behandlungenModel');

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
    const phone=req.params.phone;
   const code= Math.floor(Math.random()*1000);
   console.log("code=",code)
  
        res.status(200)
  
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