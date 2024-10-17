const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');


const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'Too many requests from this IP. please try again'
})


const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use("/api/users", userRouter);





app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to the server'
    })
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