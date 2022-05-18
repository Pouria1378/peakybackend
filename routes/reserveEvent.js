const express = require('express');

const reserveEventController = require('../controllers/reserveEventContrller');

const router = express.Router();

router.post("/reserveEvent", reserveEventController.getReserveEventData)

module.exports = router;