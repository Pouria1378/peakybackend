const path = require('path');
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const mongoConnect = require('./utils/database').mongoConnect;

const responseMessage = require("./functions/responseMessage")

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const eventTypeRoutes = require('./routes/eventTypeRoutes');
const reserveEvent = require('./routes/reserveEvent');

app.use(cors())
app.use(express.urlencoded({ extended: false }));



app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'https://peaky-pouria.herokuapp.com/');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.use(registerRoutes);
app.use(loginRoutes);
app.use(eventTypeRoutes);
app.use(reserveEvent);

app.use((req, res, next) => {
    res
        .status(404)
        .json(responseMessage(404));
})


mongoConnect((client) => {
    app.listen(8000, () => {
        console.log('Server running on port 8000');
    });
})