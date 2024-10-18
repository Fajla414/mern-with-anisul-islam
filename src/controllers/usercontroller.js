const createError = require('http-errors');



const getUsers = (req, res, next) => {
    try {
        res.status(200).send({
            message: 'users were returned',
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { getUsers };