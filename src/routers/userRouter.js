const express = require('express');
const { getUsers } = require('../controllers/usercontroller');
const userRouter = express.Router();



userRouter.get('/', getUsers)




module.exports = userRouter;