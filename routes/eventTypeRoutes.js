const express = require('express');
const auth = require("../functions/verifyToken")

const eventTypesController = require('../controllers/eventTypesController');

const router = express.Router();

router.post("/createEventType", auth, eventTypesController.createEventType);

router.get("/getAllEventTypes", auth, eventTypesController.getAllEventTypes);

router.delete("/deleteEventType", auth, eventTypesController.deleteEventType);

module.exports = router;