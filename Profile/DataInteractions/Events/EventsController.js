const Event = require("./EventsModel")
const DBMethods = require('../../../db/index')

const retrieveEvents = async() => {
    try {
        const eventsFound = await Event.find({});

        if (eventsFound) {
        if (!eventsFound.length) {
            return res
                .status(404)
                .json({ success: false, error: `Events not found`})
        }
            console.log('events found!')
            return eventsFound

        }
    } catch (err) { console.log(err) }
}

getEvents = async (req, res) => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            let eventsData = retrieveEvents();
            eventsData.then(events => {
                eventsData = JSON.stringify(events);
                console.log(eventsData)
                resolve();
            }).then(() => {
                return res.status(200).json({success: true, Data: eventsData})
            })
        }, 200);
    })
}

createEvent = (req, res) => {
    new Promise((resolve, reject) => {
        DBMethods.DB(req.body.User)
        setTimeout(() => {
            resolve()
        }, 600)
    }).then(() => {
        const Data = req.body.Data
    
        if(!Data) {
            return res.status(400).json({
                success: false,
                error: "You must provide a event"
            })
        }
    
        const event = new Event(Data)

    
        if (!event) {
            return res.status(400).json({ success: false, error: err })
        }
    
        event.
            save()
            .then(() => {
                console.log(`event created by ${req.body.User}`)
                return res.status(201).json({
                    success: true,
                    id: event._id,
                    message: 'Event created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Event not created!',
                })
            })
    })
}

updateEvent = async (req, res) => {
    const body = req.body
    console.log('wtf')
    
    if(!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide event details to update"
        })
    }

    new Promise((resolve, reject) => {
        DBMethods.DB(req.body.user)
        setTimeout(() => {
            console.log('connected should be atleast')
            resolve()
        }, 1000)
    }).then(async () => {
        console.log('now we doing thiisi')
        try {
            const eventFound = await Event.findOne({_id: body.event._id});
            eventFound.Date = body.event.Date
            eventFound.Name = body.event.Name
            eventFound.Time = body.event.Time
            eventFound.Description = body.event.Description
            eventFound.Cost = body.event.Cost
            eventFound
                .save()
                .then(() => {
                    console.log(`event updated by ${req.body.user}`)
                    return res.status(200).json({
                        success: true,
                        id: eventFound._id,
                        message: 'Event updated!',
                    })
                })
    
        } catch (err) {
            return res.status(404).json({
                err,
                message: 'Event not found!'
            })
        }
    })
}

deleteEvent = async (req, res) => {
    console.log(`ObjectId('${req.params.id}')`)
    try {
        const event = await Event.findByIdAndDelete({ _id: req.params.id})
        if (!event) {
            return res
            .status(404)
            .json({ success: false, error: `Event not found` })
        }
    } catch (err) { return res.status(400).json({ success: false, error: err }) }
}

module.exports = {
    deleteEvent,
    getEvents,
    createEvent,
    updateEvent
} 