const express = require('express');
const auth = require("../functions/verifyToken")

const reserveEventController = require('../controllers/reserveEventContrller');

const router = express.Router();

router.post("/getReserveEventData", reserveEventController.getReserveEventData)

router.post("/reserveEvent", reserveEventController.addReserveEvent)

router.get("/getReservedEvents", auth, reserveEventController.getReservedEvents)

module.exports = router;