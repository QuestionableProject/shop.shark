const Router = require('express')
const router = new Router()
const curt = require('../controller/curtcontroller')

router.post('/', curt.create)
router.post('/getcurt', curt.getAll)
router.post('/delete', curt.deleteProd)
router.post('/order', curt.order)

module.exports = router