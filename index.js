const express = require('express')
require('dotenv').config()
const ConnectionDB = require('./config/db')
const bodyParse = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const cookieSession = require('cookie-session')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParse.urlencoded({extended: true}))
app.use(bodyParse.json())
app.use(
    cookieSession({
        name: 'latihan-session',
        secret: 'COOKIE_SECRET',
        httpOnly: true
    })
)

app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    )
    next()
})



const routes = require ('./routes/index.js')

app.use('/api', routes)


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log(`Server Started at ${PORT}`)
})