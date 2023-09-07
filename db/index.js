const mongoose = require('mongoose')

const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()

let URI;
let db;

const promiseToDisconnect = () => {
    return new Promise((resolve) => {
        mongoose.connection.close()
        .then(() => {
            resolve({message: 'Disconnected from database'})
        })
    })
}

const promiseToConnect = (requestor) => {
    return new Promise((resolve) => {
        if (!requestor){
            resolve({
                connected: false,
                message: 'Please indicate what database to connect to'
            });
        } else {
            URI = process.env.DATABASE + `${requestor}?retryWrites=true&w=majority`;
            mongoose.connect(URI, { useNewUrlParser: true });
            db = mongoose.connection
            db.on("error", console.error.bind(console, "connection error: "));
            db.once("open", function () {
                resolve({
                    connected: true,
                    message: `Connected to ${requestor} DATABASE successfully`
                })
            })
        }
    })
}

const DB = async (requestor) => {
    let response;
    await promiseToDisconnect()
    .then((res) => console.log(res))
    await promiseToConnect(requestor)
    .then((res) => {
        console.log(res)
        response = res
    })
    return response
}

const CloseDB = () => {
    mongoose.connection.close();
}

const DBMethods = {
    DB,
    CloseDB
}

module.exports = DBMethods

