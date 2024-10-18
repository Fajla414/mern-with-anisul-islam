const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');
const connectDataBase = async (options = {}) => {
    try {
        await mongoose.connect(mongodbURL, options);
        console.log('MongoDB connected successfully');
        mongoose.connection.on('error', (err) => {
            console.error('DB connection error')
        })
    } catch (error) {
        console.error('could not connect to db', error.toString());
    }
}


module.exports = connectDataBase;