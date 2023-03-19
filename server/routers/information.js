const Router = require('express')
const router = new Router()
const info = require('../controller/informationcontroller')

router.post('/', info.create)
router.get('/',info.getAll)

module.exports = router