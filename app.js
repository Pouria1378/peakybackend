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
console.log('====================================');
console.log("????");
console.log('====================================');
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
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})