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
        new Promise((resolve, rej) => {
            DBMethods.DB('Users')
            setTimeout(() => {
                resolve()
            }, 500)
        }).then(async () => {
            try {
                // first we will get the users from the database
                const users = async (req, res) => {
                    try {
                        const users = await User.find({})
                        if(users) {
                            return res.status(200).json({success: true, data: users})
                        }
                    } catch (err) {console.log(err)}
                }
                // if users exist check if username exists
                if (users) {
                    userExists = await User.findOne({username: username})
                    // if user doesnt exist close out with done
                    if (!userExists) {
                        DBMethods.CloseDB()
                        return done(null, false, {message: 'user not found'})
                    }
                }
    
                //check the passwords
                let passwordCheck = await bcrypt.compare(password, userExists.password)
    
                if (!passwordCheck) return done(null, false, {message: 'invalid credentials'})
    
                DBMethods.CloseDB()
    
                return done(null, userExists, {message: 'your logged in!'})
            } catch (error) {
                return done(error)
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