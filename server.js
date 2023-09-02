const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRouter = require('./User/userRouter')
const eventsRouter = require('./Profile/DataInteractions/Events/EventsRouter')

const https = require('https')
const http = require('http')

const httpPort = 80
const httpsPort = 443

// app use middleware //

app.use(cors())
app.use(express.json())
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

// ---- database connection --- //

const DBMethods = require('./db');

// ---- app ------ //

const httpServer = http.createServer(app)
const httpsServer = https.createServer(app)

httpServer.listen(httpPort, () => {
    console.log()
})

httpsServer.listen(httpsPort, () => {
    console.log(`Http server is running on port ${httpsPort}`)
});