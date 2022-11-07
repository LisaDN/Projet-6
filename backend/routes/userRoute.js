const express = require('express')

const router = express.Router()
const userController = require('../controller/userController')

router.post('/signup', userController.signup)
//mise en place 2ème route

module.exports = router