var express = require('express')
var router = express.Router()

var controller = require("../controllers/controller.transaction")

router.get("/",controller.indexTransaction)

router.get("/create",controller.getCreateTransaction)

router.post("/create",controller.postCreateTransaction)

router.get("/:id/complete",controller.getViewTransaction)

router.post("/complete",controller.postViewTransaction)

module.exports = router;