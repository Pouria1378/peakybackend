const express = require('express');
const auth = require("../functions/verifyToken")

const getAllEventTypesController = require('../controllers/getAllEventTypes');

const router = express.Router();

router.get("/getAllEventTypes", auth, getAllEventTypesController.getAllEventTypes);

module.exports = router;