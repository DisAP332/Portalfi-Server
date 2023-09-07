const express = require("express");

const router = express.Router();

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cookieParser = require('cookie-parser')

const User = require("../User/userModel");
const DBMethods = require("../db");
const { getEvents } = require("../Profile/DataInteractions/Events/EventsController");
const Events = require("../Profile/DataInteractions/Events/EventsModel");

router.use(cookieParser())

passport.use(
    "login",
    new localStrategy( async (username, password, done) => {
        DBMethods.DB('Users')
        .then(async () => {
            try {
                userExists = await User.findOne({username: username})
                if (!userExists) {
                    return done(null, false, {message: 'user not found'})
                }
    
                let passwordCheck = await bcrypt.compare(password, userExists.password)
        
                if (!passwordCheck) return done(null, false, {message: 'invalid credentials'})
    
                return done(null, userExists, {message: 'your logged in!'}) 
            } catch (error) {
                console.log(error)
                return done(null, false, {error: error})
            }

        })
    })
)

const getUsersData = async () => {
    try {
        const eventsFound = await Events.find({});
            if (eventsFound) {
                console.log('events found...')
                return eventsFound
            } else {
                console.log('ERROR: Events not found')
            }
    } catch (err) {console.log(err)}
}

router.post('/login', async (req, res, next) => {
    console.log(req.body)

    passport.authenticate('login', async (error, user, info) => {
        console.log("err: ", error);
        console.log("user: ", user);
        console.log("info: ", info);

        if (error){
            return next(error.message)
        }
        if (!user){
            return res.send({message: 'user not found'})
        }
        if (user){
            let EventData;
            token = jwt.sign({user: user}, process.env.JWT_SECRET, {expiresIn: '1h'});

            new Promise((resolve, reject) => {
                DBMethods.DB(user.username);
                setTimeout(() => {
                    resolve()
                }, 500);
            }).then(() => {
                new Promise((resolve, reject) => {
                    EventData = getUsersData();
                    EventData.then((events) => {
                        EventData = JSON.stringify(events)
                        resolve()
                    })
                }).then(() => {
                    res
                    .status(200)
                    .json({status: 'success', token, user: user.username, EventData: EventData})
                })
                console.log('connected and ready to fetch')
            })
        }
    })(req, res, next)

})

module.exports = router