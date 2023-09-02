const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRouter = require('./User/userRouter')
const eventsRouter = require('./Profile/DataInteractions/Events/EventsRouter')

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

app.listen('3000', () => {
    console.log('server running on port 3000')
})