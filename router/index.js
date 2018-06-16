var express = require('express')
var router = express.Router()

router.use('/page', require('./page'))
router.use('/config', require('./config'))
router.use('/data', require('./data'))
router.use('/user', require('./user'))

module.exports = router
