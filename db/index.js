const mongoose = require('mongoose')

const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()

let URI;

const CloseDB = () => {
    mongoose.connection.close();
}

const promiseToDisconnect = new Promise((resolve) => {
        mongoose.connection.close();
        resolve()
})

const db = new Promise((res, rej) => {

})


const DB = async (req) => {
    let db;
    new Promise((resolve, rej) => {
        // disconnect from the database just in case
        mongoose.connection.close();
        console.log('closed connection')
        resolve()
    }).then(async () => {
        // connect to database once connection is closed
        new Promise((res, rej) => {
            if (!req) {
                console.log('Please indicate what database to connect to')
            } else {
                URI = process.env.DATABASE + `${req}?retryWrites=true&w=majority`;
                mongoose.connect(URI, { useNewUrlParser: true })
                db = mongoose.connection
                db.on("error", console.error.bind(console, "connection error: "));
                db.once("open", function () {
                    console.log(`Connected to ${req} DATABASE successfully`)
                    //resolve once connection is completed
                    res()
                })
            }   
        }).then(() => {
            console.log('returning db')
            //return the database
            return db
        })
    })
}

const DBMethods = {
    DB,
    CloseDB
}

module.exports = DBMethods

