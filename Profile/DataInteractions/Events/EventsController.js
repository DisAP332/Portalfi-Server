const Event = require("./EventsModel")
const DBMethods = require('../../../db/index')

const retrieveEvents = () => {
    return new Promise(async (resolve) => {
        try {
            const eventsFound = await Event.find({});

            if (eventsFound) {
            if (!eventsFound.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Events not found`})
            }
                console.log('events found!')
                resolve(eventsFound)

            }
        } catch (err) { console.log(err) }
    })
}

getEvents = async (req, res) => {
    await DBMethods.DB(req.headers.user)
    .then(status => {
        console.log(status.message)
        return retrieveEvents()
        .then((events) => {
            eventsData = JSON.stringify(events);
            console.log(eventsData);
            return res.status(200).json({success: true, Data: eventsData})
        })
    })
}

createEvent = async (req, res) => {
    const Data = req.body.Data

    if(!Data) {
        return res.status(400).json({
            success: false,
            error: "You must provide a event"
        })
    }

    await DBMethods.DB(req.body.User)
    .then(() => {
        return new Promise(async (resolve) => {

            const event = new Event(Data)
            if (!event) {
                return res.status(400).json({ success: false, error: err })
            }

            event.save()
            .then(() => {
               resolve({success: true, id: event._id, message: `event created by ${req.body.User}`})
            })
            .catch(error => {
               return res.status(400).json({
                   error,
                   message: 'Event not created!',
               })
            })
        })
    })
    .then((results) => {
        console.log(results)
        if(results.success){
            retrieveEvents()
            .then((events) => {
                console.log(events)
                return(
                    res
                    .status(200)
                    .json({
                        success: true,
                        message: results.message,
                        events: events
                    })
                )
            })
        } else {
            console.log(results.message)
            return(
                res
                .status(400)
                .json({ 
                    success: false,
                    message: results.message,
                    events: false
                })
            )
        }
    })
}

updateEvent = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide event details to update"
        })
    }

    DBMethods.DB(req.headers.user)
    .then(() => {
        return new Promise(async(resolve) => {
            try {
                const eventFound = await Event.findOne({_id: body._id});
                eventFound.Date = body.Date
                eventFound.Name = body.Name
                eventFound.Time = body.Time
                eventFound.Description = body.Description
                eventFound.Cost = body.Cost
                eventFound
                    .save()
                    .then(() => {
                        console.log(`event updated by ${req.headers.user}`)
                        resolve({
                            success: true,
                            id: eventFound._id,
                            message: `Event: ${eventFound._id} updated!`
                        })
                    })
        
            } catch (err) {
                return res.status(404).json({
                    success: false,
                    err,
                    message: 'Event not found!'
                })
            }
        })
    })
    .then((results) => {
        retrieveEvents()
        .then((events) => {
            return(
                res
                .status(200)
                .json({
                    success: true,
                    message: results.message,
                    events: events
                })
            )
        })
    })
}

deleteEvent = async (req, res) => {
    await DBMethods.DB(req.headers.user)
    .then(() => {
        console.log(req.params.id)
        return new Promise(async (resolve) => {
            try {
                await Event.findByIdAndDelete({ _id: req.params.id})
                .then(() => {
                    resolve({success: true, message: `Event deleted: ${req.params.id}`})
                })
            } catch (err) {
                resolve(res.status(400).json({ success: false, error: err }))
            }
        })
    })
    .then((results) => {
        console.log(results.message)
        retrieveEvents()
        .then((events) => {
            return(
                res
                .status(200)
                .json({ 
                    success: true,
                    message: results.message,
                    events: events
                })
            )
        })
    })
}

module.exports = {
    deleteEvent,
    getEvents,
    createEvent,
    updateEvent
} 