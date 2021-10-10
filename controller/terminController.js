const behandlung = require('../models/behandlungenModel');



exports.getBehandlungen=(req,res,next)=>{
    behandlung.find().then((ergebnis)=>{
        res.status(200).send(ergebnis)
    }).catch((fehler)=>{
        res.status(500).send("Fehler : " + fehler)
    })
}
