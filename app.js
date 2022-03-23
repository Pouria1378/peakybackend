const path = require('path');
const express = require('express');
const app = express();
const mongoConnect = require('./utils/database').mongoConnect;

const responseMessage = require("./functions/responseMessage")

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(registerRoutes);
app.use(loginRoutes);

app.use((req, res, next) => {
    res
        .status(404)
        .json(responseMessage(404, true, "Page not found"));
})


mongoConnect((client) => {
    app.listen(8000, () => {
        console.log('Server running on port 8000');
    });
})