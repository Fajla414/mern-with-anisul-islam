const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');


const rateLimiter = rateLimit ({
    windowMs: 1 * 60 * 1000,
    max: 5 , 
    message: 'Too many requests from this IP. please try again'
})


const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter)





app.get('/' ,(req, res) => {
    res.status(200).send({
        message: 'Welcome to the server'
    })
})

app.get('/api/user', (req, res) => {
    console.log(req.body.id);
    res.send('user profile is returened')
})


// client error handling
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
})


// server error handling
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })
})



module.exports = app;