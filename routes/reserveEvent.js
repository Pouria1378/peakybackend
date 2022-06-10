const express = require('express');

const reserveEventController = require('../controllers/reserveEventContrller');

const router = express.Router();

router.post("/getReserveEventData", reserveEventController.getReserveEventData)

router.post("/reserveEvent", reserveEventController.addReserveEvent)

module.exports = router;