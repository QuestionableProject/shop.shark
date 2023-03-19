const Router = require('express')
const router = new Router()
const productcontroller = require('../controller/productcontroller')


router.post('/', productcontroller.create)
router.get('/',productcontroller.getAll)
router.get('/:id', productcontroller.getOne)

module.exports = router