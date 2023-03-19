const Router = require('express')
const router = new Router()
const user = require("./user")
const products = require("./products")
const information = require("./information")
const reviews = require("./reviews")
const curt = require("./curt")

router.use('/user', user)
router.use('/products', products)
router.use('/information', information)
router.use('/reviews', reviews)
router.use('/curt', curt)

module.exports = router