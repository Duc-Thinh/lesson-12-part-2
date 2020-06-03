var express = require('express')
var router = express.Router()
module.exports = router
var controller = require('./book.controller.js')
router.get("/", controller.default );

router.post("/create", controller.defaultBook);
router.get("/searchBook", controller.search);
router.get("/changeBook/:id", controller.changeBook)
router.post("/updateBook/:id", controller.updateBook)
router.get("/deleteBook/:id", controller.deleteBook)

