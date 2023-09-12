const express = require("express");

const router = express.Router();

const public_controller = require("./PublicController");

router.get('/events', public_controller.getEvents)

module.exports = router