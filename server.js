require("dotenv").config();
var express = require('express');
var path = require('path');

const cors = require("./middleware/cors")
const app = express();

const verbindeDB = require("./mongo-db");
const terminRouter = require('./routes/TerminRouter');
const imagesRouter = require('./routes/ImagesRouter');
const userLoginRouter=require("./routes/userLoginRouters")
verbindeDB()

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors)


app.use(express.static('public'))
app.use("/register",userLoginRouter)
app.use("/termin", terminRouter)
app.use("/imagesHome", imagesRouter)
app.get('*', (req, res, next) => {
    res.status(404).send("Diesen Pfad gibt es nicht")

})

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log("Läuft auf Port" + port) })

//für run im terminal : node server.js
