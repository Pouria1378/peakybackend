const express = require('express');
const auth = require("../functions/verifyToken")

const createEventTypeController = require('../controllers/createEventType');

const router = express.Router();

router.post("/createEventType", auth, createEventTypeController.createEventType);

module.exports = router;