var express = require('express')
var router = express.Router()
module.exports = router
var controller =  require('./transactions.controller.js')

router.get("/", controller.trans )
router.post("/create", controller.transCreate)
router.get("/:id/complete", controller.isComplete)