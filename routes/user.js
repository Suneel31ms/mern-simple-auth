const router = require("express").Router()

const { postRegister, postLogin, dashboard } = require("../controllers/user")
const { requireLogin } = require("../middleware/auth")


// Api
router.post("/register", postRegister )
router.post("/login",postLogin)

router.get("/",requireLogin, dashboard)

module.exports = router