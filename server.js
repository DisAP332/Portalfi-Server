const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRouter = require('./User/userRouter')
const eventsRouter = require('./Profile/DataInteractions/Events/EventsRouter')

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

app.use('/user', userRouter)

app.use('/events', eventsRouter)

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