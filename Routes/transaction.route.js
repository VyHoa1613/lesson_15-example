var express = require('express')
var router = express.Router()

var controller = require("../controllers/controller.transaction")
var validate = require("../middleware/transactions.validate")
router.get("/",controller.indexTransaction)

router.get("/create",controller.getCreateTransaction)

router.post("/create",controller.postCreateTransaction)

router.get("/:id/complete",validate.getViewTransaction,controller.getViewTransaction)

router.post("/complete",controller.postViewTransaction)

module.exports = router;