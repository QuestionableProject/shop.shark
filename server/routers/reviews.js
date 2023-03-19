const Router = require('express')
const router = new Router()
const reviews = require('../controller/reviewscontroller')

router.post('/', reviews.create)
router.get('/', reviews.getAll)

module.exports = router