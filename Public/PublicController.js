const Event = require("../Profile/DataInteractions/Events/EventsModel")
const DBMethods = require("../db/index")

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
    .then(async (status) => {
        console.log(status.message)
        return retrieveEvents()
        .then((events) => {
            eventsData = JSON.stringify(events);
            console.log(eventsData);
            return res.status(200).json({success: true, Data: eventsData})
        })
    })
}

module.exports = {
    getEvents
}