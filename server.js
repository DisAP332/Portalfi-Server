const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRouter = require('./User/userRouter')
const eventsRouter = require('./Profile/DataInteractions/Events/EventsRouter')
const profileRouter = require('./Profile/SecureRouter')

const https = require('https')
const http = require('http')

const httpPort = 8080
const httpsPort = 8443

// app use middleware //

app.use(cors())
app.use(express.json())
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

// ---- database connection --- //

const DBMethods = require('./db');

// JWT //

const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization

    if (!token){
        console.log('no token provided')
        res.send('No token provided.')
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                console.log('Token auth failed.')
                return res.json({auth: false, message: "failed auth, token doesnt match / is expired"})
            } else {
                console.log('Token auth succeeded')
                next();
            }
        })
    }
}

// Routes //

app.use('/user', userRouter)

app.use('/events', verifyJWT, eventsRouter)

app.use('/profile', verifyJWT, profileRouter)

app.use('/test', (req, res, next) => {
    res.send('hello from server')
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(app)

app.listen(httpPort, () => {
    console.log(`HTTP server running on port ${httpPort}`)
})
app.listen(httpsPort, () => {
    console.log(`HTTPS server running on port ${httpsPort}`)
})

app.listen('3000', () => {
    console.log('server running on port 3000')
})