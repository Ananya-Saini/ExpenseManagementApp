const express = require("express")
const { addLimit } = require("../controllers/limitControl")

//router object
const router = express.Router()

//routes
router.post('/add-limit', addLimit)
module.exports = router