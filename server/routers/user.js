const Router = require('express')
const router = new Router()
const usercontol = require("../controller/usercontroller")
const auth = require('../middlware/authmiddleware')

router.post('/registration', usercontol.registration)
router.post('/login', usercontol.login)
router.post('/rename',  usercontol.rename)
router.get('/auth',  auth,usercontol.auth)

module.exports = router