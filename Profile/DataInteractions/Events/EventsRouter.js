const express = require("express");

const router = express.Router();

// GET REQUEST ** here because no need to be protected ** //

const event_controller = require("./EventsController")

router.get('/getEvents', event_controller.getEvents)
router.post('/createEvent', event_controller.createEvent)
router.put('/updateEvent/:id', event_controller.updateEvent)
router.delete('/deleteEvent/:id', event_controller.deleteEvent)



module.exports = router