const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        ref: "username",
    },
    password: {
        type: String,
        required: true,
        ref: 'password',
    },
    id: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('user', UserSchema)

UserSchema.virtual('url').get(function () {
    return `/drinks/${this._id}`
})

module.exports = mongoose.model("Users", UserSchema)