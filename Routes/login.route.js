var express = require('express')
var router = express.Router()

var controller = require("../controllers/controller.login")

router.get("/", controller.getLogin)

module.exports = router;