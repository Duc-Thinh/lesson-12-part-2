var express = require('express')
var router = express.Router()
module.exports = router
var controller =  require('./user.controller.js')

router.get("/changeUser/:id", controller.changeUser )

router.get("/deleteUser/:id", controller.deleteUser);  
router.get("/", controller.user)
router.post("/createUser", controller.createUser)
router.post("/changeUser/update/:id", controller.updateUser)