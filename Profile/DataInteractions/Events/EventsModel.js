const mongoose = require("mongoose");
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    Date: {
        type: String,
        required: true,
        ref: "eventDate",
    },
    Name: {
        type: String,
        required: true,
        ref: "eventName"
    },
    Time: {
        type: String,
        required: true,
        ref: "eventOpens"
    },
    Description: {
        type: String,
        required: true,
        ref: "eventDescription"
    },
    Cost: {
        type: String,
        required: true,
        ref: "eventCost"
    },
})

const Event = mongoose.model("event", EventSchema)

EventSchema.virtual("url").get(function () {
    return `/events/${this._id}`;
})

module.exports = mongoose.model("Event", EventSchema)