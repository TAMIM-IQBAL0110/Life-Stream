/**
 * @file app.js
 * @description Main Express application configuration. 
 * Sets up middlewares, security headers, and base routes.

 */

require('dotenv').config()
const express = require('express')
const cors = require('cors');

const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        message:"welcome to Life-Stream"
    })
})



module.exports = app
