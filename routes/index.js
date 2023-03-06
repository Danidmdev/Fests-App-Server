const router = require("express").Router()

const festRoutes = require("./fests.routes")
router.use("/fests", festRoutes)

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

module.exports = router