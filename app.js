const path = require('path');
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const mongoConnect = require('./utils/database').mongoConnect;

const responseMessage = require("./functions/responseMessage")

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const createEventType = require('./routes/createEventType');

app.use(cors())
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.use(registerRoutes);
app.use(loginRoutes);
app.use(createEventType);

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