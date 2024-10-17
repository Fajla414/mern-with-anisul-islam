const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());


const isLoggedIn = (req, res, next) => {
    const login = true;
    if (login) {
        req.body.id = 101;
        next();
    }
    else {
        return res.status(401).json({ message: 'Unauthorized please login first' })
    }
}

app.use(isLoggedIn)


app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to the server'
    })
})

app.get('/api/user', isLoggedIn, (req, res) => {
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